import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Blog } from "./blogs.entity";

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>
  ) {}

  addBlog = async (obj: Blog) => {
    const newBlog = this.blogRepository.create(obj);
    return await this.blogRepository.save(newBlog);
  };

  getBlogs = async (userId: number) => {
    return await this.blogRepository.find({
      where: {
        userId: userId,
        isDeleted: 0,
      },
    });
  };

  deleteBlog = async (blogId: number, userId: number) => {
    const blog = await this.blogRepository.findOne({
      where: {
        id: blogId,
        userId: userId,
      },
    });
    blog.isDeleted = 1;
    if (!blog) {
      throw new Error("Blog not found");
    }
    return await this.blogRepository.save(blog);
  };

  editBlog = async (blogId: number, userId: number, edit: any) => {
    const blog = await this.blogRepository.findOne({
      where: {
        id: blogId,
        userId: userId,
      },
    });
    const updatedBlog = {
      ...blog,
      ...edit,
    };
    if (!blog) {
      throw new Error("Blog not found");
    }
    return await this.blogRepository.save(updatedBlog);
  };
}
