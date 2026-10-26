import api, { setAuthToken } from '../lib/api';

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  fkGerente?: string | number | null;
  fkGestorFundo?: string | number | null;
};

// The backend no longer issues JWT access tokens for authentication.
// Login simply sends email+password and the server responds with
// success/failure (and optionally user data). We keep the function
// signature generic to accept whatever the backend returns.
export type AuthResponse = any;

export async function login(email: string, password: string): Promise<AuthResponse> {
  // Send credentials to the backend. Do NOT store or set any access
  // token here — authentication is handled server-side now.
  return api.post<AuthResponse>('/api/auth/login', { email, password });
}

export async function register(payload: RegisterRequest): Promise<any> {
  return api.post('/api/auth/register', payload);
}

// Previously the client restored a saved token from localStorage and
// injected it into the API client. With JWTs removed, these helpers
// are no-ops but are kept for compatibility with callers.
export function loadTokenFromStorage(): string | null {
  return null;
}

export function clearAuth() {
  // noop
}
