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
		const newBlogTag = req.body;
		await db.blogtags.insert(newBlogTag);
		res.json({ message: 'Blogtag created' });
	} catch (error) {
		next(error);
	}
});

export default router;
