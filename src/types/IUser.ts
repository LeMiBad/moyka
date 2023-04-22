export interface User {
  readonly id_token: string;
  readonly session_state?: any;
  readonly access_token?: string;
  readonly refresh_token?: string;
  readonly token_type?: string;
  readonly scope?: string;
  readonly profile?: any;
  readonly expires_at: number;
  readonly state?: any;
  readonly toStorageString: () => string;
}
