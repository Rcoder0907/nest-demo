import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourceService } from './resource.service';
import { UserResourceService } from './user-resource.service';

@Controller('resource')
export class ResourceController {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly userResourceService: UserResourceService,
  ) {}

  @Get('public/all')
  getPublicResource() {
    return this.resourceService.getByType(['public']);
  }

  @UseGuards(JwtAuthGuard)
  @Get('onlyadmin/all')
  getAdminResource() {
    // return this.resourceService.getByType([`private`, 'admin']);
  }

  @UseGuards(JwtAuthGuard)
  @Get('private/:resourceId')
  getResource(@Param('resourceId') resourceId: string) {
    if (resourceId === `all`) {
      return this.resourceService.getByType([`private`]);
    }
    return this.resourceService.getById(+resourceId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('private/:resourceId')
  async deleteResource(
    @Param('resourceId') resourceId: number,
    @Req() req: any,
    @Res() res: any,
  ) {
    await this.userResourceService.remove(req.user.userId, resourceId);
    return res
      .status(HttpStatus.ACCEPTED)
      .send('The resource has been deleted');
  }

  @UseGuards(JwtAuthGuard)
  @Patch('private/:resourceId')
  updateResource(
    @Param('resourceId') resourceId: number,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourceService.update(resourceId, updateResourceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('private/:resourceId')
  async createResource(
    @Param('resourceId') resourceId: number,
    @Req() req: any,
  ) {
    const resource = await this.resourceService.getById(resourceId);
    if (resource.resourceType !== 'private') {
      throw new HttpException(
        `This resource is not private and hence can not be assigned to you.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userResourceService.mapUserWithResource(
      req.user.userId,
      resourceId,
    );
  }
}
