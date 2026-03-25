import { describe, it, expect } from "vitest";
describe("index.ts exports", () => {
  it("should export TikTokBusiness class", async () => {
    const module = await import("./index.js");
    expect(module.TikTokBusiness).toBeDefined();
  });

  it("should export TikTokApiError class", async () => {
    const module = await import("./index.js");
    expect(module.TikTokApiError).toBeDefined();
  });

  it("should export auth types", async () => {
    const module = await import("./index.js");
    expect(module).toBeDefined();
  });

  it("should export config types", async () => {
    const module = await import("./index.js");
    expect(module).toBeDefined();
  });

  it("should export messaging types", async () => {
    const module = await import("./index.js");
    expect(module).toBeDefined();
  });
});
