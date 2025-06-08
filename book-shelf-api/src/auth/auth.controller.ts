import { Controller, Post, Body, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, changePwUserDto } from './dto/index';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RecoverPasswordDto } from './dto/recover-password.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUser(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  loginUser(@Body() createAuthDto: LoginUserDto) {
    return this.authService.loginUser(createAuthDto);
  }


  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Post('change-password')
  changePassword(@Body() createAuthDto: changePwUserDto) {
    return this.authService.changePassword(createAuthDto);
  }

   @Post('recover-password')
  async recoverPassword(@Body() body: RecoverPasswordDto) {
    await this.authService.resetPasswordAndSendEmail(body.email);
    return { message: 'Nueva contraseña enviada al correo electrónico.' };
  }
  
}
