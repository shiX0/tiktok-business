/**
 * TikTok Business API Base URLs
 */
export const TIKTOK_API_BASE_URL =
    "https://business-api.tiktok.com/open_api/v1.3";
export const TIKTOK_AUTH_BASE_URL = `${TIKTOK_API_BASE_URL}/tt_user/oauth2`;

/**
 * TikTok Business API Error Codes
 */
export enum TikTokErrorCode {
    NO_PERMISSION = 40001,
    PARAMETER_ERROR = 40002,
    OBJECT_NOT_FOUND = 40007,
    RATE_LIMIT_EXCEEDED = 40100,
    INVALID_ACCESS_TOKEN = 40105,
    UNSUPPORTED_FILE_TYPE = 40908,
    MESSAGE_BLOCKED = 40064,
    SYSTEM_ERROR = 51065,
    CODE_EXPIRED = 40131,
}

export const TIKTOK_ERROR_MESSAGES: Record<TikTokErrorCode, string> = {
    [TikTokErrorCode.NO_PERMISSION]:
        "No permission to perform the related operation. Ensure you have the necessary scopes.",
    [TikTokErrorCode.PARAMETER_ERROR]:
        "Parameter error. Check missing fields or incorrect formats in your request.",
    [TikTokErrorCode.OBJECT_NOT_FOUND]:
        "The operation or object does not exist. Check your IDs or URLs.",
    [TikTokErrorCode.RATE_LIMIT_EXCEEDED]:
        "Requests made too frequently. You are being throttled.",
    [TikTokErrorCode.INVALID_ACCESS_TOKEN]:
        "Invalid or incorrect access token. Please refresh or re-authorize.",
    [TikTokErrorCode.UNSUPPORTED_FILE_TYPE]:
        "The file type is unsupported. Refer to documentation for allowed formats.",
    [TikTokErrorCode.MESSAGE_BLOCKED]:
        "The message is blocked due to TikTok direct message rules.",
    [TikTokErrorCode.SYSTEM_ERROR]:
        "TikTok internal system error. Please retry the request.",
    [TikTokErrorCode.CODE_EXPIRED]:
        "The authorization code has expired. Please re-authorize to get a new code.",
};
