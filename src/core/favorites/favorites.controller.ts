import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addFavorite('album', id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeFavorite('album', id);
  }

  @Post('/track/:id')
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addFavorite('track', id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeFavorite('track', id);
  }

  @Post('/artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addFavorite('artist', id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeFavorite('artist', id);
  }
}
