export interface TikTokTokenResponse {
    access_token: string;
    refresh_token: string;
    access_token_expire_in: number;
    refresh_token_expire_in: number;
    token_type: string;
    scope: string;
    open_id: string;
}

export interface RefreshTokenResponse {
    access_token: string;
    access_token_expire_in: number;
    refresh_token: string;
    refresh_token_expire_in: number;
    token_type: string;
    scope: string;
    open_id: string;
}

export interface RevokeTokenResponse { }
