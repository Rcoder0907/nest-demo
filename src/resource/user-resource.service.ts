import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserResource } from './entities/user-resource.entity';

@Injectable()
export class UserResourceService {
  constructor(
    @InjectRepository(UserResource)
    private readonly userResourceRepository: Repository<UserResource>,
  ) {}

  async get(userId: number, resourceId: number): Promise<UserResource> {
    return this.userResourceRepository.findOne({
      where: {
        userId,
        resourceId,
      },
    });
  }

  async mapUserWithResource(
    userId: number,
    resourceId: number,
  ): Promise<UserResource> {
    let mappedData: UserResource = await this.get(userId, resourceId);
    if (mappedData) {
      throw new HttpException(
        `This resource is already assigned to you`,
        HttpStatus.BAD_REQUEST,
      );
    }
    mappedData = this.userResourceRepository.create({
      userId,
      resourceId,
    });
    return this.userResourceRepository.save(mappedData);
  }

  async remove(userId: number, resourceId: number) {
    const data: UserResource = await this.get(userId, resourceId);
    if (!data) {
      throw new HttpException(
        `This resource doens't exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userResourceRepository.remove(data);
  }
}
