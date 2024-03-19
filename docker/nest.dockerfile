
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

CMD  npx prisma generate && npx prisma migrate deploy && npm run start:dev