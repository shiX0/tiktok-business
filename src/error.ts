import { TikTokErrorCode, TIKTOK_ERROR_MESSAGES } from "./constants.js";

/**
 * TikTok API Errors
 */
export class TikTokApiError extends Error {
  public readonly message: string;

  constructor(
    public readonly code: TikTokErrorCode,
    public readonly requestId?: string,
  ) {
    const friendlyMessage =
      TIKTOK_ERROR_MESSAGES[code] || "An unknown TikTok API error occurred.";

    super(`TikTok API Error [${code}]: ${friendlyMessage}`);
    this.name = "TikTokApiError";
    this.message = friendlyMessage;
    Object.setPrototypeOf(this, TikTokApiError.prototype);
  }
}
