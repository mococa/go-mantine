export namespace Auth {
  export interface SetStorageTokensInput {
    access_token: string;
    refresh_token: string;
    id_token: string;
    storage_method: 'session' | 'local';
  }
  export interface ClearStorageTokensInput {
    storage_method: 'session' | 'local';
  }
}
