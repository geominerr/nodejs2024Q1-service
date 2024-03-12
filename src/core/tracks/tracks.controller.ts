import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { Track } from './entities/track.entity';

@ApiTags('Track')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new track',
    description: 'Create new track.',
  })
  @ApiResponse({ status: 201, description: 'Create new track', type: Track })
  @ApiResponse({ status: 400, description: 'Body not contain required fields' })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tracks',
    description: 'Retrieve a list of all tracks.',
  })
  @ApiResponse({ status: 200, description: 'Get all tracks', type: [Track] })
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get track by id',
    description: 'Retrieve a single track by id.',
  })
  @ApiResponse({ status: 200, description: 'Get track by id', type: Track })
  @ApiResponse({ status: 400, description: 'Invalid trackId (not uuid)' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update track info',
    description: 'Update information for a specific track.',
  })
  @ApiResponse({ status: 200, description: 'Update track info', type: Track })
  @ApiResponse({ status: 400, description: 'Invalid trackId (not uuid)' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete track',
    description: 'Delete a specific track by id.',
  })
  @ApiResponse({ status: 204, description: 'Delete track' })
  @ApiResponse({ status: 400, description: 'Invalid trackId (not uuid)' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.remove(id);
  }
}
