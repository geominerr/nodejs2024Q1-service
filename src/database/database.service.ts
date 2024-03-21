import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { PrismaService } from '../prisma/prisma.service';
import { transformUserData } from './utils/user-transform.util';

import { User, Track, Artist, Album } from './models/db.model';
import { ICreateUserDto, IGetUserDto } from './models/user-dto.model';
import { ICreateTrackDto, IGetTrackDto } from './models/track-dto.model';
import { ICreateArtistDto, IGetArtistDto } from './models/artist-dto.model';
import { ICreateAlbumDto } from './models/album-dto.model';
import { FavoriteEntityType } from './models/favorites-entity,model';

@Injectable()
export class DatabaseService {
  favoriteId: string = randomUUID();

  initData = {
    login: 'user',
    password: 'random',
  };

  constructor(private readonly prisma: PrismaService) {
    this.initDb();
  }

  private async initDb() {
    try {
      const favorites = await this.prisma.favorites.findFirst();

      this.favoriteId = favorites.id;
    } catch {
      const testUser = await this.prisma.user.create({
        data: {
          ...this.initData,
        },
      });

      await this.prisma.favorites.create({
        data: {
          id: this.favoriteId,
          userId: testUser.id,
        },
      });
    }
  }

  // users
  public async createUser(dto: ICreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        ...dto,
      },
    });

    return transformUserData(user);
  }

  public async getUser(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return transformUserData(user);
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => transformUserData(user));
  }

  public async updateUser(id: string, dto: IGetUserDto): Promise<User> {
    const { password, version } = dto;

    const user = await this.prisma.user.update({
      where: { id },
      data: { password, version: version + 1 },
    });

    return transformUserData(user);
  }

  public async removeUser(id: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.delete({
        where: { id: id },
      });

      return transformUserData(user);
    } catch {
      return null;
    }
  }

  // tracks;
  public async createTrack(dto: ICreateTrackDto): Promise<Track> {
    const track = await this.prisma.track.create({
      data: {
        ...dto,
      },
    });

    return track;
  }

  public async getTrack(id: string): Promise<Track | null> {
    return await this.prisma.track.findUnique({ where: { id } });
  }

  public async getAllTracks(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  public async updateTrack(id: string, dto: IGetTrackDto): Promise<Track> {
    return await this.prisma.track.update({ where: { id }, data: { ...dto } });
  }

  public async removeTrack(id: string): Promise<Track | null> {
    try {
      return await this.prisma.track.delete({ where: { id } });
    } catch {
      return null;
    }
  }

  // artists
  public async createArtist(dto: ICreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({ data: { ...dto } });
  }

  public async getArtist(id: string): Promise<Artist | undefined> {
    return await this.prisma.artist.findUnique({ where: { id } });
  }

  public async getAllArtists(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  public async updateArtist(id: string, dto: IGetArtistDto): Promise<Artist> {
    return await this.prisma.artist.update({ where: { id }, data: { ...dto } });
  }

  public async removeArtist(id: string): Promise<string | null> {
    const { prisma } = this;

    try {
      await prisma.$transaction([
        prisma.artist.delete({ where: { id } }),
        prisma.album.updateMany({
          where: { artistId: id },
          data: {
            artistId: null,
          },
        }),
        prisma.track.updateMany({
          where: { artistId: id },
          data: {
            artistId: null,
          },
        }),
      ]);

      return id;
    } catch {
      return null;
    }
  }

  // albums
  public async createAlbum(dto: ICreateAlbumDto): Promise<Album> {
    return await this.prisma.album.create({ data: { ...dto } });
  }

  public async getAlbum(id: string): Promise<Album | undefined> {
    return await this.prisma.album.findUnique({ where: { id } });
  }

  public async getAllAlbums(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  public async updateAlbum(
    id: string,
    dto: ICreateAlbumDto,
  ): Promise<Album | null> {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: { ...dto },
      });
    } catch {
      return null;
    }
  }

  public async removeAlbum(id: string): Promise<string | null> {
    const { prisma } = this;

    try {
      await prisma.$transaction([
        prisma.album.delete({ where: { id } }),
        prisma.track.updateMany({
          where: { albumId: id },
          data: {
            albumId: null,
          },
        }),
      ]);

      return id;
    } catch {
      return null;
    }
  }

  // favorites
  public async getFavorites() {
    const { prisma } = this;
    const favorites = await prisma.favorites.findUnique({
      where: { id: this.favoriteId },
    });

    const artists = await prisma.artist.findMany({
      where: { id: { in: favorites.artists } },
    });
    const albums = await prisma.album.findMany({
      where: { id: { in: favorites.albums } },
    });
    const tracks = await prisma.track.findMany({
      where: { id: { in: favorites.tracks } },
    });

    const res = {
      artists: artists || [],
      albums: albums || [],
      tracks: tracks || [],
    };

    return res;
  }

  public async addFavorite(
    type: FavoriteEntityType,
    id: string,
  ): Promise<string | null> {
    const { prisma, favoriteId } = this;

    switch (type) {
      case 'album':
        try {
          const album = await prisma.album.findUnique({ where: { id } });

          if (!album) {
            return null;
          }

          const ids = await prisma.favorites.findUnique({
            where: { id: favoriteId },
            select: { albums: true },
          });

          await prisma.favorites.update({
            where: { id: favoriteId },
            data: {
              albums: [...new Set([...ids.albums, id])],
            },
          });

          return id;
        } catch {
          return null;
        }
      case 'artist':
        try {
          const artist = await prisma.artist.findUnique({ where: { id } });

          if (!artist) {
            return null;
          }

          const artistIds = await prisma.favorites.findUnique({
            where: { id: favoriteId },
            select: { artists: true },
          });

          await prisma.favorites.update({
            where: { id: favoriteId },
            data: {
              artists: [...new Set([...artistIds.artists, id])],
            },
          });

          return id;
        } catch {
          return null;
        }
      case 'track':
        try {
          const track = await prisma.track.findUnique({ where: { id } });

          if (!track) {
            return null;
          }

          const trackIds = await prisma.favorites.findUnique({
            where: { id: favoriteId },
            select: { tracks: true },
          });

          await prisma.favorites.update({
            where: { id: favoriteId },
            data: {
              tracks: [...new Set([...trackIds.tracks, id])],
            },
          });

          return id;
        } catch {
          return null;
        }
      default:
        return null;
    }
  }

  public async removeFavorite(
    type: FavoriteEntityType,
    id: string,
  ): Promise<string | null> {
    const { prisma, favoriteId } = this;

    switch (type) {
      case 'album':
        const album = await prisma.favorites.findUnique({
          where: { id: favoriteId },
          select: { albums: true },
        });

        if (!album.albums.includes(id)) {
          return null;
        }

        await prisma.favorites.update({
          where: { id: favoriteId },
          data: { albums: [...album.albums.filter((id) => id !== id)] },
        });

        return id;
      case 'artist':
        const artist = await prisma.favorites.findUnique({
          where: { id: favoriteId },
          select: { artists: true },
        });

        if (!artist.artists.includes(id)) {
          return null;
        }

        await prisma.favorites.update({
          where: { id: favoriteId },
          data: { artists: [...artist.artists.filter((id) => id !== id)] },
        });

        return id;
      case 'track':
        const track = await prisma.favorites.findUnique({
          where: { id: favoriteId },
          select: { tracks: true },
        });

        if (!track.tracks.includes(id)) {
          return null;
        }

        await prisma.favorites.update({
          where: { id: favoriteId },
          data: { tracks: [...track.tracks.filter((id) => id !== id)] },
        });

        return id;
      default:
        return null;
    }
  }
}
