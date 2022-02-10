import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ResourceTypes } from './constants';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourceService } from './resource.service';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get(':level/all')
  getResourceByType(@Param('level') resourceType: ResourceTypes) {
    return this.resourceService.getByType(resourceType);
  }

  @Get('private/:resourceId')
  getResource(@Param('resourceId') resourceId: number) {
    return this.resourceService.getById(resourceId);
  }

  @Delete('private/:resourceId')
  deleteResource(@Param('resourceId') resourceId: number) {
    return this.resourceService.remove(resourceId);
  }

  @Patch('private/:resourceId')
  updateResource(
    @Param('resourceId') resourceId: number,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourceService.update(resourceId, updateResourceDto);
  }

  @Post('private/:resourceId')
  createResource(@Body() createResourceDto: CreateResourceDto) {
    return this.resourceService.create(createResourceDto);
  }
}
