import api from '../lib/api';
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

// The backend no longer issues JWT access tokens for authentication.
// Login simply sends email+password and the server responds with
// success/failure (and optionally user data). We keep the function
// signature generic to accept whatever the backend returns.
export type AuthResponse = {
  user: {
    id: string;
    email: string;
    isAdm: boolean;
    fkGerente?: string | null;
    fkGestorFundo?: string | null;
  };
};

const USE_MOCK_AUTH = env('VITE_USE_MOCK_AUTH') === 'true';

export async function login(email: string, password: string): Promise<AuthResponse> {
  if (USE_MOCK_AUTH) {
    if (email.toLowerCase().includes('bloqueado')) {
      throw Object.assign(new Error('Acesso bloqueado'), { status: 423 });
    }

    if (email.toLowerCase().includes('offline')) {
      throw Object.assign(new Error('Servidor indisponível'), { status: 0 });
    }

    return {
      user: {
        id: 'local-admin',
        email,
        isAdm: !email.toLowerCase().includes('analista'),
      },
    };
  }

  try {
    return await api.post<AuthResponse>('/api/auth/login', { email, password });
  } catch (err: any) {
    const status = err?.status ?? (err?.body && err.body.status) ?? null;
    const bodyMessage = err?.body && (err.body.message || err.body?.msg || null);

    if (status === 400) {
      const e = new Error(bodyMessage || 'Missing email or password');
      (e as any).status = 400;
      throw e;
    }

    if (status === 401) {
      const e = new Error(bodyMessage || 'Invalid credentials');
      (e as any).status = 401;
      throw e;
    }

    // propagate other errors (including timeouts/status=0) unchanged
    throw err;
  }
}

export async function register(payload: RegisterRequest): Promise<any> {
  return api.post('/api/auth/register', payload);
}

export function loadTokenFromStorage(): string | null {
  return null;
}

export function clearAuth() {
}
