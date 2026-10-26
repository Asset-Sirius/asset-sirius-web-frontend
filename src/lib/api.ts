// Lightweight fetch-based API client using Vite build-time env (import.meta.env).
// This client prefers build-time backend variables:
// - VITE_BACKEND_HOST and VITE_BACKEND_PORT (host + port, default port 8080)
// Read Vite build-time env variables directly, but prefer a runtime
// overridable `window.__ENV__` when available. Use the `env` helper so
// both dev/build and container runtime env injection work.
import { env } from "../env";

const backendHost = env("VITE_BACKEND_HOST") || undefined;
const backendPort = env("VITE_BACKEND_PORT") || '8080';

const API_BASE: string = backendHost ? `http://${backendHost}:${backendPort}` : '';

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

function buildUrl(path: string) {
  if (!path) return API_BASE;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = API_BASE || '';
  // ensure single slash
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

async function request<T = any>(method: string, path: string, body?: unknown, headers: Record<string, string> = {}, timeout = 10000): Promise<T> {
  const url = buildUrl(path);
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (authToken) {
    defaultHeaders['Authorization'] = `Bearer ${authToken}`;
  }

  const opts: RequestInit = {
    method,
    headers: defaultHeaders,
    signal: controller.signal,
  };

  if (body !== undefined && body !== null) {
    opts.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, opts);
    clearTimeout(id);

    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    if (!res.ok) {
      // try to parse error body
      const errBody = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);
      const error = new Error(res.statusText || 'Request error');
      (error as any).status = res.status;
      (error as any).body = errBody;
      throw error;
    }

    if (isJson) return (await res.json()) as T;
    // fallback to text
    return (await res.text()) as unknown as T;
  } catch (err) {
    // normalize AbortError
    if ((err as any)?.name === 'AbortError') {
      const e = new Error('Request timed out');
      (e as any).status = 0;
      throw e;
    }
    throw err;
  }
}

export const api = {
  get: <T = any>(path: string) => request<T>('GET', path),
  post: <T = any>(path: string, body?: unknown) => request<T>('POST', path, body),
  put: <T = any>(path: string, body?: unknown) => request<T>('PUT', path, body),
  delete: <T = any>(path: string, body?: unknown) => request<T>('DELETE', path, body),
};

export default api;
