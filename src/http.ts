import { TikTokApiError } from "./error.js";
import type { RequestOptions } from "./types/common.js";
import type { TikTokConfig } from "./types/config.js";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestConfig {
    method: Method;
    path: string;
    opts: RequestOptions;
    params?: object;
    body?: unknown;
    form?: FormData;
}

export class HttpClient {
    private baseUrl: string;

    constructor(private config: TikTokConfig) {
        this.baseUrl =
            config.baseUrl ?? "https://business-api.tiktok.com/open_api/v1.3";
    }
    get<T>(path: string, params: object, opts: RequestOptions): Promise<T> {
        return this.request({ method: "GET", path, params, opts });
    }

    post<T>(path: string, body: unknown, opts: RequestOptions): Promise<T> {
        return this.request({ method: "POST", path, body, opts });
    }

    put<T>(path: string, body: unknown, opts: RequestOptions): Promise<T> {
        return this.request({ method: "PUT", path, body, opts });
    }

    patch<T>(path: string, body: unknown, opts: RequestOptions): Promise<T> {
        return this.request({ method: "PATCH", path, body, opts });
    }

    delete<T>(path: string, params: object, opts: RequestOptions): Promise<T> {
        return this.request({ method: "DELETE", path, params, opts });
    }
    upload<T>(path: string, form: FormData, opts: RequestOptions): Promise<T> {
        return this.request({ method: "POST", path, form, opts });
    }

    private async request<T>({
        method,
        path,
        params,
        body,
        form,
        opts,
    }: RequestConfig): Promise<T> {
        const res = await fetch(
            this.buildUrl(path, params),
            this.buildInit(method, body, opts, form),
        );
        return this.parseResponse<T>(res);
    }

    private buildUrl(path: string, params?: object): string {
        const url = new URL(`${this.baseUrl}${path}`);
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                if (v !== undefined && v !== null && v !== "") {
                    url.searchParams.set(k, String(v));
                }
            });
        }
        return url.toString();
    }

    private buildInit(
        method: Method,
        body: unknown,
        opts: RequestOptions,
        form?: FormData,
    ): RequestInit {
        const headers: Record<string, string> = {
            "Access-Token": opts.accessToken,
        };

        if (!form) {
            headers["Content-Type"] = "application/json";
        }

        return {
            method,
            signal: AbortSignal.timeout(
                opts.timeout ?? this.config.timeout ?? 10_000,
            ),
            headers,
            ...(form
                ? { body: form }
                : body !== undefined
                    ? { body: JSON.stringify(body) }
                    : {}),
        };
    }

    private async parseResponse<T>(res: Response): Promise<T> {
        console.debug(`[HttpClient] Parsing response for URL: ${res.url}`);
        console.debug(
            `[HttpClient] Response status: ${res.status} ${res.statusText}`,
        );
        console.debug(`[HttpClient] Response data:`, await res.clone().text());
        const json = await res.json();
        if (json.code !== 0) {
            throw new TikTokApiError(json.code, json.request_id);
        }
        return json.data as T;
    }
}
