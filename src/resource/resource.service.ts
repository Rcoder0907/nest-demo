import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourceService implements OnModuleInit {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  onModuleInit() {
    this.seedResources();
  }

  getAll(): Promise<Resource[]> {
    return this.resourceRepository.find();
  }

  getByType(resourceType: string): Promise<Resource[]> {
    return this.resourceRepository.find({
      where: { resourceType },
    });
  }

  async getById(id: number): Promise<Resource> {
    const resource = await this.resourceRepository.findOne(id);
    if (!resource) {
      throw new NotFoundException(`Resource #${id} not found`);
    }
    return resource;
  }

  async remove(id: number) {
    const resource = await this.getById(id);
    return this.resourceRepository.remove(resource);
  }

  create(createResourceDto: CreateResourceDto) {
    const resource = this.resourceRepository.create(createResourceDto);
    return this.resourceRepository.save(resource);
  }

  async update(id: number, updateResourceDto: UpdateResourceDto) {
    // const resource = await this.getById(resourceId);
    // if(updateResourceDto.name) resource.name = updateResourceDto.name;
    const resource = await this.resourceRepository.preload({
      id,
      ...updateResourceDto,
    });
    if (!resource) {
      throw new NotFoundException(`Resource #${id} not found`);
    }
    return this.resourceRepository.save(resource);
  }

  async seedResources() {
    const data = [
      {
        name: '/products',
        resourceType: 'public',
      },
      {
        name: '/profile',
        resourceType: 'private',
      },
      {
        name: '/orders',
        resourceType: 'admin',
      },
      {
        name: '/categories',
        resourceType: 'public',
      },
      {
        name: '/account',
        resourceType: 'private',
      },
      {
        name: '/payments',
        resourceType: 'admin',
      },
    ];
    const existingRowsCount = await this.resourceRepository.count();
    if (existingRowsCount == 0) {
      console.log('Seeding Resources: Started', data);
      return data.map(async (d) => {
        const resourceDto: CreateResourceDto = new CreateResourceDto(
          d.name,
          d.resourceType,
        );
        return this.create(resourceDto);
      });
    } else {
      console.log('Seeding Resources: Skipped. Seems data is already present');
    }
  }
}
