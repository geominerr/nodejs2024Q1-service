import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { DatabaseService } from '../../database/database.service';

import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistNotFoundException } from './exceptions/http-exceptions';

@Injectable()
export class ArtistsService {
  constructor(private readonly db: DatabaseService) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.db.createArtist(createArtistDto);

    return plainToClass(Artist, artist);
  }

  async findAll() {
    const artists = await this.db.getAllArtists();

    return artists.map((artist) => plainToClass(Artist, artist));
  }

  async findOne(id: string) {
    const artist = await this.db.getArtist(id);

    if (!artist) {
      throw new ArtistNotFoundException();
    }

    return plainToClass(Artist, artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.db.getArtist(id);

    if (!artist) {
      throw new ArtistNotFoundException();
    }

    const updatedArtist: Artist = {
      ...artist,
      ...updateArtistDto,
    };

    const res = await this.db.updateArtist(id, updatedArtist);

    return plainToClass(Artist, res);
  }

  async remove(id: string) {
    const res = await this.db.removeArtist(id);

    if (!res) {
      throw new ArtistNotFoundException();
    }
  }
}
