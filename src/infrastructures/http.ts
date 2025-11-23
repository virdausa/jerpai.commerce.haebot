import { env } from "@/config/env.config";
import ky from "ky";

const prefix =
  env.ERP_URL ?? env.NEXT_PUBLIC_ERP_URL ?? "https://bodo.nerpai.space";

const erpApi = ky.create({
  prefixUrl: `${prefix}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      (request, options) => {
        const { token } = options.context;
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

export { erpApi };
