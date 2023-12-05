import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { fetchData } from '../services/fetchData';

interface ComposeProps {}

const Compose = (props: ComposeProps) => {
	const navigate = useNavigate();
	const { values, handleChanges } = useForm();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		fetchData('/api/blogs', 'POST', values).then(result => navigate(`/blog/${result.id}`));
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<h2 className="mb-4 text-center">Compost Post</h2>
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
