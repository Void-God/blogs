import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { BlogsModule } from "./blogs/blogs.module";
import { JwtShareModule } from "./jwt-share/jwt-share.module";

@Module({
  imports: [
    /**
     * mysql configuartion
     */
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "blogs",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),

    /**
     * other module
     */
    AuthModule,
    BlogsModule,
    JwtShareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
