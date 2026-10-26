import { useState } from "react"
import { AlertTriangle, ArrowUpRight, Banknote, TrendingDown, Users2 } from "lucide-react"
import { GrafanaPanel, KpiCard, PageHeader } from "../components/blocks"
import { Badge, Button, Card, Select } from "../components/ui"

const PERIODS = [
  { value: "7d", label: "Últimos 7 dias" },
  { value: "30d", label: "Últimos 30 dias" },
  { value: "90d", label: "Últimos 90 dias" },
  { value: "ytd", label: "No ano" },
]
const FUNDS = [
  { value: "all", label: "Todos os fundos" },
  { value: "mm", label: "Sirius Multimercado FIC FIM" },
  { value: "rf", label: "Sirius Renda Fixa Pro" },
  { value: "ac", label: "Sirius Ações Long Bias" },
]

const ALERTS = [
  { id: "#RGT-48217", client: "Ricardo Monteiro Albuquerque", fund: "Sirius Multimercado FIC FIM", value: "R$ 1.250.000,00", priority: "Média", received: "Há 12 min" },
  { id: "#RGT-48209", client: "Beatriz Camargo Fontes", fund: "Sirius Renda Fixa Pro", value: "R$ 3.480.000,00", priority: "Alta", received: "Há 1 h" },
  { id: "#RGT-48198", client: "Eduardo Peixoto Lima", fund: "Sirius Ações Long Bias", value: "R$ 620.000,00", priority: "Baixa", received: "Há 3 h" },
  { id: "#RGT-48186", client: "Larissa Nogueira", fund: "Sirius Multimercado FIC FIM", value: "R$ 2.100.000,00", priority: "Alta", received: "Ontem" },
]
const priorityTone = { Alta: "danger", Média: "warning", Baixa: "neutral" } as const

export function Dashboard1() {
  const [period, setPeriod] = useState("30d")
  const [fund, setFund] = useState("all")

  return (
    <div className="anim-fade">
      <PageHeader
        title="Monitoramento de resgates"
        description="Sinais de possíveis resgates e alertas priorizados para ação preventiva de retenção."
        actions={
          <>
            <Select value={period} onChange={setPeriod} options={PERIODS} className="w-[170px]" />
            <Select value={fund} onChange={setFund} options={FUNDS} className="w-[210px]" />
          </>
        }
      />


      {/* Grafana dashboard embeds (Dashboard 1) */}
      <div className="mt-4">
        {/* Replace localhost with the provided Grafana host and render panels in the exact order requested
            The panel list is intentionally ordered left-to-right, top-to-bottom. */}
        {(() => {
          // Read host from Vite env at build time; fall back to the previous value
          const GRAFANA_HOST = import.meta.env.VITE_GRAFANA_HOST
          const panelSrcs = [
            // 1
            `${GRAFANA_HOST}/d-solo/adbbk58/dashboard-gerente-operacional?orgId=1&from=1791978991199&to=1792000591199&timezone=browser&var-query0=fg183dshcjksgd&theme=dark&panelId=panel-11&__feature.dashboardScene=true`,
            // 2
            `${GRAFANA_HOST}/d-solo/adbbk58/dashboard-gerente-operacional?orgId=1&from=1791978991199&to=1792000591199&timezone=browser&var-query0=fg183dshcjksgd&theme=dark&panelId=panel-10&__feature.dashboardScene=true`,
            // 3
            `${GRAFANA_HOST}/d-solo/adbbk58/dashboard-gerente-operacional?orgId=1&from=1791978991199&to=1792000591199&timezone=browser&var-query0=fg183dshcjksgd&theme=dark&panelId=panel-12&__feature.dashboardScene=true`,
            // 4
            `${GRAFANA_HOST}/d-solo/adbbk58/dashboard-gerente-operacional?orgId=1&from=1791978991199&to=1792000591199&timezone=browser&var-query0=fg183dshcjksgd&theme=dark&panelId=panel-13&__feature.dashboardScene=true`,
            // 5
            `${GRAFANA_HOST}/d-solo/adbbk58/dashboard-gerente-operacional?orgId=1&from=1791978991199&to=1792000591199&timezone=browser&var-query0=fg183dshcjksgd&theme=dark&panelId=panel-1&__feature.dashboardScene=true`,
            // 6
            `${GRAFANA_HOST}/d-solo/adbbk58/dashboard-gerente-operacional?orgId=1&from=1791978991199&to=1792000591199&timezone=browser&var-query0=fg183dshcjksgd&theme=dark&panelId=panel-8&__feature.dashboardScene=true`,
            // 7
            `${GRAFANA_HOST}/d-solo/adbbk58/dashboard-gerente-operacional?orgId=1&from=1791978991199&to=1792000591199&timezone=browser&var-query0=fg183dshcjksgd&theme=dark&panelId=panel-7&__feature.dashboardScene=true`,
            // 8
            `${GRAFANA_HOST}/d-solo/adbbk58/dashboard-gerente-operacional?orgId=1&from=1791978991199&to=1792000591199&timezone=browser&var-query0=fg183dshcjksgd&theme=dark&panelId=panel-6&__feature.dashboardScene=true`,
            // 9
            `${GRAFANA_HOST}/d-solo/adbbk58/dashboard-gerente-operacional?orgId=1&from=1791978991199&to=1792000591199&timezone=browser&var-query0=fg183dshcjksgd&theme=dark&panelId=panel-4&__feature.dashboardScene=true`,
            // 10
            `${GRAFANA_HOST}/d-solo/adbbk58/dashboard-gerente-operacional?orgId=1&from=1791978991199&to=1792000591199&timezone=browser&var-query0=fg183dshcjksgd&theme=dark&panelId=panel-3&__feature.dashboardScene=true`,
            // 11
            `${GRAFANA_HOST}/d-solo/adbbk58/dashboard-gerente-operacional?orgId=1&from=1791978991199&to=1792000591199&timezone=browser&var-query0=fg183dshcjksgd&panelId=panel-2&__feature.dashboardScene=true`,
            // 12
            `${GRAFANA_HOST}/d-solo/adbbk58/dashboard-gerente-operacional?orgId=1&from=1791978991199&to=1792000591199&timezone=browser&var-query0=fg183dshcjksgd&theme=dark&panelId=panel-5&__feature.dashboardScene=true`,
          ]

          return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {panelSrcs.map((src, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3.5">
                    <div>
                      <h3 className="text-[0.9rem] font-semibold text-[var(--color-text)]">Painel {i + 1}</h3>
                    </div>
                    <span className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-text-muted)]">Grafana</span>
                  </div>
                  <div className="p-2">
                    <iframe
                      title={`grafana-panel-${i + 1}`}
                      src={src}
                      width="100%"
                      height={200}
                      frameBorder={0}
                      loading="lazy"
                      // allow-same-origin may be required depending on Grafana setup
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </div>
                </Card>
              ))}
            </div>
          )
        })()}
      </div>

      {/* Removed mocked KPI cards and alerts table: only Grafana panels are shown below */}
    </div>
  )
}
