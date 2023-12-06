import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { fetchData } from '../services/fetchData';
import type { IBlog } from '../types';

interface SearchProps {}

const Search = (props: SearchProps) => {
	const [matchedBlogs, setMatchedBlogs] = useState<IBlog[]>([]);
	const { values, handleChanges } = useForm();

	useEffect(() => {
		if (!values.searchTitle) {
            setMatchedBlogs([]);
            return;
        };

		const id = setTimeout(() => {
			fetchData(`/api/blogs?search=${values.searchTitle}`).then(matchedBlogs =>
				setMatchedBlogs(matchedBlogs)
			);
		}, 500);

		return () => {
			clearTimeout(id);
		};
	}, [values.searchTitle]);

	return (
		<div className="container mt-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-md-8 mb-5">
					<h2 className="mb-4 text-center">Search Post Titles</h2>
					<form>
						<div className="mb-3">
							<label htmlFor="searchTitle" className="form-label" hidden>
								Search Title
							</label>
							<input
								type="text"
								className="form-control"
								id="searchTitle"
								name="searchTitle"
								placeholder="Critical Success"
								value={values.searchTitle || ''}
								onChange={handleChanges}
								required
							/>
						</div>
					</form>
				</div>
				<div className="col-md-9">
					<div className="list-group">
						{matchedBlogs?.map(blog => (
							<div className="list-group-item" key={blog.id}>
								<div className="d-flex w-100 justify-content-between align-items-center">
									<div>
										<h5 className="mb-1">{blog.title}</h5>
										<small className="text-muted">
											By {blog.name} on{' '}
											{new Date(blog.created_at).toLocaleDateString()}
										</small>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
