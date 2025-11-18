import { z } from "zod";

const envSchema = z.object({
  ERP_URL: z.url(),
  ERP_SPACE: z.string(),
  ERP_SENDER: z.string(),
  ERP_TOKEN: z.string(),
  NODE_ENV: z
    .enum(["development", "production", "staging", "test"])
    .default("development"),
});

export const env = envSchema.parse(process.env);
