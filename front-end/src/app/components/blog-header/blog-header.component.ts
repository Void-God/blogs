import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogsService } from '../../services/blogs.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog-header',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './blog-header.component.html',
  styleUrl: './blog-header.component.css'
})
export class BlogHeaderComponent {
  constructor(private blogService:BlogsService, public authService:AuthService) {
    
  }

  searchFor = (search:any) => {
    this.blogService.updateSearch(search.value);
  }

  logOut = () => {
    localStorage.clear();
    this.authService.setAuth(false);
  }

}
