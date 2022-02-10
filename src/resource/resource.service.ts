import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceTypes } from './constants';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  getAll(): Promise<Resource[]> {
    return this.resourceRepository.find();
  }

  getByType(resourceType: ResourceTypes): Promise<Resource[]> {
    return this.resourceRepository.find({ resourceType: resourceType });
  }

  async getById(resourceId: number): Promise<Resource> {
    const resource = await this.resourceRepository.findOne(resourceId);
    if (!resource) {
      throw new NotFoundException(`Resource #${resourceId} not found`);
    }
    return resource;
  }

  async remove(resourceId: number) {
    const resource = await this.getById(resourceId);
    return this.resourceRepository.remove(resource);
  }

  create(createResourceDto: CreateResourceDto) {
    const resource = this.resourceRepository.create(createResourceDto);
    return this.resourceRepository.save(resource);
  }

  async update(resourceId: number, updateResourceDto: UpdateResourceDto) {
    const resource = await this.resourceRepository.preload({
      resourceId,
      ...updateResourceDto,
    });
    if (!resource) {
      throw new NotFoundException(`Resource #${resourceId} not found`);
    }
    return this.resourceRepository.save(resource);
  }
}
