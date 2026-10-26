// Small helper to read environment values from window.__ENV__ (injected at
// container runtime) or fall back to import.meta.env (Vite build-time).
export const env = (key: string): string =>
  (typeof window !== 'undefined' && (window as any).__ENV__?.[key]) || (import.meta.env as any)[key] || "";
