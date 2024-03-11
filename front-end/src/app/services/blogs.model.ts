export type Blog = {
  blogTitle: string;
  aboutBlog: string;
};

export type BlogWithImage = Blog & { image: number; id: number };
