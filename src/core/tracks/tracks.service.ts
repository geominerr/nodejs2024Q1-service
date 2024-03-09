import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { DatabaseService } from '../../database/database.service';
import { TrackNotFoundException } from './exceptions/http-exceptions';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { GetTrackDto } from './dto/get-track.dto';

@Injectable()
export class TracksService {
  constructor(private readonly db: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.db.createTrack(createTrackDto);

    return plainToClass(GetTrackDto, track);
  }

  async findAll() {
    const tracks = await this.db.getAllTracks();

    return tracks.map((track) => plainToClass(GetTrackDto, track));
  }

  async findOne(id: string) {
    const track = await this.db.getTrack(id);

    if (!track) {
      throw new TrackNotFoundException();
    }

    return plainToClass(GetTrackDto, track);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.db.getTrack(id);

    if (!track) {
      throw new TrackNotFoundException();
    }

    const updatedTrack: GetTrackDto = {
      ...track,
      ...updateTrackDto,
    };

    const res = this.db.updateTrack(id, updatedTrack);

    return plainToClass(GetTrackDto, res);
  }

  async remove(id: string) {
    const res = await this.db.removeTrack(id);

    if (!res) {
      throw new TrackNotFoundException();
    }
  }
}
