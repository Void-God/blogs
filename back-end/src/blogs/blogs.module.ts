import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blogs.entity';

@Module({
  providers: [BlogsService],
  controllers: [BlogsController],
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([Blog])
  ],
  
})
export class BlogsModule {}
