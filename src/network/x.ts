/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleAxiosError } from '@/utils/helpers';
import axios, { AxiosRequestConfig } from 'axios';

export const xApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

type Data = unknown | null;

export type Error = ErrResp | string | null;

export async function xApiPost(
  url: string,
  body?: any,
  token?: string,
  config?: AxiosRequestConfig<any>
): Promise<[Data, Error]> {
  try {
    const customConfig: AxiosRequestConfig<any> = {
      ...config,
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    const response = await xApiInstance.post(url, body, customConfig);

    return [response.data.data ?? response.data, null];
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function xApiGet(
  url: string,
  token?: string,
  config?: AxiosRequestConfig<any>
): Promise<[Data, Error] | undefined> {
  try {
    const customConfig: AxiosRequestConfig<any> = {
      ...config,
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    const response = await xApiInstance.get(url, customConfig);
    return [response.data.data, null];
  } catch (error) {
    return handleAxiosError(error);
  }
}
