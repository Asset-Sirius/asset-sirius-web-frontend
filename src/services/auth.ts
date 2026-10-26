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

export type AuthResponse = {
  accessToken: string;
  expiresIn?: number;
  user?: Record<string, any>;
};

const STORAGE_KEY = 'accessToken';

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/api/auth/login', { email, password });
  const accessToken = (res as any)?.accessToken;
  if (accessToken) {
    localStorage.setItem(STORAGE_KEY, accessToken);
    setAuthToken(accessToken);
  }
  return res;
}

export async function register(payload: RegisterRequest): Promise<any> {
  return api.post('/api/auth/register', payload);
}

export function loadTokenFromStorage(): string | null {
  const t = localStorage.getItem(STORAGE_KEY);
  if (t) setAuthToken(t);
  return t;
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEY);
  setAuthToken(null);
}
