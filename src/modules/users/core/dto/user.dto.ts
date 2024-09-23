import { DtoBase } from '@src/core/dto/base.dto';

export interface UserDto extends DtoBase {
  username: string;
  name: string;
  password?: string;
  roleId?: number;
}
