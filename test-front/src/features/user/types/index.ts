import { User } from "types";

export type LoginReq = {
  username: string;
  password: string;
};

export type LoginRes = string;

export type RegisterReq = {
  username: string;
  password: string;
  profile: string;
};

export type RegisterRes = User;
