import React from 'react';
import {
	useNavigate,
	useLoaderData,
	ActionFunctionArgs,
	ParamParseKey,
	Params
} from 'react-router-dom';
import { fetchData } from '../services/fetchData';
import type { IBlog, ITag } from '../types';

const PathNames = {
	blogDetail: '/blogs/:blogid'
} as const;

interface Args extends ActionFunctionArgs {
	params: Params<ParamParseKey<typeof PathNames.blogDetail>>;
}

export const detailsLoader = async ({ params }: Args) => {
	try {
		const blog = await fetchData(`/api/blogs/${params.blogid}`);
		const tags = await fetchData(`/api/blogtags/${params.blogid}/tags`);
		return { blog, tags };
	} catch (error) {
		throw error;
	}
};

interface DetailsProps {}

const Details = (props: DetailsProps) => {
	const navigate = useNavigate();
	const { blog, tags } = useLoaderData() as { blog: IBlog; tags: ITag[] };

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-lg-8 offset-lg-2">
					<button onClick={handleGoBack} className="btn btn-outline-secondary mb-4">
						&larr; Go Back
					</button>
					<article>
						<header className="mb-4">
							<h1 className="fw-bolder mb-1">{blog.title}</h1>
							<div className="text-muted fst-italic mb-2">
								By {blog.name} on {new Date(blog.created_at).toLocaleDateString()}
							</div>
							<div>
								{tags?.map(tag => (
									<span className="badge bg-info me-2" key={tag.id}>
										{tag.name}
									</span>
								))}
							</div>
						</header>
						<section className="mb-5">
							{blog.content.split('\n').map((paragraph, index) => (
								<p className="fs-5 mb-4" key={index}>
									{paragraph}
								</p>
							))}
						</section>
					</article>
					<button onClick={handleGoBack} className="btn btn-outline-secondary my-4">
						&larr; Go Back
					</button>
				</div>
			</div>
		</div>
	);
};

export default Details;
