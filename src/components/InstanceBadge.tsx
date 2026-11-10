import { Server } from "lucide-react"
import { env } from "../env"

/**
 * Identifica a instância que atendeu a requisição do documento (alvo do ALB).
 * O valor chega em runtime pelo env injetado no HTML do container; sem ele
 * (dev local) o indicador não é renderizado.
 */
export function InstanceBadge() {
  const instanceId = env("VITE_INSTANCE_ID")
  if (!instanceId) return null

  return (
    <div
      title="Instância que atendeu esta requisição"
      className="fixed bottom-3 right-3 z-50 flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-3 py-1.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)]"
    >
      <Server size={12} className="text-[var(--color-brand)]" />
      <span className="font-mono text-[0.6875rem] tracking-wide text-[var(--color-text-secondary)]">
        {instanceId}
      </span>
    </div>
  )
}
