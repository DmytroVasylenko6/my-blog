export interface IUser {
  age: string | number;
  _id: string | number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export type TAvatar = string | null;

export type TToken = null | string;

export type TIsAuth = boolean;

export interface IDataUser {
  user: IUser;
  token: TToken;
}
