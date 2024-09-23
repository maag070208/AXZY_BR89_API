import { UserDto } from '../dto/user.dto';
import { UserEDM, UserEDMWithRole } from '../edm/user.edm';

export const mapUserEDMToDTO = (
  userEDM: UserEDM | UserEDMWithRole,
): UserDto => {
  let user: UserDto = {
    id: userEDM.id,
    uuid: userEDM.uuid,
    username: userEDM.username,
    name: userEDM.name,
  };

  if ('role' in userEDM) {
    user = {
      ...user,
      roleId: userEDM.role.id,
    };
  }
  return user;
};

export const mapUserEDMsToDTOs = (usersEDM: UserEDM[]): UserDto[] => {
  return usersEDM.map((user) => mapUserEDMToDTO(user));
};

export const mapUserDTOToEDM = (userDTO: UserDto): UserEDM => {
  return {
    username: userDTO.username,
    name: userDTO.name,
    password: userDTO.password ?? '',
    roleId: userDTO.roleId ?? 1,
  };
};
