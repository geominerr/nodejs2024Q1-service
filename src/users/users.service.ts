import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';
import {
  IncorrectOldPasswordException,
  UserNotFoundException,
} from './exceptions/http-exceptions';
import { plainToClass } from 'class-transformer';
import { getUserDto } from 'src/database/models/dto.model';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.db.createUser(createUserDto);

    return plainToClass(GetUserDto, user);
  }

  async findAll() {
    const users = await this.db.getAllUsers();

    return users.map((user) => plainToClass(GetUserDto, user));
  }

  async findOne(id: string) {
    const user = await this.db.getUser(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return plainToClass(GetUserDto, user);
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

    const updatedUser: getUserDto = {
      ...user,
      password: newPassword,
    };

    const res = this.db.updateUser(id, updatedUser);

    return plainToClass(GetUserDto, res);
  }

  async remove(id: string) {
    const res = await this.db.removeUser(id);

    if (!res) {
      throw new UserNotFoundException();
    }
  }
}
