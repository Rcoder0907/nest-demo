import { IsNumber, IsString } from 'class-validator';

export class CreateResourceDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly type: string;
}
