interface ICreateUserDto {
  login: string;
  password: string;
}

interface IGetUserDto {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export { ICreateUserDto, IGetUserDto };
