import { GrafanaCard, PageHeader } from "../components/blocks"
import { env } from "../env"

export function Dashboard1() {
  return (
    <div className="anim-fade">
      <PageHeader
        title="Dashboard Gerente (Operacional)"
        description="Visão operacional dos indicadores para apoiar a gestão diária."
      />


      {/* Grafana dashboard embeds (Dashboard 1) */}
      <div className="mt-4">
        {/* Replace localhost with the provided Grafana host and render panels in the exact order requested
            The panel list is intentionally ordered left-to-right, top-to-bottom. */}
        {(() => {
          // Read host from runtime-injectable env (window.__ENV__) first,
          // then fall back to Vite's build-time env variables.
          const GRAFANA_HOST = env("VITE_GRAFANA_HOST").replace(/\/+$/, "")
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
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              {panelSrcs.map((src, i) => (
                <GrafanaCard
                  key={i}
                  src={src}
                  title={`grafana-panel-${i + 1}`}
                  height={[5, 6].includes(i) ? 320 : 200}
                  className={`overflow-hidden ${
                    [0, 1, 2, 3].includes(i)
                      ? "lg:col-span-3"
                      : [4, 11].includes(i)
                        ? "lg:col-span-12"
                        : "lg:col-span-6"
                  }`}
                />
              ))}
            </div>
          )
        })()}
      </div>

      {/* Removed mocked KPI cards and alerts table: only Grafana panels are shown below */}
    </div>
  )
}
