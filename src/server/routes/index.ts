import { Router } from 'express';
import authorsRouter from './authors';
import blogsRouter from './blogs';
import tagsRouter from './tags';
import blogtagsRouter from './blogtags';

const router = Router();

router.use('/authors', authorsRouter);
router.use('/blogs', blogsRouter);
router.use('/tags', tagsRouter);
router.use('/blogtags', blogtagsRouter);

export default router;
