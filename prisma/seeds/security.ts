import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const securitySeed = async (prisma: PrismaClient) => {
  await roleSeed(prisma);
  await adminSeed(prisma);
};

const roleSeed = async (prisma: PrismaClient) => {
  await prisma.$transaction([
    prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
        name: 'admin',
      },
    }),
    prisma.role.upsert({
      where: { name: 'operaciones' },
      update: {},
      create: {
        name: 'operaciones',
      },
    }),
    prisma.role.upsert({
      where: { name: 'almacen' },
      update: {},
      create: {
        name: 'almacen',
      },
    }),
  ]);
};

const adminSeed = async (prisma: PrismaClient) => {
  const adminRole = await prisma.role.findUnique({
    where: { name: 'admin' },
  });

  if (adminRole) {
    const adminPassword = await bcrypt.hash('admin12345', 10);

    await prisma.user.upsert({
      where: { username: 'admin' },
      update: {
        password: adminPassword,
      },
      create: {
        username: 'admin',
        password: adminPassword,
        name: 'Admin',
        roleId: adminRole?.id ?? 1,
      },
    });
  }
};
