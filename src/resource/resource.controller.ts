import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourceService } from './resource.service';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get(':level/all')
  getResourceByType(@Param('level') resourceType: string) {
    return this.resourceService.getByType(resourceType);
  }

  @UseGuards(JwtAuthGuard)
  @Get('private/:resourceId')
  getResource(@Param('resourceId') resourceId: number) {
    return this.resourceService.getById(resourceId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('private/:resourceId')
  deleteResource(@Param('resourceId') resourceId: number) {
    return this.resourceService.remove(resourceId);
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
  createResource(@Body() createResourceDto: CreateResourceDto) {
    return this.resourceService.create(createResourceDto);
  }
}
