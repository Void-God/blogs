import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
} from "@angular/core";
import {
  FormsModule,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { BlogsService } from "../../services/blogs.service";
import { Blog, BlogWithImage } from "../../services/blogs.model";
import { CommonModule } from "@angular/common";
import { BlogCardComponent } from "../blog-card/blog-card.component";
import { AuthService } from "../../services/auth.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../../auth-interceptor.interceptor";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, BlogCardComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  allBlogs: BlogWithImage[] = [];
  // blog =
  blog = this.formbuilder.group({
    title: new FormControl("", Validators.required),
    about: new FormControl(""),
  });
  edit: number;
  editId: number;
  search: string;

  ngOnInit() {}

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

  blogShowStatus = (title: string) => {
    return (
      !this.blogService.getSearchValue() ||
      title.includes(this.blogService.getSearchValue())
    );
  };

  getIsAuthenticated = () => {
    return this.authService.getAuth();
  };

  get title() {
    return this.blog.get("title");
  }
  get about() {
    return this.blog.get("about");
  }

  submitBlogForm = () => {
    if (this.edit === undefined) {
      this.addBlog();
    } else {
      this.editBlog();
    }
  };

  addBlog = () => {
    const title: string = this.title?.value as any;
    const about: string = this.about?.value as any;
    this.blogService.addBlog({
      blogTitle: title,
      aboutBlog: about,
    });
    this.title?.setValue("");
    this.about?.setValue("");
  };

  editBlog = () => {
    const title: string = this.title?.value as any;
    const about: string = this.about?.value as any;

    this.blogService.editBlog(
      this.edit as number,
      {
        blogTitle: title,
        aboutBlog: about,
      },
      this.editId
    );

    this.title?.setValue("");
    this.about?.setValue("");
    this.edit = undefined;
    this.editId = undefined;
  };

  deleteBlog = (blog: any) => {
    if (this.edit !== undefined) {
      alert("Complete edit before deleting!");
      return;
    }
    this.blogService.removeBlog(blog.index, blog.id);
  };

  editBlogInialize = (blog: any) => {
    this.edit = blog.index;
    this.editId = blog.id;
    this.title?.setValue(this.allBlogs[blog.index].blogTitle);
    this.about?.setValue(this.allBlogs[blog.index].aboutBlog);
  };
}
