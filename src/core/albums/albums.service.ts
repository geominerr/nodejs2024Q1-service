import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { DatabaseService } from '../../database/database.service';

import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumNotFoundException } from './exceptions/http-exceptions';

@Injectable()
export class AlbumsService {
  constructor(private readonly db: DatabaseService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.db.createAlbum(createAlbumDto);

    return plainToClass(Album, album);
  }

  async findAll() {
    const albums = await this.db.getAllAlbums();

    return albums.map((album) => plainToClass(Album, album));
  }

  async findOne(id: string) {
    const album = await this.db.getAlbum(id);

    if (!album) {
      throw new AlbumNotFoundException();
    }

    return plainToClass(Album, album);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.db.updateAlbum(id, updateAlbumDto);

    if (!album) {
      throw new AlbumNotFoundException();
    }

    return plainToClass(Album, album);
  }

  async remove(id: string) {
    const res = await this.db.removeAlbum(id);

    if (!res) {
      throw new AlbumNotFoundException();
    }
  }
}
