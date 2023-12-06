import { SelectQuery, ModifyQuery } from '../queryUtils';
import type { ITagRow } from './tags';

export interface IBlogTagRow {
	blogid: number;
	tagid: number;
}

export interface IBlogWithAuthorAndTag {
	blogid: number;
	tagid: number;
	title: string;
	content: string;
	created_at: string;
	authorName: string;
}

export function getAllBlogsForTag(tagid: number) {
	return SelectQuery<IBlogWithAuthorAndTag>(
		`SELECT
            blogs.id AS blogid,
            blogtags.tagid,
            blogs.title,
            blogs.content,
            blogs.created_at,
            authors.name AS authorName
        FROM blogtags
        JOIN blogs ON blogtags.blogid = blogs.id
        JOIN authors ON blogs.authorid = authors.id
        WHERE blogtags.tagid = ?;
    `,
		[tagid]
	);
}

export function getAllTagsForBlog(blogid: number) {
	return SelectQuery<ITagRow>(
		`SELECT
            tags.id,
            tags.name
        FROM blogtags
        JOIN tags ON blogtags.tagid = tags.id
        WHERE blogtags.blogid = ?;
        `,
		[blogid]
	);
}

export function insert(newBlogTag: IBlogTagRow) {
	return ModifyQuery('INSERT INTO blogtags SET ?;', newBlogTag);
}

export function update(updatedBlogTag: Partial<IBlogTagRow>, blogid: number) {
	return ModifyQuery('UPDATE blogtags SET ? WHERE blogid = ?;', [updatedBlogTag, blogid]);
}

export function destroy(blogid: number) {
	return ModifyQuery('DELETE FROM blogtags WHERE blogid = ?', [blogid]);
}
