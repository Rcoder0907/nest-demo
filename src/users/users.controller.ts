import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(
      loginUserDto.email,
      loginUserDto.password,
    );
  }

  @Post('logout')
  logoutUser(@Body() body) {
    return body;
  }
}
