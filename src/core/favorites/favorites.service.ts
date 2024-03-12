import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';
import { FavoriteEntityType } from './entities/favorite.entity';
import {
  EntityNotFoundException,
  FavoriteNotFoundException,
} from './exceptions/http-exceptions';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return await this.db.getFavorites();
  }

  async addFavorite(type: FavoriteEntityType, id: string) {
    const res = await this.db.addFavorite(type, id);

    if (!res) {
      throw new EntityNotFoundException(type);
    }

    return {
      message: `${type} with id: ${id} successfully added to favorites`,
    };
  }

  async removeFavorite(type: FavoriteEntityType, id: string) {
    const res = await this.db.removeFavorite(type, id);

    if (!res) {
      throw new FavoriteNotFoundException(type);
    }

    return {
      message: `${type} with id: ${id} successfully removed from favorites`,
    };
  }
}
