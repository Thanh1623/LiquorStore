# Next.js Image Component Configuration

## Issue
`next/image` throws an error when loading images from external domains if the hostname is not explicitly allowed in `next.config.ts`.

## Solution
Add the domain to `images.remotePatterns` in `next.config.ts`.

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};
```
