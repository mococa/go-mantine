/* ---------- External ---------- */
import jwt_decode from 'jwt-decode';

/* ---------- Types ---------- */
import { Auth } from '_@types/auth';
import { Models } from '_@types/models';

export const parse_id_token = (id_token: string): Models.User => {
  const {
    email,
    sub,
    'custom:full_name': full_name,
    picture,
  }: Auth.Decoded = jwt_decode(id_token);

  return { email, full_name, picture, sub };
};
