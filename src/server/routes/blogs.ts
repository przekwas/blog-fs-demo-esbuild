import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/:blogid', async (req, res, next) => {
	try {
		const blogid = parseInt(req.params.blogid, 10);

		if (!blogid) {
			return res.status(400).json({ message: 'Invalid blogid parameter' });
		}

		const [blog] = await db.blogs.getOne(blogid);

		if (!blog) {
			return res.status(404).json({ message: 'Blog not found' });
		}

		res.json(blog);
	} catch (error) {
		next(error);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const blogs = await db.blogs.getAll();
		res.json(blogs);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const newBlog = req.body;
		newBlog.authorid = 3;
		const result = await db.blogs.insert(newBlog);
		res.json({ message: 'Blog created', id: result.insertId });
	} catch (error) {
		next(error);
	}
});

router.put('/:blogid', async (req, res, next) => {
	try {
		const blogid = parseInt(req.params.blogid, 10);
		const newBlog = req.body;

		if (!blogid) {
			return res.status(400).json({ message: 'Invalid blogid parameter' });
		}

		const result = await db.blogs.update(newBlog, blogid);

		if (!result.affectedRows) {
			return res.status(404).json({ message: 'Blog not found' });
		}

		res.json({ message: `Blog ${blogid} updated` });
	} catch (error) {
		next(error);
	}
});

router.delete('/:blogid', async (req, res, next) => {
	try {
		const blogid = parseInt(req.params.blogid, 10);

		if (!blogid) {
			return res.status(400).json({ message: 'Invalid blogid parameter' });
		}

		const result = await db.blogs.destroy(blogid);

		if (!result.affectedRows) {
			return res.status(404).json({ message: 'Author not found' });
		}

		res.json({ message: `Author ${blogid} destroyed` });
	} catch (error) {
		next(error);
	}
});

export default router;
