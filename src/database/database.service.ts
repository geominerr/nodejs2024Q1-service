import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { User } from './models/db.model';
import { createUserDto, getUserDto } from './models/dto.model';

@Injectable()
export class DatabaseService {
  users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  public async createUser(dto: createUserDto): Promise<User | null> {
    const uuid = randomUUID();
    const timestamp = new Date().getTime();

    const user: User = {
      ...dto,
      id: uuid,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.users.set(uuid, user);

    return user;
  }

  public async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  public async getAllUsers(): Promise<User[]> {
    return [...this.users.values()];
  }

  public async updateUser(id: string, dto: getUserDto): Promise<User> {
    const updatedUser: User = {
      ...dto,
      version: dto.version + 1,
      updatedAt: new Date().getTime(),
    };

    this.users.set(id, updatedUser);

    return updatedUser;
  }

  public async removeUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }
}
