import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { DatabaseService } from '../../database/database.service';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  IncorrectOldPasswordException,
  UserNotFoundException,
} from './exceptions/http-exceptions';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.db.createUser(createUserDto);

    return plainToClass(User, user);
  }

  async findAll() {
    const users = await this.db.getAllUsers();

    return users.map((user) => plainToClass(User, user));
  }

  async findOne(id: string) {
    const user = await this.db.getUser(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return plainToClass(User, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;
    const user = await this.db.getUser(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.password !== oldPassword) {
      throw new IncorrectOldPasswordException();
    }

    const updatedUser: User = {
      ...user,
      password: newPassword,
    };

    const res = await this.db.updateUser(id, updatedUser);

    return plainToClass(User, res);
  }

  async remove(id: string) {
    const res = await this.db.removeUser(id);

    if (!res) {
      throw new UserNotFoundException();
    }
  }
}
