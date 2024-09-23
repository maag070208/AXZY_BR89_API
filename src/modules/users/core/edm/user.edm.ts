import { EntityBase } from '@src/core/entities/base.entity';
import { RoleEDM } from './role.edm';

export interface UserEDM extends EntityBase {
  username: string;
  password: string;
  name: string;
  roleId: number;
}

export interface UserEDMWithRole extends UserEDM {
  role: RoleEDM;
}
