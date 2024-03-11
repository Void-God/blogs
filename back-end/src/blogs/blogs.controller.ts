import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/jwt-share/jwt-guard.guard";
import { BlogsService } from "./blogs.service";
import { Blog } from "./blogs.entity";

@Controller("blogs")
@UseGuards(JwtAuthGuard)
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @Post("create-blog")
  async createBlog(@Body() request: Blog, @Req() req: any) {
    return await this.blogService.addBlog({
      ...request,
      userId: req.user.sub,
    });
  }

  @Get("all")
  async getBlogs(@Req() req: any) {
    return await this.blogService.getBlogs(req.user.sub);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlog(@Param("id") id: string, @Req() req: any) {
    try {
      await this.blogService.deleteBlog(parseInt(id), req.user.sub);
    } catch (e) {
      throw new BadRequestException("Could not delete!");
    }
  }

  @Put(":id")
  async editBlog(@Param("id") id: string, @Req() req: any, @Body() body: any) {
    try {
      return await this.blogService.editBlog(parseInt(id), req.user.sub, body);
    } catch (e) {
      throw new BadRequestException("Could not Update");
    }
  }
}
