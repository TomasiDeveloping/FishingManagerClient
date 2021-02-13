import {Address} from './address';

export interface User {
  userId: number;
  rightId: number;
  rightName: string;
  firstName: string;
  lastName: string;
  PictureUrl: string;
  email: string;
  address: Address;
  active: boolean;
}

export interface AppUser {
  userId: number;
  email: string;
  fullName: string;
  rightId: number;
  token: string;
}

export interface ChangePassword {
  userId: number;
  password: string;
}
