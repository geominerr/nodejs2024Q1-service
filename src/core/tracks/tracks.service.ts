import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { DatabaseService } from '../../database/database.service';

import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackNotFoundException } from './exceptions/http-exceptions';

@Injectable()
export class TracksService {
  constructor(private readonly db: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.db.createTrack(createTrackDto);

    return plainToClass(Track, track);
  }

  async findAll() {
    const tracks = await this.db.getAllTracks();

    return tracks.map((track) => plainToClass(Track, track));
  }

  async findOne(id: string) {
    const track = await this.db.getTrack(id);

    if (!track) {
      throw new TrackNotFoundException();
    }

    return plainToClass(Track, track);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.db.getTrack(id);

    if (!track) {
      throw new TrackNotFoundException();
    }

    const updatedTrack: Track = {
      ...track,
      ...updateTrackDto,
    };

    const res = await this.db.updateTrack(id, updatedTrack);

    return plainToClass(Track, res);
  }

  async remove(id: string) {
    const res = await this.db.removeTrack(id);

    if (!res) {
      throw new TrackNotFoundException();
    }
  }
}
