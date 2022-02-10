import { IsString } from 'class-validator';
import { ResourceTypes } from '../../constants';

export class CreateResourceDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly resourceType: ResourceTypes;
}
