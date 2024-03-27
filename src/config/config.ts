const appConfig = () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 4000,
  },
});

const jwtConfig = () => ({
  jwt: {
    cryptSalt: parseInt(process.env.CRYPT_SALT, 10),
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtSecretRefreshKey: process.env.JWT_SECRET_REFRESH_KEY,
    tokenExpireTime: process.env.TOKEN_EXPIRE_TIME,
    tokenRefreshExpireTime: process.env.TOKEN_REFRESH_EXPIRE_TIME,
  },
});

const dbConfig = () => ({
  db: {
    dbHostPort: parseInt(process.env.DB_HOST_PORT, 10) || 5432,
    dbContainerPort: parseInt(process.env.DB_CONTAINER_PORT, 10) || 5432,
    dbHost: process.env.DB_HOST || '127.0.0.1',
    postgresUser: process.env.POSTGRES_USER || 'default_user',
    postgresPassword: process.env.POSTGRES_PASSWORD || 'default_password',
    postgresDb: process.env.POSTGRES_DB || 'default_db',
    databaseUrl:
      process.env.DATABASE_URL ||
      `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_CONTAINER_PORT}/${process.env.POSTGRES_DB}`,
  },
});

export { appConfig, jwtConfig, dbConfig };
