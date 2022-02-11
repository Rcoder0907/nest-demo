import { IsString } from 'class-validator';

export class CreateResourceDto {
  constructor(name, resourceType) {
    this.name = name;
    this.resourceType = resourceType;
  }

  @IsString()
  readonly name: string;

  @IsString()
  readonly resourceType: string;
}
