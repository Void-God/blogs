import { BadRequestException, Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './auth.entity';
import { AuthReturnDto } from './auth';

@Controller('auth')
export class AuthController {

    constructor(
        private authService:AuthService
    ){}

    @Post('login')
    @UsePipes(new ValidationPipe({ transform: true }))
    async login(@Body() request: Auth): Promise<AuthReturnDto> {
        try{
            return await this.authService.authenticateUser(request.email, request.password);
        }
        catch{
            throw new BadRequestException('Credential Not Valid!');
        }
    }


}
