import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { fetchData } from '../services/fetchData';
import type { IBlog } from '../types';
import Modal from '../components/Modal';

export const adminLoader = async () => {
	try {
		const blogs = await fetchData('/api/blogs');
		return blogs;
	} catch (error) {
		throw error;
	}
};

interface AdminProps {}

const Admin = (props: AdminProps) => {
	const navigate = useNavigate();
	const blogs = useLoaderData() as IBlog[];
	const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleEdit = (blogId: number) => {
		navigate(`/admin/${blogId}/edit`);
	};

	const handleDelete = (blog: IBlog) => {
		setSelectedBlog(blog);
		setIsModalVisible(true);
	};

	const handleDeleteBlog = () => {
		if (selectedBlog) {
			fetchData(`/api/blogs/${selectedBlog.id}`, 'DELETE').then(() => {
				setIsModalVisible(false);
				setSelectedBlog(null);
			});
		}
	};

	const closeModal = () => {
		setIsModalVisible(false);
		setSelectedBlog(null);
	};

	return (
		<>
			<div className="container mt-5">
				<h2 className="text-center mb-4">Manage Posts</h2>
				<div className="list-group">
					{blogs?.map(blog => (
						<div className="list-group-item" key={blog.id}>
							<div className="d-flex w-100 justify-content-between align-items-center">
								<div>
									<h5 className="mb-1">{blog.title}</h5>
									<small className="text-muted">
										By {blog.name} on{' '}
										{new Date(blog.created_at).toLocaleDateString()}
									</small>
								</div>
								<div className="d-flex align-items-center">
									<button
										className="btn btn-primary btn-sm me-2"
										onClick={() => handleEdit(blog.id)}>
										Edit
									</button>
									<button
										className="btn btn-danger btn-sm"
										onClick={() => handleDelete(blog)}>
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<Modal
				title="Delete Blog?"
				show={isModalVisible}
				onClose={closeModal}
				onSave={handleDeleteBlog}
				saveBtnText="Delete">
				<>
					<p>Are you sure you want to delete this blog:</p>
					<p className="fw-bold">{selectedBlog?.title}</p>
				</>
			</Modal>
		</>
	);
};

export default Admin;
