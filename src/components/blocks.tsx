import { useEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { ArrowDownRight, ArrowUpRight, BarChart3, X } from "lucide-react"
import { Card } from "./ui"

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="t-h1">{title}</h2>
        <p className="mt-1.5 t-body text-[var(--color-text-secondary)]">{description}</p>
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  )
}

export function KpiCard({
  label,
  value,
  delta,
  trend,
  icon,
  accent,
}: {
  label: string
  value: string
  delta?: string
  trend?: "up" | "down"
  icon: ReactNode
  accent?: boolean
}) {
  return (
    <Card className="relative overflow-hidden p-5">
      {accent && <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand)] to-transparent" />}
      <div className="flex items-start justify-between">
        <p className="t-label">{label}</p>
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-[var(--radius)] ${
            accent ? "bg-[var(--color-brand-soft)] text-[var(--color-brand-text)]" : "bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)]"
          }`}
        >
          {icon}
        </span>
      </div>
      <p className="t-kpi mt-4 text-[var(--color-text)]">{value}</p>
      {delta && (
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 text-[0.78rem] font-medium ${
              trend === "down" ? "text-[#ff7a7e]" : "text-[#4fd39b]"
            }`}
          >
            {trend === "down" ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
            {delta}
          </span>
          <span className="text-[0.75rem] text-[var(--color-text-muted)]">vs. período anterior</span>
        </div>
      )}
    </Card>
  )
}

export function GrafanaPanel({
  title,
  subtitle,
  height = 280,
  reserved,
}: {
  title: string
  subtitle?: string
  height?: number
  reserved?: boolean
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3.5">
        <div>
          <h3 className="text-[0.9rem] font-semibold text-[var(--color-text)]">{title}</h3>
          {subtitle && <p className="mt-0.5 t-caption text-[var(--color-text-muted)]">{subtitle}</p>}
        </div>
        <span className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-text-muted)]">
          Grafana
        </span>
      </div>
      <div className="p-3">
        <div
          className="flex flex-col items-center justify-center gap-2.5 rounded-[var(--radius)] border border-dashed border-[var(--color-border-strong)] text-center"
          style={{
            height,
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "center",
          }}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text-muted)]">
            <BarChart3 size={20} />
          </span>
          <p className="text-[0.8125rem] font-medium text-[var(--color-text-secondary)]">
            {reserved ? "Área reservada para indicador" : "Grafana Panel"}
          </p>
          <p className="text-[0.72rem] text-[var(--color-text-muted)]">Painel será integrado via Grafana</p>
        </div>
      </div>
    </Card>
  )
}

export function GrafanaCard({
  src,
  title,
  height = 200,
  className = "",
}: {
  src: string
  title: string
  height?: number
  className?: string
}) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!expanded) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setExpanded(false)
    }

    document.addEventListener("keydown", closeOnEscape)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", closeOnEscape)
      document.body.style.overflow = ""
    }
  }, [expanded])

  return (
    <>
      <Card
        className={`cursor-zoom-in overflow-hidden transition-transform hover:scale-[1.01] ${className}`}
        onClick={() => setExpanded(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") setExpanded(true)
        }}
        aria-label={`Ampliar ${title}`}
      >
        <div className="p-2">
          <iframe
            title={title}
            src={src}
            width="100%"
            height={height}
            frameBorder={0}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            tabIndex={-1}
          />
        </div>
      </Card>

      {expanded &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/70 p-4 backdrop-blur-md sm:p-8"
            onClick={() => setExpanded(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Visualização ampliada: ${title}`}
          >
            <div
              className="relative box-border h-[92vh] max-h-[900px] w-[96vw] max-w-[1600px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-6 shadow-2xl sm:p-10"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                aria-label="Fechar visualização ampliada"
              >
                <X size={20} />
              </button>
              <div className="h-full w-full overflow-hidden rounded-[var(--radius)]">
                <iframe
                  title={`${title} ampliado`}
                  src={src}
                  width="100%"
                  height="100%"
                  frameBorder={0}
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
