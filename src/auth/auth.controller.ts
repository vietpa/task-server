import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserModel } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() userData: any): Promise<UserModel> {
    userData.id = uuidv4();
    return this.authService.signUp(userData);
  }

  @Put()
  async login(@Body() userData: any): Promise<any> {
    const token = await this.authService.signIn(
      userData.username,
      userData.password,
    );
    return token;
  }
}
