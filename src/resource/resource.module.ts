import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/users/roles/roles.guard';
import { Resource } from './entities/resource.entity';
import { UserResource } from './entities/user-resource.entity';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { UserResourceService } from './user-resource.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, UserResource])],
  controllers: [ResourceController],
  providers: [
    ResourceService,
    UserResourceService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class ResourceModule {}
