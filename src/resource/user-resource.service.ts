import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserResource } from './entities/user-resource.entity';

@Injectable()
export class UserResourceService {
  constructor(
    @InjectRepository(UserResource)
    private readonly userResourceRepository: Repository<UserResource>,
  ) {}

  mapUserWithResource(userId: number, resourceId: number) {
    const mappedData = this.userResourceRepository.create({
      userId,
      resourceId,
    });
    return this.userResourceRepository.save(mappedData);
  }
}
