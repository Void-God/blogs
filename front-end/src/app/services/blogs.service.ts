import { Injectable } from "@angular/core";
import { Blog, BlogWithImage } from "./blogs.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BlogsService {
  blogs: BlogWithImage[] = [];
  search = "";
  base_url = "http://localhost:5000";

  constructor(private http: HttpClient) {
    const token = localStorage.getItem("token");
    if (token) this.fetchBlogs();
  }

  getSearchValue = () => {
    return this.search;
  };
  updateSearch = (newSearch: string) => {
    this.search = newSearch;
  };

  getBlogs = () => {
    return this.blogs;
  };
  addBlog = (blog: Blog) => {
    this.http
      .post(`${this.base_url}/blogs/create-blog`, blog)
      .subscribe((newBlog: any) => {
        this.addBlogToArray(newBlog);
      });
  };

  addBlogToArray = (blog: BlogWithImage) => {
    const image = Math.floor(Math.random() * 4);
    this.blogs.push({
      ...blog,
      image: image < 4 ? image : 3,
    });
  };
  removeBlog = (blogIndex: number, blogId: number) => {
    this.http.delete(`${this.base_url}/blogs/${blogId}`).subscribe(() => {
      this.blogs.splice(blogIndex, 1);
    });
  };
  editBlog = (index: number, blog: Blog, blogId: number) => {
    this.http.put(`${this.base_url}/blogs/${blogId}`, blog).subscribe(() => {
      this.blogs[index] = { ...this.blogs[index], ...blog };
    });
  };

  fetchBlogs = () => {
    this.http.get(`${this.base_url}/blogs/all`).subscribe((data: any) => {
      data.forEach((element: any) => {
        this.addBlogToArray(element);
      });
    });
  };
}
