import { SelectQuery, ModifyQuery } from '../queryUtils';
import type { IAuthorRow } from './authors';

export interface IBlogRow {
	id: number;
	authorid: number;
	title: string;
	content: string;
	created_at: string;
}

export function getAll() {
	return SelectQuery<IBlogRow & Pick<IAuthorRow, 'name'>>(`
    SELECT 
        blogs.id,
        blogs.authorid,
        blogs.title,
        blogs.content,
        blogs.created_at,
        authors.name
    FROM blogs
    JOIN authors ON blogs.authorid = authors.id
    ORDER BY blogs.created_at DESC;`);
}

export function getOne(id: number) {
    return SelectQuery<IBlogRow & Pick<IAuthorRow, 'name'>>(`
    SELECT 
        blogs.id,
        blogs.authorid,
        blogs.title,
        blogs.content,
        blogs.created_at,
        authors.name
    FROM blogs
    JOIN authors ON blogs.authorid = authors.id
    WHERE blogs.id = ?;`, [id]);
}

export function search(title: string) {
    return SelectQuery('SELECT * FROM blogs WHERE title LIKE ?', [`%${title}%`])
}

export function insert(newBlog: Partial<IBlogRow>) {
	return ModifyQuery('INSERT INTO blogs SET ?;', newBlog);
}

export function update(updatedBlog: Partial<IBlogRow>, id: number) {
	return ModifyQuery('UPDATE blogs SET ? WHERE id = ?;', [updatedBlog, id]);
}

export function destroy(id: number) {
	return ModifyQuery('DELETE FROM blogs WHERE id = ?', [id]);
}
