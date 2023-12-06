import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { fetchData } from '../services/fetchData';
import type { ITag } from '../types';

export const composeLoader = async () => {
	try {
		const tags = await fetchData('/api/tags');
		return tags;
	} catch (error) {
		throw error;
	}
};

interface ComposeProps {}

const Compose = (props: ComposeProps) => {
	const navigate = useNavigate();
	const tags = useLoaderData() as ITag[];
	const [selectedTags, setSelectedTags] = useState<number[]>([]);
	const { values, handleChanges } = useForm();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		fetchData('/api/blogs', 'POST', values)
			.then(result => {
				const blogId = result.id;
				if (selectedTags.length > 0) {
					const blogtags = {
						blogid: blogId,
						tagid: selectedTags
					};
					return fetchData('/api/blogtags', 'POST', blogtags).then(() => blogId);
				} else {
					return blogId;
				}
			})
			.then(blogId => {
				navigate(`/blog/${blogId}`);
			});
	};

	const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedOptions = Array.from(event.target.selectedOptions, option =>
			parseInt(option.value, 10)
		);
		setSelectedTags(selectedOptions);
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<h2 className="mb-4 text-center">Compose Post</h2>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="titleInput" className="form-label">
								Title
							</label>
							<input
								type="text"
								className="form-control"
								id="titleInput"
								name="title"
								placeholder="Critical Success"
								value={values.title || ''}
								onChange={handleChanges}
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="tagsSelect" className="form-label">
								Tags
							</label>
							<select
								multiple
								className="form-select"
								id="tagsSelect"
								onChange={handleTagChange}>
								{tags.map(tag => (
									<option key={tag.id} value={tag.id}>
										{tag.name}
									</option>
								))}
							</select>
						</div>
						<div className="mb-3">
							<label htmlFor="contentTextarea" className="form-label">
								Content
							</label>
							<textarea
								className="form-control"
								id="contentTextarea"
								rows={20}
								name="content"
								placeholder="Rolled a nat 20 today..."
								value={values.content || ''}
								onChange={handleChanges}
								required
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Submit Post
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Compose;
