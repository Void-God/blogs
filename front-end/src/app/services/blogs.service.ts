import { Injectable } from '@angular/core';
import { Blog, BlogWithImage } from './blogs.model';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  blogs:BlogWithImage[] = [];
  search = ""

  constructor() { 
    const localBlogs = localStorage.getItem('blogs');
    if(localBlogs){
      this.blogs = JSON.parse(localBlogs);
    }
  }


  getSearchValue = () => {
    return this.search;
  }
  updateSearch = (newSearch:string) => {
    this.search = newSearch;
  }

  getBlogs = () => {
    return this.blogs;
  }
  addBlog = (blog:Blog) => {
    const image = Math.floor(Math.random() * 4)
    this.blogs.push({
      ...blog,
      image: image < 4 ?  image : 3 
    })
    localStorage.setItem('blogs', JSON.stringify(this.blogs));
  }
  removeBlog = (blogIndex:number) => {
    this.blogs.splice(blogIndex, 1);
    localStorage.setItem('blogs', JSON.stringify(this.blogs));
  }
  editBlog = (index:number , blog:Blog) => {
    this.blogs[index] = {...this.blogs[index],...blog};
    localStorage.setItem('blogs', JSON.stringify(this.blogs));
  }


}
