import React from 'react';
import {
	ActionFunctionArgs,
	ParamParseKey,
	Params,
	useLoaderData,
	useNavigate,
	useParams
} from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { fetchData } from '../services/fetchData';
import type { IBlog } from '../types';

const PathNames = {
	edit: '/admin/:blogid/edit'
} as const;

interface Args extends ActionFunctionArgs {
	params: Params<ParamParseKey<typeof PathNames.edit>>;
}

export const editLoader = async ({ params }: Args) => {
	try {
		const blog = await fetchData(`/api/blogs/${params.blogid}`);
		return blog;
	} catch (error) {
		throw error;
	}
};

interface EditProps {}

const Edit = (props: EditProps) => {
	const navigate = useNavigate();
	const { blogid } = useParams();
	const blog = useLoaderData() as IBlog;
	const { values, handleChanges } = useForm({ title: blog.title, content: blog.content });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		fetchData(`/api/blogs/${blogid}`, 'PUT', values).then(() => navigate(`/blog/${blogid}`));
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-8">
                    <h1 className="mb-4 text-center">Editing Blog</h1>
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
								value={values.content || ''}
								onChange={handleChanges}
								required
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Edit Post
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Edit;
