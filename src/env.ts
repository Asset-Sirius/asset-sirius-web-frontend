// Small helper to read environment values from window.__ENV__ (injected at
// container runtime) or fall back to import.meta.env (Vite build-time).
// When the runtime object defines the key it wins, even if the value is
// empty: a variable unset in the container must not fall back to the
// build-time value (e.g. the instance identifier of the load balancer).
export const env = (key: string): string => {
  const runtime = typeof window !== "undefined" ? (window as any).__ENV__ : undefined
  if (runtime && key in runtime) return runtime[key] ?? ""
  return (import.meta.env as any)[key] || ""
}
