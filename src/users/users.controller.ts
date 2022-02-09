import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UsersController {
  @Post('login')
  loginUser(@Body() body) {
    return body;
  }

  @Post('logout')
  logoutUser(@Body() body) {
    return body;
  }
}
