import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Blog, BlogWithImage } from '../../services/blogs.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent {

  images = [
    "/assets/images/blog-1.jpeg",
    "/assets/images/blog-2.jpg",
    "/assets/images/blog-3.jpg",
    "/assets/images/blog-4.jpg"
  ]

  @Input() blog!:BlogWithImage;
  @Input()  index!: number;
  @Output() blogDelete = new EventEmitter<number>()
  @Output() blogEdit = new EventEmitter<number>()

  constructor(private authService:AuthService){

  }

  isAuthenticated = () => {
    return this.authService.getAuth()
  }

  deleteThisBlog = () => {
    this.blogDelete.emit(this.index)
  }

  editThisBlog = () => {
    this.blogEdit.emit(this.index)
  }

}
