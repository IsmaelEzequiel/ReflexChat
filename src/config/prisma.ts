import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient();

if (process.env.NODE_ENV === 'test') {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL_TEST
      }
    }
  });
}

export default prisma;
