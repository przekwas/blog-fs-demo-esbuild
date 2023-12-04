import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/:tagid', async (req, res, next) => {
	try {
		const tagid = parseInt(req.params.tagid, 10);

		if (!tagid) {
			return res.status(400).json({ message: 'Invalid tagid parameter' });
		}

		const [tag] = await db.tags.getOne(tagid);

		if (!tag) {
			return res.status(404).json({ message: 'Tag not found' });
		}

		res.json(tag);
	} catch (error) {
		next(error);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const tags = await db.tags.getAll();
		res.json(tags);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const newTag = req.body;
		const result = await db.tags.insert(newTag);
		res.json({ message: 'Tag created', id: result.insertId });
	} catch (error) {
		next(error);
	}
});

router.put('/:tagid', async (req, res, next) => {
	try {
		const tagid = parseInt(req.params.tagid, 10);
		const newTag = req.body;

		if (!tagid) {
			return res.status(400).json({ message: 'Invalid tagid parameter' });
		}

		const result = await db.tags.update(newTag, tagid);

		if (!result.affectedRows) {
			return res.status(404).json({ message: 'Tag not found' });
		}

		res.json({ message: `Tag ${tagid} updated` });
	} catch (error) {
		next(error);
	}
});

router.delete('/:tagid', async (req, res, next) => {
	try {
		const tagid = parseInt(req.params.tagid, 10);

		if (!tagid) {
			return res.status(400).json({ message: 'Invalid tagid parameter' });
		}

		const result = await db.tags.destroy(tagid);

		if (!result.affectedRows) {
			return res.status(404).json({ message: 'Author not found' });
		}

		res.json({ message: `Tag ${tagid} destroyed` });
	} catch (error) {
		next(error);
	}
});

export default router;
