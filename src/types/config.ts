export interface TikTokConfig {
    clientKey: string;
    clientSecret: string;
    redirectUri?: string;
    scopes?: string[];
    baseUrl?: string;
    timeout?: number;
}
