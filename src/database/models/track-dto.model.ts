interface ICreateTrackDto {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

interface IGetTrackDto {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export { ICreateTrackDto, IGetTrackDto };
