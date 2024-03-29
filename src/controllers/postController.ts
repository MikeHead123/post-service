import express, { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { ClientError } from '../common/error';
import validate from '../middleware/validate';
import verifyToken from '../middleware/verifyToken';
import createPostSchema from '../schemas/post';
import PostService from '../services/post';
import UserService from '../services/user';

interface IPostRequest extends Request {
  query: {
    author: string;
  };
}

const router = express.Router();

router.use(verifyToken);

router.post('/', validate(createPostSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userService = Container.get(UserService);
    const postService = Container.get(PostService);
    const user = await userService.getById(req.body.author);

    if (!user) {
      throw new ClientError('User not found', 404);
    }

    const post = await postService.create({
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
    });

    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req: IPostRequest, res: Response, next: NextFunction) => {
  try {
    const postService = Container.get(PostService);
    const posts = await postService.get(req.query.author);

    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
});

export default router;
