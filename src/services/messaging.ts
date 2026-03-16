import { HttpClient } from "../http.js";
import type { RequestOptions } from "../types/common.js";
import type {
    ListConversationsRequest,
    ListConversationsResponse,
    ListMessagesRequest,
    ListMessagesResponse,
    SendImageMessageRequest,
    SendImageMessageResponse,
    SendTextMessageRequest,
    SendTextMessageResponse,
} from "../types/messaging.js";

export class Messaging {
    constructor(private readonly http: HttpClient) { }

    /**
     * List all conversations for a business account
     */
    listConversations(
        params: ListConversationsRequest,
        opts: RequestOptions,
    ): Promise<ListConversationsResponse> {
        console.debug("[Messaging] listConversations called", { params });

        return this.http
            .get("/business/message/conversation/list/", params, opts)
            .then((response) => {
                console.debug("[Messaging] listConversations succeeded");
                return response as ListConversationsResponse;
            })
            .catch((error: unknown) => {
                console.error("[Messaging] listConversations failed", error);
                throw error;
            });
    }

    /**
     * Get messages in a specific conversation
     */
    listMessages(
        params: ListMessagesRequest,
        opts: RequestOptions,
    ): Promise<ListMessagesResponse> {
        console.log("Conversation ID:", encodeURIComponent(params.conversation_id));
        return this.http.get(
            "/business/message/content/list/",
            {
                ...params,
            },
            opts,
        );
    }

    /**
     * Send a text message to a conversation
     */
    sendTextMessage(
        body: SendTextMessageRequest,
        opts: RequestOptions,
    ): Promise<SendTextMessageResponse> {
        const { ...restBody } = body;
        return this.http.post(
            "/business/message/send/",
            { recipient_type: "CONVERSATION", ...restBody },
            opts,
        );
    }
    /**
     * Send an image message to a conversation
     */
    sendImageMessage(
        body: SendImageMessageRequest,
        opts: RequestOptions,
    ): Promise<SendImageMessageResponse> {
        return this.http.post(
            "/business/message/send/",
            {
                ...body,
            },
            opts,
        );
    }
}
