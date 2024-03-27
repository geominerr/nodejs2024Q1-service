import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@ApiBearerAuth()
@ApiTags('Artist')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new artist',
    description: 'Create new artist.',
  })
  @ApiResponse({ status: 201, description: 'Create new artist', type: Artist })
  @ApiResponse({ status: 400, description: 'Body not contain required fields' })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all artists',
    description: 'Retrieve a list of all artists.',
  })
  @ApiResponse({ status: 200, description: 'Get all artists', type: [Artist] })
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get artist by id',
    description: 'Retrieve a single artist by id.',
  })
  @ApiResponse({ status: 200, description: 'Get artist by id', type: Artist })
  @ApiResponse({ status: 400, description: 'Invalid artistId (not uuid)' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update artist info',
    description: 'Update information for a specific artist.',
  })
  @ApiResponse({ status: 200, description: 'Update artist info', type: Artist })
  @ApiResponse({ status: 400, description: 'Invalid artistId (not uuid)' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete a specific artist by id.',
  })
  @ApiResponse({ status: 204, description: 'Delete artist' })
  @ApiResponse({ status: 400, description: 'Invalid artistId (not uuid)' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.remove(id);
  }
}
