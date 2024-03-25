import { User as DbEntity } from '@prisma/client';
import { User } from '../models/db.model';

export const transformUserData = (user: DbEntity): User => ({
  ...user,
  createdAt: new Date(user.createdAt).getTime(),
  updatedAt: new Date(user.updatedAt).getTime(),
});
