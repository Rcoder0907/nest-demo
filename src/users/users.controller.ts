import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  loginUser(@Request() req) {
    // return this.userService.loginUser(
    //   loginUserDto.email,
    //   loginUserDto.password,
    // );
    return this.userService.login(req.user);
  }

  // @Post('logout')
  // logoutUser(@Body() body) {
  //   return body;
  // }
}
