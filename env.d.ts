declare namespace NodeJS {
  interface ProcessEnv {
    CLOUDFLARE_R2_ACCOUNT_ID: string;
    CLOUDFLARE_R2_ACCESS_KEY_ID: string;
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: string;
    CLOUDFLARE_R2_BUCKET_NAME: string;
    CLOUDFLARE_R2_ENDPOINT: string;
    CLOUDFLARE_R2_PUBLIC_BASE_URL?: string;
  }
}