FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY prisma ./prisma/

COPY . .

RUN npx prisma generate

EXPOSE 3000

ENV NODE_ENV=production

RUN npm run build

CMD npx prisma migrate deploy && npm run start
