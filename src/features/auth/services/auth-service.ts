import { erpApi } from "@/infrastructures/http";
import type {
  LoginResponse,
  RegistrationResponse,
} from "@/features/auth/types/auth-types";
import type {
  RegisterFormData,
  LoginFormData,
} from "@/features/auth/types/auth-schemas";

/**
 * Register a new user
 * @param data - Registration form data (name, email, password, password_confirmation)
 * @returns Promise with registration response
 */
export async function registerUser(
  data: RegisterFormData
): Promise<RegistrationResponse> {
  const response = await erpApi
    .post("auth/register", {
      json: data,
    })
    .json<RegistrationResponse>();

  return response;
}

/**
 * Login an existing user
 * @param data - Login form data (email, password, password_confirmation)
 * @returns Promise with login response containing token and user data
 */
export async function loginUser(data: LoginFormData): Promise<LoginResponse> {
  const response = await erpApi
    .post("auth/login", {
      json: data,
    })
    .json<LoginResponse>();

  return response;
}
