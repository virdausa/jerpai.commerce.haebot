import { env } from "@/config/env.config";
import ky from "ky";

const erpApi = ky.create({
  prefixUrl: `${env.ERP_URL}/api`,
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
