import { TIKTOK_API_BASE_URL } from "../constants.js";
import { TikTokApiError } from "../error.js";
import type { TikTokConfig } from "../types/config.js";
import type {
  CreateWebhookRequest,
  CreateWebhookResponse,
  DeleteWebhookRequest,
  DeleteWebhookResponse,
  GetWebhookRequest,
  GetWebhookResponse,
  WebhookEventType,
} from "../types/webhook.js";

export class WebhookService {
  constructor(private readonly config: TikTokConfig) {}
  create(params: CreateWebhookRequest): Promise<CreateWebhookResponse> {
    return this.post("/business/webhook/update/", {
      event_type: params.event_type,
      callback_url: params.callback_url,
    });
  }
  get(params: GetWebhookRequest): Promise<GetWebhookResponse> {
    return this.fetch("/business/webhook/list/", params.event_type);
  }

  delete(params: DeleteWebhookRequest): Promise<DeleteWebhookResponse> {
    return this.post("/business/webhook/delete/", {
      event_type: params.event_type,
    });
  }

  private async post<T>(
    path: string,
    body: Record<string, unknown>,
  ): Promise<T> {
    const response = await fetch(`${TIKTOK_API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        app_id: this.config.clientKey,
        secret: this.config.clientSecret,
        ...body,
      }),
    });
    return this.parseResponse<T>(response);
  }

  private async fetch<T>(
    path: string,
    event_type: WebhookEventType,
  ): Promise<T> {
    const url = new URL(`${TIKTOK_API_BASE_URL}${path}`);
    url.searchParams.set("app_id", this.config.clientKey);
    url.searchParams.set("secret", this.config.clientSecret);
    url.searchParams.set("event_type", event_type);

    const response = await globalThis.fetch(url.toString());
    return this.parseResponse<T>(response);
  }

  private async parseResponse<T>(response: Response): Promise<T> {
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
