import { IsNumber } from 'class-validator';

export class CreateUserResourceDto {
  @IsNumber()
  readonly resourceId: number;

  @IsNumber()
  readonly userId: number;
}
