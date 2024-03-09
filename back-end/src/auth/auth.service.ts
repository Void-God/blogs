import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthReturnDto } from './auth';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        private readonly jwtService:JwtService
    ){}
    async authenticateUser(mail:string, password:string): Promise<AuthReturnDto> {

        
        const user:Auth =  await this.authRepository.findOne({ 
            where: {
                email : mail,
                password : password
            }
        });
        delete user.password;
        if(user){
            const payload = { mail:user.email , sub: user.id };
            const token = this.jwtService.sign(payload)
            return {
                ...user,
                token: token
            };
        }
        else {
            throw new Error('')
        }
       

    }
    

}
