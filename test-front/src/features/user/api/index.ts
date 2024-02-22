import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";
import { LoginReq, LoginRes, RegisterReq, RegisterRes } from "../types";

const api = makeApi(`${Env.API_BASE_URL}`);

export const login = (data: LoginReq): Promise<LoginRes> =>
  api.post(`/api/auth/sign-in`, data);

export const register = (data: RegisterReq): Promise<RegisterRes> =>
  api.post(`/api/sign-up`, data);

export const getCurrent = (): Promise<RegisterRes> => api.get(`/api/current`);

export default {
  login,
  register,
  getCurrent,
};
