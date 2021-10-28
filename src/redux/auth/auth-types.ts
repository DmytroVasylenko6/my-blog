export interface IUser {
  age: number | null;
  _id: string | number | null;
  name: string | null;
  email: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
export type TAvatar = string | null;

export type TToken = null | string;

export type TIsAuth = boolean;

export interface IDataUser {
  user: IUser;
  token: TToken;
}
