import React, { useState, useEffect } from 'react';
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
import type { IBlog, ITag } from '../types';

const PathNames = {
	edit: '/admin/:blogid/edit'
} as const;

interface Args extends ActionFunctionArgs {
	params: Params<ParamParseKey<typeof PathNames.edit>>;
}

export const editLoader = async ({ params }: Args) => {
	try {
		const blog = await fetchData(`/api/blogs/${params.blogid}`);
		const tags = await fetchData(`/api/tags`);
		const blogtags = await fetchData(`/api/blogtags/${params.blogid}/tags`);
		return { blog, blogtags, tags };
	} catch (error) {
		throw error;
	}
};

interface EditProps {}

const Edit = (props: EditProps) => {
	const navigate = useNavigate();
	const { blogid } = useParams();
	const { blog, blogtags, tags } = useLoaderData() as {
		blog: IBlog;
		tags: ITag[];
		blogtags: ITag[];
	};
	const [selectedTags, setSelectedTags] = useState<number[]>([]);
	const { values, handleChanges } = useForm({ title: blog.title, content: blog.content });

	useEffect(() => {
		const currentTagIds = blogtags.map(tag => tag.id);
		setSelectedTags(currentTagIds);
	}, [blogtags]);

	const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedOptions = Array.from(event.target.selectedOptions, option =>
			parseInt(option.value, 10)
		);
		setSelectedTags(selectedOptions);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const updatedBlog = {
			title: values.title,
			content: values.content
		};
		fetchData(`/api/blogs/${blogid}`, 'PUT', updatedBlog)
			.then(() => {
				const blogtagsUpdate = { blogid, tagid: selectedTags };
				return fetchData(`/api/blogtags`, 'PUT', blogtagsUpdate);
			})
			.then(() => navigate(`/blog/${blogid}`));
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
							<label htmlFor="tagsSelect" className="form-label">
								Tags
							</label>
							<select
								multiple
								className="form-select"
								id="tagsSelect"
								value={selectedTags.map(String)}
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
