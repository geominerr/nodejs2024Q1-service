interface ICreateAlbumDto {
  name: string;
  year: number;
  artistId: string | null;
}

interface IGetAlbumDto {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export { ICreateAlbumDto, IGetAlbumDto };
