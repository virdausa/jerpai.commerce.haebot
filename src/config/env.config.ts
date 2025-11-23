import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_ERP_URL: z.url(),
  ERP_URL: z.url(),
  ERP_SPACE: z.string(),
  ERP_SENDER: z.string(),
  ERP_TOKEN: z.string(),
  NODE_ENV: z
    .enum(["development", "production", "staging", "test"])
    .default("development"),
});

type EnvirontmentVariables = z.infer<typeof envSchema>;

const env = process.env as EnvirontmentVariables;

export { env, envSchema };
