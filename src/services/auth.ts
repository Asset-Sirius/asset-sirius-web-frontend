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
export type AuthResponse = {
  user: {
    id: string;
    email: string;
    isAdm: boolean;
    fkGerente?: string | null;
    fkGestorFundo?: string | null;
  };
};

export async function login(email: string, password: string): Promise<AuthResponse> {
  // Send credentials as plain text in JSON per backend contract.
  // The backend returns only user data on success (no JWT). We normalize
  // common error responses so callers can rely on status + message.
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

// Previously the client restored a saved token from localStorage and
// injected it into the API client. With JWTs removed, these helpers
// are no-ops but are kept for compatibility with callers.
export function loadTokenFromStorage(): string | null {
  return null;
}

export function clearAuth() {
  // noop
}
