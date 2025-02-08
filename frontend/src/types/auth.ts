export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  confirmPassword: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  email: string;
  id: number;
} 