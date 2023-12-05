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

const isFizzBuzz = (id: number) => {
	return id % 3 === 0 || id % 5 === 0;
};

interface HomeProps {}

const Home = (props: HomeProps) => {
	const navigate = useNavigate();
	const blogs = useLoaderData() as IBlog[];

	const featuredBlogs = blogs.filter(blog => isFizzBuzz(blog.id)).slice(0, 5);

	return (
		<div className="container my-5">
			<div className="mb-5 row align-items-center">
				<div className="col-12 col-md-6">
					<div className="text-center">
						<img src="/logo.png" alt="Unveiling the Arcane" className="img-fluid" />
						<p className="lead">Explore the mystic world of Dungeons & Dragons.</p>
					</div>
				</div>
				<div className="col-12 col-md-6">
					<h5 className="mb-2 d-flex align-items-center">
						<span>Featured Posts</span>
						<hr className="border opacity-75 ms-4 border-secondary border-3 w-25" />
					</h5>
					<ul className="list-group list-group-numbered list-group-flush">
						{featuredBlogs.map(blog => (
							<li
								key={blog.id}
								onClick={() => navigate(`/blog/${blog.id}`)}
								className="py-3 list-group-item list-group-item-action"
								role="button">
								{blog.title}
							</li>
						))}
					</ul>
				</div>
			</div>

			<h1 className="mb-4">Latest Posts</h1>
			<div className="row">
				{blogs.length > 0 && (
					<div className="mb-3 col-12">
						<div
							className="bg-opacity-25 card bg-light"
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
					<div className="mb-3 col-md-4" key={blog.id}>
						<div
							className="card h-100 bg-light-subtle"
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
			<h2 className="mt-5 mb-4">All Posts</h2>
			<div className="list-group">
				{blogs.map((blog, idx) => (
					<a
						key={blog.id}
						onClick={() => navigate(`/blog/${blog.id}`)}
						className={`list-group-item list-group-item-action`}
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
