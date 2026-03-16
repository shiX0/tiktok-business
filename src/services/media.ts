import type { HttpClient } from "../http.js";
import type { RequestOptions } from "../types/common.js";
import type {
    UploadMediaRequest,
    UploadMediaResponse,
} from "../types/media.js";

export class MediaService {
    constructor(private readonly http: HttpClient) { }
    upload(
        params: UploadMediaRequest,
        opts: RequestOptions,
    ): Promise<UploadMediaResponse> {
        const form = new FormData();
        form.append("business_id", params.business_id);
        form.append("file", params.file);
        form.append("media_type", params.media_type);

        return this.http.upload("/business/message/media/upload/", form, opts);
    }
}
