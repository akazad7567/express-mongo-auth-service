import express, { Request, Response } from 'express';
import { PostsHandler } from '../../services/posts/service.posts';

export const postRoutes = new express.Router();
const PostHandler = PostsHandler.getInstance();
postRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const { title, author, description, published } = req.body;
    const data = await PostHandler.addPost(
      title,
      author,
      description,
      published
    );
    res.ok({ data });
  } catch (error) {
    res.badRequest({ message: error });
  }
});
postRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const data = await PostHandler.getAllPost();
    res.ok({ data });
  } catch (error) {
    res.badRequest({ message: error });
  }
});
postRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await PostHandler.getPostById(id);
    res.ok({ data });
  } catch (error) {
    res.badRequest({ message: error });
  }
});
postRoutes.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await PostHandler.updatePostById(id, req.body);
    res.ok({ data });
  } catch (error) {
    res.badRequest({ message: error });
  }
});
postRoutes.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await PostHandler.deletePostById(id);
    res.ok({ data });
  } catch (error) {
    res.badRequest({ error });
  }
});
