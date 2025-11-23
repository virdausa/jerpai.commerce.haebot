/**
 * Authentication API Response Types
 * These types match the exact JSON structures from the backend API.
 */

/**
 * Registration API Response
 * Returned after successful user registration
 */
export interface RegistrationResponse {
  data: {
    name: string;
    email: string;
    updated_at: string;
    created_at: string;
    id: number;
    player_id: number;
  };
  success: boolean;
  message: string;
}

/**
 * Login API Response
 * Returned after successful user login
 */
export interface LoginResponse {
  token: string;
  token_type: string;
  success: boolean;
  user: {
    id: number;
    username: string;
    name: string;
    email: string;
    email_verified_at: string | null;
    birth_date: string | null;
    left_date: string | null;
    sex: string | null;
    id_card_number: string | null;
    address: string;
    phone_number: string;
    status: string;
    role_id: number;
    player_id: number;
    created_at: string;
    updated_at: string;
  };
}

/**
 * User type extracted from LoginResponse
 */
export type User = LoginResponse["user"];
