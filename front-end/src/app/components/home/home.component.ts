import { AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { BlogsService } from '../../services/blogs.service';
import { Blog, BlogWithImage } from '../../services/blogs.model';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, BlogCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnChanges {

  allBlogs: BlogWithImage[] = []
  // blog = 
  blog = this.formbuilder.group({
    title: new FormControl("", Validators.required),
    about: new FormControl("")
  });
  edit: number;
  search:string;

  ngOnInit() {
    const mutationNode = document.getElementById('mutationElement');

    const mutationObserver = new MutationObserver((mutationsOccured) => {
      mutationsOccured.forEach((mutation) => console.log("Element's color is changed and the mutation happened"));
    });

    mutationObserver.observe(mutationNode, {
      childList: true,
      attributes: true,
      characterData: true
    });
  }
  ngOnChanges(){
    console.log("change detected!")
  }

  constructor(
    private blogService: BlogsService, 
    private formbuilder: FormBuilder, 
    private authService: AuthService  
    ) {
    this.allBlogs = blogService.getBlogs();
    this.search = this.blogService.getSearchValue();
    // this.blog = formbuilder.group({
    //   title: new FormControl("", Validators.required),
    //   about: new FormControl("")
    // })



  }

 
  blogShowStatus = (title:string) => {
    return !this.blogService.getSearchValue() || title.includes(this.blogService.getSearchValue());
  }

  getIsAuthenticated = () => {
    return this.authService.getAuth()
  }



  get title() {
    return this.blog.get('title');
  }
  get about() {
    return this.blog.get('about');
  }

  submitBlogForm = () => {
    if (this.edit === undefined) {
      this.addBlog()
    }
    else {
      this.editBlog()
    }
  }

  addBlog = () => {
    const title: string = this.title?.value as any;
    const about: string = this.about?.value as any;
    this.blogService.addBlog({
      blogTitle: title,
      aboutBlog: about
    })
    this.title?.setValue('')
    this.about?.setValue('')
  }

  editBlog = () => {
    const title: string = this.title?.value as any;
    const about: string = this.about?.value as any;


    this.blogService.editBlog(this.edit as number, {
      blogTitle: title,
      aboutBlog: about
    })

    this.title?.setValue('')
    this.about?.setValue('')
    this.edit = undefined;
  }


  deleteBlog = (blogIndex: number) => {
    if (this.edit !== undefined) {
      alert("Complete edit before deleting!")
      return;
    }
    this.blogService.removeBlog(blogIndex);
  }

  editBlogInialize = (blogIndex: number) => {
    this.edit = blogIndex;
    this.title?.setValue(this.allBlogs[blogIndex].blogTitle);
    this.about?.setValue(this.allBlogs[blogIndex].aboutBlog);
  }

}
