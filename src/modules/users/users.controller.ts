import {
  comparePassword,
  generateJWT,
  hashPassword,
} from '@src/core/utils/security';
import { Request, Response } from 'express';
import { UserDto } from './core/dto/user.dto';
import {
  mapUserDTOToEDM,
  mapUserEDMsToDTOs,
  mapUserEDMToDTO,
} from './core/mappers/user.mapper';
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
  findUserByUsername,
  updateUser,
} from './users.service';
import { createTResult } from '@src/core/mappers/tresult.mapper';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await findUserByUsername(username);
    console.log(user);
    if (!user) {
      return res.status(401).json(createTResult(null, ['Invalid credentials']));
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json(createTResult(null, ['Invalid credentials']));
    }

    if (!user.active) {
      return res.status(401).json(createTResult(null, ['User is not active']));
    }

    const response = mapUserEDMToDTO(user);

    const token = await generateJWT(response);

    return res.status(200).json({ ...response, token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await findUserById(Number(id));

    if (!user) {
      return res.status(404).json(createTResult(null, ['User not found']));
    }

    return res.status(200).json(createTResult(mapUserEDMToDTO(user)));
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers();

    return res.status(200).json(createTResult(mapUserEDMsToDTOs(users)));
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const user = req.body as UserDto;

    const newUser = await createUser(
      mapUserDTOToEDM({
        ...user,
        password: await hashPassword(user.password ?? 'admin12345'),
      }),
    );

    return res.status(201).json(createTResult(mapUserEDMToDTO(newUser)));
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.body as UserDto;

    const updatedUser = await updateUser(Number(id), mapUserDTOToEDM(user));

    return res.status(200).json(createTResult(mapUserEDMToDTO(updatedUser)));
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await deleteUser(Number(id));

    return res.status(200).json(createTResult(mapUserEDMToDTO(user)));
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
