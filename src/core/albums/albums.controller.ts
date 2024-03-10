import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { Album } from './entities/album.entity';

@ApiTags('Album')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new album',
    description: 'Create a new album.',
  })
  @ApiResponse({ status: 201, description: 'Create new album', type: Album })
  @ApiResponse({ status: 400, description: 'Body not contain required fields' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all albums',
    description: 'Retrieve a list of all albums.',
  })
  @ApiResponse({ status: 200, description: 'Get all albums', type: [Album] })
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get album by id',
    description: 'Retrieve a single album by id.',
  })
  @ApiResponse({ status: 200, description: 'Get album by id', type: Album })
  @ApiResponse({ status: 400, description: 'Invalid albumId (not uuid)' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update album info',
    description: 'Update information for a specific album.',
  })
  @ApiResponse({ status: 200, description: 'Update album', type: Album })
  @ApiResponse({ status: 400, description: 'Invalid albumId (not uuid)' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete a specific album by id.',
  })
  @ApiResponse({ status: 204, description: 'Delete album' })
  @ApiResponse({ status: 400, description: 'Invalid albumId (not uuid)' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.remove(id);
  }
}
