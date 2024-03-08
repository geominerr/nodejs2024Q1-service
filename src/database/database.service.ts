import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { Album, Artist, Track, User } from './models/db.model';
import { ICreateUserDto, IGetUserDto } from './models/user-dto.model';
import { ICreateTrackDto, IGetTrackDto } from './models/track-dto.model';

@Injectable()
export class DatabaseService {
  users: Map<string, User>;
  artists: Map<string, Artist>;
  albums: Map<string, Album>;
  tracks: Map<string, Track>;
  favorites = {
    artists: new Map(),
    albums: new Map(),
    tracks: new Map(),
  };

  constructor() {
    this.users = new Map();
    this.tracks = new Map();
    this.artists = new Map();
    this.albums = new Map();
  }

  // users
  public async createUser(dto: ICreateUserDto): Promise<User> {
    const uuid = randomUUID();
    const timestamp = new Date().getTime();

    const user: User = {
      ...dto,
      id: uuid,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.users.set(uuid, user);

    return user;
  }

  public async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  public async getAllUsers(): Promise<User[]> {
    return [...this.users.values()];
  }

  public async updateUser(id: string, dto: IGetUserDto): Promise<User> {
    const updatedUser: User = {
      ...dto,
      version: dto.version + 1,
      updatedAt: new Date().getTime(),
    };

    this.users.set(id, updatedUser);

    return updatedUser;
  }

  public async removeUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  // tracks
  public async createTrack(dto: ICreateTrackDto): Promise<Track> {
    const uuid = randomUUID();

    const track: Track = {
      ...dto,
      id: uuid,
    };

    this.tracks.set(uuid, track);

    return track;
  }

  public async getTrack(id: string): Promise<Track | undefined> {
    return this.tracks.get(id);
  }

  public async getAllTracks(): Promise<Track[]> {
    return [...this.tracks.values()];
  }

  public async updateTrack(id: string, dto: IGetTrackDto): Promise<Track> {
    const updatedtrack: Track = {
      ...dto,
    };

    this.tracks.set(id, updatedtrack);

    return updatedtrack;
  }

  public async removeTrack(id: string): Promise<boolean> {
    return this.tracks.delete(id);
  }
}
