import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.seedUsers();
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      userId: user.id,
    };
  }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async seedUsers() {
    const data = [
      {
        name: 'user1',
        email: 'user1@email.com',
        password: '123456',
        role: 'user',
      },
      {
        name: 'user2',
        email: 'user2@email.com',
        password: '123456',
        role: 'user',
      },
      {
        name: 'admin1',
        email: 'admin1@email.com',
        password: '123456',
        role: 'admin',
      },
      {
        name: 'admin2',
        email: 'admin2@email.com',
        password: '123456',
        role: 'admin',
      },
    ];
    const existingRowsCount = await this.userRepository.count();
    if (existingRowsCount == 0) {
      console.log('Seeding Users: Started', data);
      return data.map(async (d) => {
        const userDto: CreateUserDto = new CreateUserDto(
          d.name,
          d.email,
          d.password,
          d.role,
        );
        return this.create(userDto);
      });
    } else {
      console.log('Seeding Users: Skipped. Seems data is already present');
    }
  }
}
