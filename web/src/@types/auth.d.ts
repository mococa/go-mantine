export namespace Auth {
  export interface Decoded {
    aud: string;
    auth_time: number;
    email_verified: boolean;
    email: string;
    event_id: string;
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    origin_jti: string;
    sub: string;
    token_use: string;

    // Cognito custom fields

    'custom:full_name': string;
    picture: string;
  }
}
