export interface IJwtConfig {
  cryptSalt: number;
  jwtSecretKey: string;
  jwtSecretRefreshKey: string;
  tokenExpireTime: string;
  tokenRefreshExpireTime: string;
}
