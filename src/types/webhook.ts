export type WebhookEventType = "DIRECT_MESSAGE";

export interface CreateWebhookRequest {
    callback_url: string;
    event_type: WebhookEventType;
}

export interface CreateWebhookResponse {
    app_id: string;
    event_type: WebhookEventType;
    callback_url: string;
}

export interface GetWebhookRequest {
    event_type: WebhookEventType;
}

export interface GetWebhookResponse {
    app_id: string;
    event_type: WebhookEventType;
    callback_url?: string;
}

export interface DeleteWebhookRequest {
    event_type: WebhookEventType;
}

export interface DeleteWebhookResponse {
    app_id: string;
    event_type: WebhookEventType;
}
