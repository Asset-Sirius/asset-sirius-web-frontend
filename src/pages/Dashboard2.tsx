import { useState } from "react"
import { HeartHandshake, PhoneCall, Repeat2, Target } from "lucide-react"
import { GrafanaPanel, KpiCard, PageHeader } from "../components/blocks"
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

const ACTIONS = [
  { assessor: "Camila Andrade", action: "Contato comercial realizado", client: "Ricardo M. Albuquerque", status: "success" as const, when: "Há 20 min" },
  { assessor: "Fernanda Lopes", action: "Reunião de retenção agendada", client: "Beatriz C. Fontes", status: "brand" as const, when: "Há 2 h" },
  { assessor: "Juliana Prado", action: "Aguardando retorno do cliente", client: "Eduardo P. Lima", status: "warning" as const, when: "Há 5 h" },
  { assessor: "Marina Castro", action: "Proposta de realocação enviada", client: "Larissa Nogueira", status: "brand" as const, when: "Ontem" },
]

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Taxa de retenção" value="86,2%" delta="+3,4%" trend="up" icon={<Target size={16} />} accent />
        <KpiCard label="Ações preventivas" value="148" delta="+12%" trend="up" icon={<PhoneCall size={16} />} />
        <KpiCard label="Resgates revertidos" value="R$ 18,4M" delta="+7,9%" trend="up" icon={<Repeat2 size={16} />} />
        <KpiCard label="NPS relacionamento" value="72" delta="-2 pts" trend="down" icon={<HeartHandshake size={16} />} />
      </div>

      {/* Asymmetric composition — distinct from Dashboard 1 */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-4">
          <GrafanaPanel title="Evolução da taxa de retenção" subtitle="Comparativo com meta trimestral" height={260} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <GrafanaPanel title="Motivos de resgate" height={200} reserved />
            <GrafanaPanel title="Tempo médio de resposta" height={200} reserved />
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <GrafanaPanel title="Funil de retenção" height={260} reserved />
          <Card className="p-5">
            <h3 className="t-h3 mb-4">Ações de relacionamento</h3>
            <div className="space-y-4">
              {ACTIONS.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <span className="mt-1.5 flex flex-col items-center">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        background:
                          a.status === "success"
                            ? "var(--color-success)"
                            : a.status === "warning"
                              ? "var(--color-warning)"
                              : "var(--color-brand)",
                      }}
                    />
                    {i < ACTIONS.length - 1 && <span className="mt-1 h-full w-px bg-[var(--color-border)]" />}
                  </span>
                  <div className="pb-1">
                    <p className="text-[0.8125rem] font-medium text-[var(--color-text)]">{a.action}</p>
                    <p className="mt-0.5 text-[0.75rem] text-[var(--color-text-secondary)]">
                      {a.client} · {a.assessor}
                    </p>
                    <p className="mt-0.5 text-[0.7rem] text-[var(--color-text-muted)]">{a.when}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 px-5 py-4">
        <StatusDot tone="success" label="Integração Grafana operacional" />
        <StatusDot tone="brand" label="Dados CVM sincronizados · Há 6 min" />
        <StatusDot tone="warning" label="3 indicadores aguardando validação" />
      </Card>
    </div>
  )
}
