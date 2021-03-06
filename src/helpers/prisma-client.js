import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
