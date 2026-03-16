import { TIKTOK_AUTH_BASE_URL } from "../constants.js";
import { TikTokApiError } from "../error.js";
import type { TikTokConfig } from "../types/config.js";
import type {
    TikTokTokenResponse,
    RefreshTokenResponse,
    RevokeTokenResponse,
} from "../types/auth.js";

export class Auth {
    constructor(private readonly config: TikTokConfig) { }

    getTokens(authCode: string): Promise<TikTokTokenResponse> {
        return this.post<TikTokTokenResponse>("/token/", {
            client_id: this.config.clientKey,
            client_secret: this.config.clientSecret,
            grant_type: "authorization_code",
            auth_code: decodeURIComponent(authCode),
            redirect_uri: this.config.redirectUri,
        });
    }
    refreshTokens(refreshToken: string): Promise<RefreshTokenResponse> {
        return this.post<RefreshTokenResponse>("/refresh_token/", {
            client_id: this.config.clientKey,
            client_secret: this.config.clientSecret,
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        });
    }
    revokeToken(accessToken: string): Promise<RevokeTokenResponse> {
        return this.post<RevokeTokenResponse>("/token/revoke/", {
            client_id: this.config.clientKey,
            client_secret: this.config.clientSecret,
            token: accessToken,
        });
    }
    // for tt_users
    getAuthorizationUrl(state?: string): string {
        const params = new URLSearchParams({
            client_key: this.config.clientKey,
            response_type: "code",
            scope: (this.config.scopes ?? []).join(","),
            redirect_uri: this.config.redirectUri ?? "",
            ...(state && { state }),
        });

        return `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
    }

    private async post<T>(
        path: string,
        body: Record<string, unknown>,
    ): Promise<T> {
        const response = await fetch(`${TIKTOK_AUTH_BASE_URL}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new TikTokApiError(response.status, response.statusText);
        }
        const json = await response.json();
        if (json.code !== 0) {
            throw new TikTokApiError(json.code, json.request_id);
        }
        return json.data as T;
    }
}
