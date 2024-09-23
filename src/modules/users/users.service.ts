import { prismaClient } from '@src/core/config/database';
import { UserEDM, UserEDMWithRole } from './core/edm/user.edm';

export const findUserByUsername = async (
  username: string,
): Promise<UserEDMWithRole | null> => {
  return await prismaClient.user.findUnique({
    where: {
      username,
      active: true,
    },
    include: {
      role: true,
    },
  });
};

export const findAllUsers = async (): Promise<UserEDM[]> => {
  return await prismaClient.user.findMany({
    where: {
      active: true,
    },
  });
};

export const findUserById = async (id: number): Promise<UserEDM | null> => {
  return await prismaClient.user.findUnique({
    where: {
      id,
      active: true,
    },
  });
};

export const createUser = async (user: UserEDM): Promise<UserEDM> => {
  return await prismaClient.user.create({
    data: user,
  });
};

export const updateUser = async (
  id: number,
  user: UserEDM,
): Promise<UserEDM> => {
  return await prismaClient.user.update({
    where: {
      id,
      active: true,
    },
    data: user,
  });
};

export const deleteUser = async (id: number): Promise<UserEDM> => {
  return await prismaClient.user.update({
    where: {
      id,
    },
    data: {
      active: false,
    },
  });
};
