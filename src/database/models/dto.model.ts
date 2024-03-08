interface createUserDto {
  login: string;
  password: string;
}

interface getUserDto {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

interface updateUserDto {
  oldPassword: string;
  newPassword: string;
}

export { createUserDto, getUserDto, updateUserDto };
