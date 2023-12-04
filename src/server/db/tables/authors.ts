import { SelectQuery, ModifyQuery } from '../queryUtils';

export interface IAuthorRow {
	id: number;
	name: string;
	email: string;
	created_at: string;
}

export function getAll() {
	return SelectQuery<IAuthorRow>('SELECT * FROM authors;');
}

export function getOne(id: number) {
	return SelectQuery<IAuthorRow>('SELECT * FROM authors WHERE id = ?;', [id]);
}

export function insert(newAuthor: Partial<IAuthorRow>) {
	return ModifyQuery('INSERT INTO authors SET ?;', newAuthor);
}

export function update(updatedAuthor: Partial<IAuthorRow>, id: number) {
	return ModifyQuery('UPDATE authors SET ? WHERE id = ?;', [updatedAuthor, id]);
}

export function destroy(id: number) {
	return ModifyQuery('DELETE FROM authors WHERE id = ?', [id]);
}
