# TikTok Business Messaging SDK

Lightweight **Node.js/TypeScript** wrapper for the TikTok Business Messaging API.

> ⚠️Unofficial SDK. Use at your own risk.

## Features

- Simple API client for messaging endpoints
- Built-in auth header handling
- Typed request/response models (TypeScript)
- Register/remove webhooks

## Installation

```bash
npm install tiktok-business-messaging
# or
pnpm add tiktok-business-messaging
```

## Quick Start

```ts
import { TikTokBusiness } from "tiktok-business-messaging";

const client = new TikTokBusiness({
    appId: process.env.TT_APP_ID!,
    appSecret: process.env.TT_APP_SECRET!,
    accessToken: process.env.TT_ACCESS_TOKEN!,
});
```

## License

MIT
