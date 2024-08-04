import { AxiosError } from 'axios';

export function handleAxiosError(error: unknown): [null, ErrResp | string] {
  if (error instanceof AxiosError) {
    const err: ErrResp = {
      status: error.response?.status || 0,
      errcode: error.response?.data?.err?.errcode || '',
      msg: error.response?.data?.msg || '',
      errdata: error.response?.data.err?.errdata,
    };
    return [null, err];
  }
  return [null, JSON.stringify(error)];
}

export const REGEX = {
  phoneNumber: new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  ),
};
