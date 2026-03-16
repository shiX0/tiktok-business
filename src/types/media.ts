export type MediaType = "IMAGE";

export interface UploadMediaRequest {
    business_id: string;
    file: File | Blob;
    media_type: MediaType;
}
export interface MediaContent {
    media_id: string;
}
export type UploadMediaResponse = MediaContent;
