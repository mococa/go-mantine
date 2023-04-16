/* ---------- External ---------- */
import axios, { AxiosRequestConfig } from 'axios';
import jwt_decode from 'jwt-decode';

/* ---------- Types ---------- */
import { Auth } from '_@types/auth';

/* ---------- Helpers ---------- */
import { clearStorageTokens } from '_utils/helpers/auth/clearStorageTokens';

/* ---------- Services ---------- */
import { auth } from '_services/auth';

/* ---------- Constants ---------- */
const urls = {
  backend_url: process.env.NEXT_PUBLIC_BACKEND_URL,
  local_backend_url: process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL,
  main_bucket_url: process.env.NEXT_PUBLIC_MAIN_BUCKET_URL,
};

/* ---------- APIs Helpers ---------- */
const public_api = axios.create({
  baseURL: urls.backend_url,
  withCredentials: true,
});

const private_api = axios.create({
  baseURL: urls.backend_url,
  withCredentials: true,
});

const bucket_api = axios.create({
  baseURL: urls.main_bucket_url,
});

const local_api = axios.create({
  baseURL: urls.local_backend_url,
});

const local_private_api = axios.create({
  baseURL: urls.local_backend_url,
});

/* ---------- Interceptors ---------- */
const private_api_interceptor = async (config: AxiosRequestConfig) => {
  try {
    const id_token = localStorage.getItem('@%name%:id_token');

    if (!id_token) return config;

    const decoded_token: Auth.Decoded = jwt_decode(id_token as string);

    const exp = decoded_token.exp * 1000;

    if (new Date() > new Date(exp)) {
      throw new Error('Unauthorized');
    }

    if (!config.headers) throw new Error('Unauthorized');

    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = id_token;
  } catch {
    clearStorageTokens({ storage_method: 'local' });
    clearStorageTokens({ storage_method: 'session' });

    window.location.href = '/';
  }

  return config;
};

private_api.interceptors.request.use(private_api_interceptor);

/* ---------- Services ---------- */
export const services = {
  auth,
};

/* ---------- APIs ---------- */
export const apis = {
  private: private_api,
  public: public_api,
  local: local_api,
  local_private: local_private_api,
  bucket: bucket_api,
};
