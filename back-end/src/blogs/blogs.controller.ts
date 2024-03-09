import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-share/jwt-guard.guard';

@Controller('blogs')
@UseGuards(JwtAuthGuard)
export class BlogsController {
    
    
    @Post('create-blog')
    createBlog(
        @Body() request:any, 
        @Req() req:any
    ){
        console.log(req.user)
    }
    


}
