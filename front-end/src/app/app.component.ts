import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { BlogHeaderComponent } from "./components/blog-header/blog-header.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./auth-interceptor.interceptor";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, BlogHeaderComponent, HttpClientModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "blog-app";
}
