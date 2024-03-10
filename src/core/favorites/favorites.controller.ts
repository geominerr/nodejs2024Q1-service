import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';
import { Favorites } from './entities/favorite.entity';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Retrieve a list of all favorites.',
  })
  @ApiResponse({ status: 200, description: 'Get favorites', type: Favorites })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/album/:id')
  @ApiOperation({
    summary: 'Add album to favorites',
    description: 'Add album to favorites.',
  })
  @ApiResponse({ status: 201, description: 'Add album', type: Album })
  @ApiResponse({ status: 400, description: 'Invalid albumId (not uuid)' })
  @ApiResponse({ status: 422, description: 'Album does not exists' })
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addFavorite('album', id);
  }

  @Delete('/album/:id')
  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete  album from favorites.',
  })
  @ApiResponse({ status: 204, description: 'Delete album from favorites' })
  @ApiResponse({ status: 400, description: 'Invalid albumId (not uuid)' })
  @ApiResponse({ status: 404, description: 'Album not found in favorites' })
  @HttpCode(204)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeFavorite('album', id);
  }

  @Post('/track/:id')
  @ApiOperation({
    summary: 'Add track to favorites',
    description: 'Add a track to favorites.',
  })
  @ApiResponse({ status: 201, description: 'Add track ', type: Track })
  @ApiResponse({ status: 400, description: 'Invalid trackId (not uuid)' })
  @ApiResponse({ status: 422, description: 'Track does not exists' })
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addFavorite('track', id);
  }

  @Delete('/track/:id')
  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites.',
  })
  @ApiResponse({ status: 204, description: 'Delete track from favorites' })
  @ApiResponse({ status: 400, description: 'Invalid trackId (not uuid)' })
  @ApiResponse({ status: 404, description: 'Track not found in favorites' })
  @HttpCode(204)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeFavorite('track', id);
  }

  @Post('/artist/:id')
  @ApiOperation({
    summary: 'Add artist to favorites',
    description: 'Add  artist to favorites.',
  })
  @ApiResponse({ status: 201, description: 'Add artist', type: Artist })
  @ApiResponse({ status: 400, description: 'Invalid artistId (not uuid)' })
  @ApiResponse({ status: 422, description: 'Artist does not exist' })
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addFavorite('artist', id);
  }

  @Delete('/artist/:id')
  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete  artist from favorites.',
  })
  @ApiResponse({ status: 204, description: 'Delete artist from favorites' })
  @ApiResponse({ status: 400, description: 'Invalid artistId (not uuid)' })
  @ApiResponse({ status: 404, description: 'Artist not found in favorites' })
  @HttpCode(204)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeFavorite('artist', id);
  }
}
