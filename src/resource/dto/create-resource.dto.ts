import { IsString } from 'class-validator';
import { ResourceTypes } from '../constants';

export class CreateResourceDto {
  @IsString()
  readonly resourceId: number;

  @IsString()
  readonly resourceType: ResourceTypes;
}
