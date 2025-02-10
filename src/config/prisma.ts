import { PrismaClient } from '@prisma/client';

let prisma = null

if (process.env.NODE_ENV === 'test') {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL_TEST
      }
    }
  });
} else {
  prisma = new PrismaClient();
}

export default prisma;
