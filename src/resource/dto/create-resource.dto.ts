import { IsString } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly resourceType: string;
}
