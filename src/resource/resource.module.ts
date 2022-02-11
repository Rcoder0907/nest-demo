import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { UserResource } from './entities/user-resource.entity';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { UserResourceService } from './user-resource.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, UserResource])],
  controllers: [ResourceController],
  providers: [ResourceService, UserResourceService],
})
export class ResourceModule {}
