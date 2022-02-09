import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('resource')
export class ResourceController {
  @Get(':level/all')
  getResourceByProtectionLevel(@Param('level') protectionLevel: string) {
    return protectionLevel;
  }

  @Get('private/:resourceId')
  getResource(@Param('resourceId') resourceId: number) {
    return 'hello';
  }

  @Delete('private/:resourceId')
  deleteResource(@Param('resourceId') resourceId: number) {
    return 'hello';
  }

  @Patch('private/:resourceId')
  updateResource(@Param('resourceId') resourceId: number, @Body() body) {
    return 'hello';
  }

  @Post('private/:resourceId')
  createResource(@Body() body) {
    return 'hello';
  }
}
