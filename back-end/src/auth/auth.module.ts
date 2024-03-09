import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtShareModule } from 'src/jwt-share/jwt-share.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    /**
     * jwt configuration
     */
    JwtShareModule,
    TypeOrmModule.forFeature([Auth],
      
  )],
  exports: []
})
export class AuthModule {}
