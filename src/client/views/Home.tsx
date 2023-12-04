import React from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { fetchData } from '../services/fetchData';
import type { IBlog } from '../types';

export const homeLoader = async () => {
	try {
		const blogs = await fetchData('/api/blogs');
		return blogs;
	} catch (error) {
		throw error;
	}
};

interface HomeProps {}

const Home = (props: HomeProps) => {
	const navigate = useNavigate();
	const blogs = useLoaderData() as IBlog[];

	return (
		<div className="container my-5">
			<h1 className="mb-4">Latest Posts</h1>
			<div className="row">
				{blogs.length > 0 && (
					<div className="col-12 mb-3">
						<div
							className="card"
							role="button"
							onClick={() => navigate(`/blog/${blogs[0].id}`)}>
							<div className="card-body">
								<h2 className="card-title">{blogs[0].title}</h2>
								<p className="card-text">
									<small className="text-muted">
										By {blogs[0].name} on{' '}
										{new Date(blogs[0].created_at).toLocaleDateString()}
									</small>
								</p>
								<p className="card-text">{blogs[0].content.substring(0, 150)}...</p>
							</div>
						</div>
					</div>
				)}
				{blogs.slice(1, 7).map(blog => (
					<div className="col-md-4 mb-3" key={blog.id}>
						<div
							className="card h-100"
							role="button"
							onClick={() => navigate(`/blog/${blog.id}`)}>
							<div className="card-body">
								<h5 className="card-title">{blog.title}</h5>
								<p className="card-text">
									<small className="text-muted">
										By {blog.name} on{' '}
										{new Date(blog.created_at).toLocaleDateString()}
									</small>
								</p>
								<p className="card-text">{blog.content.substring(0, 150)}...</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<h2 className="mb-4 mt-5">All Posts</h2>
			<div className="list-group">
				{blogs.map(blog => (
					<a
						key={blog.id}
						onClick={() => navigate(`/blog/${blog.id}`)}
						className="list-group-item list-group-item-action"
						role="button">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">{blog.title}</h5>
							<small>{new Date(blog.created_at).toLocaleDateString()}</small>
						</div>
						<small className="text-muted">By {blog.name}</small>
					</a>
				))}
			</div>
		</div>
	);
};

export default Home;
