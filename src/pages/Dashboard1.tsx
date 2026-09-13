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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Alertas ativos" value="27" delta="+18%" trend="up" icon={<AlertTriangle size={16} />} accent />
        <KpiCard label="Volume em risco" value="R$ 42,8M" delta="+9,4%" trend="up" icon={<TrendingDown size={16} />} />
        <KpiCard label="Cotistas monitorados" value="1.284" delta="+2,1%" trend="up" icon={<Users2 size={16} />} />
        <KpiCard label="Retenção (30d)" value="83,6%" delta="-1,3%" trend="down" icon={<Banknote size={16} />} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <GrafanaPanel title="Fluxo de resgates por período" subtitle="Solicitações registradas vs. liquidadas" height={300} />
        </div>
        <GrafanaPanel title="Distribuição por prioridade" subtitle="Alertas do período" height={300} reserved />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GrafanaPanel title="Sinais por indicador" height={220} reserved />
        <GrafanaPanel title="Impacto sob custódia" height={220} reserved />
        <GrafanaPanel title="Concentração por fundo" height={220} reserved />
      </div>

      <Card className="mt-4 overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <div>
            <h3 className="t-h3">Alertas recentes de resgate</h3>
            <p className="mt-0.5 t-caption text-[var(--color-text-muted)]">Priorizados para contato comercial nas próximas 24 horas</p>
          </div>
          <Button variant="secondary" size="sm" icon={<ArrowUpRight size={15} />}>
            Ver todos
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                {["Solicitação", "Cliente", "Fundo", "Valor", "Prioridade", "Recebido"].map((h) => (
                  <th key={h} className="px-5 py-3 t-label">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALERTS.map((a) => (
                <tr key={a.id} className="border-b border-[var(--color-border)] transition-colors last:border-0 hover:bg-[var(--color-surface-hover)]">
                  <td className="px-5 py-3.5 font-mono text-[0.8125rem] text-[var(--color-brand-text)]">{a.id}</td>
                  <td className="px-5 py-3.5 text-[0.875rem] text-[var(--color-text)]">{a.client}</td>
                  <td className="px-5 py-3.5 text-[0.8125rem] text-[var(--color-text-secondary)]">{a.fund}</td>
                  <td className="px-5 py-3.5 font-mono text-[0.8125rem] text-[var(--color-text)] tnum">{a.value}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={priorityTone[a.priority as keyof typeof priorityTone]}>{a.priority}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-[0.8125rem] text-[var(--color-text-muted)]">{a.received}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
