import { InterfacePostHandler } from "../interfaces/interface.postHandler";
import { validate } from "../config/validationRules.config";
import { PostsDb } from "./db.services/db.service.post";

const PostDb = PostsDb.getInstance();
export class PostsHandler implements InterfacePostHandler {
  private static postInstance: PostsHandler;
  private constructor() {}

  public static getInstance(): PostsHandler {
    if (!this.postInstance) {
      this.postInstance = new PostsHandler();
    }
    return this.postInstance;
  }

  async addPost(
    title: string,
    author: string,
    description: string,
    published: string
  ) {
    const data = {
      title,
      author,
      description,
      published,
    };
    validate(data, "postSchemaValidate");

    const post = await PostDb.create(data);
    return post;
  }

  async getAllPost() {
    const posts = await PostDb.getAll();
    return posts;
  }

  async getPostById(id: number) {
    const post = await PostDb.get(id);
    return post;
  }

  async updatePostById(id: number, data: string) {
    const post = await PostDb.update(id, data);
    return post;
  }

  async deletePostById(id: string) {
    await PostDb.delete(id);
    return { message: "Post deleted" };
  }
}
