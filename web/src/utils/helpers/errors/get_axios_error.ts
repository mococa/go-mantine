/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';

export const get_axios_error = (error: any): string | undefined => {
  const axios_error = error as AxiosError;

  if (axios_error && axios_error.response && axios_error.response.data.message)
    return axios_error.response.data.message as string;

  if (error.message) return error.message;

  return undefined;
};
