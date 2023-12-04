import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/:authorid', async (req, res, next) => {
	try {
		const authorid = parseInt(req.params.authorid, 10);

		if (!authorid) {
			return res.status(400).json({ message: 'Invalid authorid parameter' });
		}

		const [author] = await db.authors.getOne(authorid);

		if (!author) {
			return res.status(404).json({ message: 'Author not found' });
		}

		res.json(author);
	} catch (error) {
		next(error);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const authors = await db.authors.getAll();
		res.json(authors);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const newAuthor = req.body;
		const result = await db.authors.insert(newAuthor);
		res.json({ message: 'Author created', id: result.insertId });
	} catch (error) {
		next(error);
	}
});

router.put('/:authorid', async (req, res, next) => {
	try {
		const authorid = parseInt(req.params.authorid, 10);
		const newAuthor = req.body;

		if (!authorid) {
			return res.status(400).json({ message: 'Invalid authorid parameter' });
		}

		const result = await db.authors.update(newAuthor, authorid);

		if (!result.affectedRows) {
			return res.status(404).json({ message: 'Author not found' });
		}

		res.json({ message: `Author ${authorid} updated` });
	} catch (error) {
		next(error);
	}
});

router.delete('/:authorid', async (req, res, next) => {
	try {
		const authorid = parseInt(req.params.authorid, 10);

		if (!authorid) {
			return res.status(400).json({ message: 'Invalid authorid parameter' });
		}

		const result = await db.authors.destroy(authorid);

		if (!result.affectedRows) {
			return res.status(404).json({ message: 'Author not found' });
		}

		res.json({ message: `Author ${authorid} destroyed` });
	} catch (error) {
		next(error);
	}
});

export default router;
