import { HttpClient } from "./http.js";
import { Auth } from "./services/auth.js";
import { MediaService } from "./services/media.js";
import { Messaging } from "./services/messaging.js";
import { WebhookService } from "./services/webhook.js";
import type { TikTokConfig } from "./types/config.js";

export class TikTokBusiness {
    readonly auth: Auth;
    readonly messaging: Messaging;
    readonly media: MediaService;
    readonly webhook: WebhookService;

    constructor(config: TikTokConfig) {
        const http = new HttpClient(config);
        this.auth = new Auth(config);
        this.messaging = new Messaging(http);
        this.media = new MediaService(http);
        this.webhook = new WebhookService(config);
    }
}
