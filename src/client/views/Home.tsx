import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { fetchData } from '../services/fetchData';

export const homeLoader = async () => {
	try {
		const blogs = await fetchData('/api/blogs');
		return blogs;
	} catch (error) {
		throw error;
	}
};

const Home = () => {
	const blogs = useLoaderData() as {
		id: number;
		title: string;
		content: string;
		name: string;
		created_at: string;
	}[];

	return (
		<div className="container my-5">
			<h1 className="mb-4">Latest Posts</h1>
			<div className="row">
				{/* Featured Blog Post */}
				{blogs.length > 0 && (
					<div className="col-12 mb-3">
						<div className="card">
							<div className="card-body">
								<h2 className="card-title">{blogs[0].title}</h2>
								<p className="card-text">{blogs[0].content}</p>
								<p className="card-text">
									<small className="text-muted">
										By {blogs[0].name} on {blogs[0].created_at}
									</small>
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Other Blog Posts */}
				{blogs.slice(1).map(blog => (
					<div className="col-md-4 mb-3" key={blog.id}>
						<div className="card h-100">
							<div className="card-body">
								<h5 className="card-title">{blog.title}</h5>
								<p className="card-text">{blog.content.substring(0, 100)}...</p>
								<p className="card-text">
									<small className="text-muted">
										By {blog.name} on {blog.created_at}
									</small>
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
