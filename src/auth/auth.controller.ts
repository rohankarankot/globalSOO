// auth.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../common/dto/auth-dto/login-user.dto';
import { RegistrationDto } from 'src/common/dto/auth-dto/register-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOAuthGuard } from 'src/common/guards/google-oauth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registrationDto: RegistrationDto,
  ): Promise<{ token: string }> {
    return this.authService.registerUser(registrationDto);
  }

  @Get('google-login')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google-redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    return this.authService.googleLogin(req, res);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }
}
