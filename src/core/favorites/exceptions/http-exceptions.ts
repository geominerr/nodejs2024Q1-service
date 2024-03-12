import { HttpException, HttpStatus } from '@nestjs/common';
import { FavoriteEntityType } from '../entities/favorite.entity';

export class FavoriteNotFoundException extends HttpException {
  constructor(entityType: FavoriteEntityType) {
    super(`Favorite ${entityType} not found`, HttpStatus.NOT_FOUND);
  }
}

export class EntityNotFoundException extends HttpException {
  constructor(entityType: FavoriteEntityType) {
    super(`${entityType} not found`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
