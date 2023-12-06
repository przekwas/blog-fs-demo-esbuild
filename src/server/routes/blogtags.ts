import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/:tagid/blogs', async (req, res, next) => {
	try {
		const tagid = parseInt(req.params.tagid, 10);

		if (!tagid) {
			return res.status(400).json({ message: 'Invalid tagid parameter' });
		}

		const blogs = await db.blogtags.getAllBlogsForTag(tagid);
		res.json(blogs);
	} catch (error) {
		next(error);
	}
});

router.get('/:blogid/tags', async (req, res, next) => {
	try {
		const blogid = parseInt(req.params.blogid, 10);

		if (!blogid) {
			return res.status(400).json({ message: 'Invalid blogid parameter' });
		}

		const tags = await db.blogtags.getAllTagsForBlog(blogid);
		res.json(tags);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { blogid, tagid } = req.body;
		for (const id of tagid) {
			await db.blogtags.insert({ blogid, tagid: id });
		}
		res.json({ message: 'Blogtag(s) created' });
	} catch (error) {
		next(error);
	}
});

router.delete('/:blogid/blog', async (req, res, next) => {
	try {
		const blogid = parseInt(req.params.blogid, 10);

		if (!blogid) {
			return res.status(400).json({ message: 'Invalid blogid parameter' });
		}

		await db.blogtags.destroy(blogid);

		res.json({ message: 'Blogtag(s) destroyed' });
	} catch (error) {
		next(error);
	}
});

router.put('/', async (req, res, next) => {
	try {
		const { blogid, tagid } = req.body;

		await db.blogtags.destroy(blogid);

		for (const id of tagid) {
			await db.blogtags.insert({ blogid, tagid: id });
		}
		res.json({ message: 'Blogtag(s) edited' });
	} catch (error) {
		next(error);
	}
});

export default router;
