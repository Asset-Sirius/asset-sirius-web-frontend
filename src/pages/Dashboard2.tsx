import { GrafanaCard, PageHeader } from "../components/blocks"
import { env } from "../env"

// ACTIONS removed — panels will be embedded directly from Grafana

export function Dashboard2() {
  return (
    <div className="anim-fade">
      <PageHeader
        title="Dashboard Gestão (Estratégico / Tático)"
        description="Visão estratégica e tática para acompanhar a gestão, o relacionamento e a saúde da carteira."
      />

      {/* Grafana dashboard 2 embeds - replacing mocked KPIs and panels */}
      <div className="mt-4">
        {(() => {
          // Read host from runtime-injectable env (window.__ENV__) first,
          // then fall back to Vite's build-time env variables or the hardcoded default.
          const GRAFANA_HOST = (env("VITE_GRAFANA_HOST") || "http://23.23.235.114:3000").replace(/\/+$/, "")
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {panelSrcs.map((src, i) => (
                <GrafanaCard
                  key={i}
                  src={src}
                  title={`grafana-dashboard2-panel-${i + 1}`}
                />
              ))}
            </div>
          )
        })()}
      </div>

      {/* Removed status bar — Dashboard 2 now shows only Grafana embedded panels */}
    </div>
  )
}
