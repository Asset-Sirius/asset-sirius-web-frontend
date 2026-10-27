import api, { setAuthToken } from '../lib/api';
import { env } from '../env';

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
const USE_MOCK_AUTH = import.meta.env.DEV || env('VITE_USE_MOCK_AUTH') === 'true';

export async function login(email: string, password: string): Promise<AuthResponse> {
  if (USE_MOCK_AUTH) {
    if (email.toLowerCase().includes('bloqueado')) {
      throw Object.assign(new Error('Acesso bloqueado'), { status: 423 });
    }

    if (email.toLowerCase().includes('offline')) {
      throw Object.assign(new Error('Servidor indisponível'), { status: 0 });
    }

    const response: AuthResponse = {
      accessToken: 'local-development-token',
      user: { email },
    };

    localStorage.setItem(STORAGE_KEY, response.accessToken);
    setAuthToken(response.accessToken);
    return response;
  }

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
