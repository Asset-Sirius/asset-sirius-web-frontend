import { useState } from "react"
import { HeartHandshake, PhoneCall, Repeat2, Target } from "lucide-react"
import { PageHeader } from "../components/blocks"
import { Card, Select, StatusDot, Tabs } from "../components/ui"

const PERIODS = [
  { value: "30d", label: "Últimos 30 dias" },
  { value: "quarter", label: "Trimestre atual" },
  { value: "ytd", label: "No ano" },
]
const SEGMENTS = [
  { value: "all", label: "Todos os segmentos" },
  { value: "private", label: "Private Banking · Tier I" },
  { value: "hnw", label: "High Net Worth" },
  { value: "retail", label: "Varejo Alta Renda" },
]

// ACTIONS removed — panels will be embedded directly from Grafana

export function Dashboard2() {
  const [period, setPeriod] = useState("quarter")
  const [segment, setSegment] = useState("all")
  const [tab, setTab] = useState("retencao")

  return (
    <div className="anim-fade">
      <PageHeader
        title="Retenção de cotistas"
        description="Efetividade das estratégias preventivas de relacionamento e saúde da carteira."
        actions={
          <>
            <Select value={segment} onChange={setSegment} options={SEGMENTS} className="w-[210px]" />
            <Select value={period} onChange={setPeriod} options={PERIODS} className="w-[180px]" />
          </>
        }
      />

      <div className="mb-4">
        <Tabs
          tabs={[
            { id: "retencao", label: "Retenção" },
            { id: "relacionamento", label: "Relacionamento" },
            { id: "carteira", label: "Saúde da carteira" },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>

      {/* Grafana dashboard 2 embeds - replacing mocked KPIs and panels */}
      <div className="mt-4">
        {(() => {
          const GRAFANA_HOST = "http://54.91.255.128:3000"
          const panelSrcs = [
            // 1
            `${GRAFANA_HOST}/d-solo/ad2rknz/dashboard-gestao-estrategico-tatico?orgId=1&from=1777248000000&to=1780012800000&timezone=browser&theme=dark&panelId=panel-7&__feature.dashboardScene=true`,
            // 2
            `${GRAFANA_HOST}/d-solo/ad2rknz/dashboard-gestao-estrategico-tatico?orgId=1&from=1777248000000&to=1780012800000&timezone=browser&theme=dark&panelId=panel-9&__feature.dashboardScene=true`,
            // 3
            `${GRAFANA_HOST}/d-solo/ad2rknz/dashboard-gestao-estrategico-tatico?orgId=1&from=1777248000000&to=1780012800000&timezone=browser&theme=dark&panelId=panel-6&__feature.dashboardScene=true`,
            // 4 (duplicate of 3 per provided list)
            `${GRAFANA_HOST}/d-solo/ad2rknz/dashboard-gestao-estrategico-tatico?orgId=1&from=1777248000000&to=1780012800000&timezone=browser&theme=dark&panelId=panel-6&__feature.dashboardScene=true`,
            // 5
            `${GRAFANA_HOST}/d-solo/ad2rknz/dashboard-gestao-estrategico-tatico?orgId=1&from=1777248000000&to=1780012800000&timezone=browser&theme=dark&panelId=panel-3&__feature.dashboardScene=true`,
            // 6 (duplicate of 5 per provided list)
            `${GRAFANA_HOST}/d-solo/ad2rknz/dashboard-gestao-estrategico-tatico?orgId=1&from=1777248000000&to=1780012800000&timezone=browser&theme=dark&panelId=panel-3&__feature.dashboardScene=true`,
          ]

          return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                      title={`grafana-dashboard2-panel-${i + 1}`}
                      src={src}
                      width="100%"
                      height={200}
                      frameBorder={0}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </div>
                </Card>
              ))}
            </div>
          )
        })()}
      </div>

      {/* Removed status bar — Dashboard 2 now shows only Grafana embedded panels */}
    </div>
  )
}
