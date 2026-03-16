import type { MediaContent } from "./media.js";

export type MessageType = "TEXT" | "SENDER_ACTION";
export type SenderAction = "TYPING" | "MARK_READ";
export type RecipientType = "CONVERSATION";
export type ConversationStatus = "ACTIVE" | "ARCHIVED";

export interface ListMessagesRequest {
    business_id: string;
    conversation_id: string;
}

export interface Message {
    message_id: string;
    conversation_id: string;
    message_type: MessageType;
    create_time: number;
    direction: "INBOUND" | "OUTBOUND";
    status: "SENT" | "DELIVERED" | "READ" | "FAILED";
    sender: {
        open_id: string;
        display_name: string;
        avatar_url: string;
    };
    content: {
        body: string;
    };
}

export interface ListMessagesResponse {
    messages: Message[];
    next_cursor: string | null;
    has_more: boolean;
    total: number;
}

export interface TextContent {
    body: string;
}

export interface SendTextMessageRequest {
    conversation_id?: string;
    business_id: string;
    recipient: string;
    message_type: MessageType;
    recipient_type?: RecipientType;
    text?: TextContent;
    sender_action?: SenderAction;
}

export interface SendTextMessageResponse {
    message_id: string;
    create_time: number;
}

// --- conversation
export type ConversationType = "STRANGER" | "SINGLE";

export interface ReferralAd {
    advertiser_id: string;
    ad_id: string;
    timestamp: number;
    ad_name: string;
    embed_url: string;
    message_material_id?: string;
}

export interface ReferralShortLink {
    ref: string;
    prefilled_message: string;
    prefilled_message_audit_status: "PASS" | "REJECT";
}

export interface ConversationReferral {
    ad?: ReferralAd[];
    short_link?: ReferralShortLink[];
}

export interface Conversation {
    conversation_id: string;
    update_time: number; // unix milliseconds
    referral: ConversationReferral;
}

export interface ListConversationsRequest {
    business_id: string;
    cursor?: number;
    conversation_type: ConversationType;
    limit?: number;
}

export interface ListConversationsResponse {
    conversations: Conversation[];
    has_more: boolean;
    cursor: number;
}

// ---image message
export interface SendImageMessageRequest {
    business_id: string;
    recipient_type: RecipientType;
    message_type: "IMAGE";
    recipient: string;
    image: MediaContent;
}

export interface SendImageMessageResponse {
    message_id: string;
    create_time: number;
}
