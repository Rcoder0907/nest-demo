import { IsString } from 'class-validator';

export class CreateUserDto {
  constructor(name: string, email: string, password: string, role: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly role: string;
}
