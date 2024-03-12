interface ICreateArtistDto {
  name: string;
  grammy: boolean;
}

interface IGetArtistDto {
  id: string;
  name: string;
  grammy: boolean;
}

export { ICreateArtistDto, IGetArtistDto };
