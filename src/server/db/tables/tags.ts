import { SelectQuery, ModifyQuery } from '../queryUtils';

export interface ITagRow {
	id: number;
	name: string;
	created_at: string;
}

export function getAll() {
	return SelectQuery<ITagRow>('SELECT * FROM tags;');
}

export function getOne(id: number) {
	return SelectQuery<ITagRow>('SELECT * FROM tags WHERE id = ?;', [id]);
}

export function insert(newTag: Partial<ITagRow>) {
	return ModifyQuery('INSERT INTO tags SET ?;', newTag);
}

export function update(updatedTag: Partial<ITagRow>, id: number) {
	return ModifyQuery('UPDATE tags SET ? WHERE id = ?;', [updatedTag, id]);
}

export function destroy(id: number) {
	return ModifyQuery('DELETE FROM tags WHERE id = ?', [id]);
}
