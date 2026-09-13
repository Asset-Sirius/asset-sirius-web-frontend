import { ArrowLeft, LogOut, Mail, ShieldCheck, User } from "lucide-react"
import type { CurrentUser, Route } from "../components/AppShell"

type Props = {
  user: CurrentUser
  canManage: boolean
  onLogout: () => void
  onNavigate: (r: Route) => void
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 py-4">
      <span className="mt-0.5 text-[var(--color-text-muted)]">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.72rem] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">{label}</p>
        <p className="mt-0.5 text-[0.9rem] text-[var(--color-text)]">{value}</p>
      </div>
    </div>
  )
}

function Avatar64({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("")
  return (
    <div
      className="flex h-16 w-16 items-center justify-center rounded-full text-[1.25rem] font-semibold text-[var(--color-brand-text)]"
      style={{ background: "var(--color-brand-soft)", border: "2px solid var(--color-brand)" }}
    >
      {initials}
    </div>
  )
}

export function Settings({ user, canManage, onLogout, onNavigate }: Props) {
  return (
    <div className="mx-auto max-w-lg">
      {/* Back */}
      <button
        onClick={() => onNavigate("dashboard1")}
        className="mb-6 flex items-center gap-2 text-[0.8125rem] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
      >
        <ArrowLeft size={15} />
        Voltar ao painel
      </button>

      {/* Profile card */}
      <div
        className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
      >
        {/* Header */}
        <div
          className="flex items-center gap-4 border-b border-[var(--color-border)] px-6 py-5"
          style={{ background: "linear-gradient(135deg, var(--color-brand-soft) 0%, transparent 100%)" }}
        >
          <Avatar64 name={user.name} />
          <div>
            <p className="text-[1rem] font-semibold text-[var(--color-text)]">{user.name}</p>
            <p className="mt-0.5 text-[0.8rem] text-[var(--color-text-muted)]">{user.profile}</p>
          </div>
        </div>

        {/* Info rows */}
        <div className="divide-y divide-[var(--color-border)] px-6">
          <InfoRow icon={<User size={16} />} label="Nome completo" value={user.name} />
          <InfoRow icon={<Mail size={16} />} label="E-mail" value={user.email} />
          <InfoRow icon={<ShieldCheck size={16} />} label="Perfil de acesso" value={user.profile} />
        </div>

        {/* Edit notice */}
        <div className="px-6 pb-5 pt-4">
          {canManage ? (
            <button
              onClick={() => onNavigate("employees")}
              className="text-[0.8125rem] text-[var(--color-brand-text)] transition-colors hover:text-[var(--color-brand-hover)] hover:underline"
            >
              Editar via Gestão de Funcionários →
            </button>
          ) : (
            <p className="text-[0.78rem] text-[var(--color-text-muted)]">
              As informações cadastrais só podem ser alteradas por um administrador.
            </p>
          )}
        </div>
      </div>

      {/* Logout */}
      <div
        className="mt-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-6 py-4"
      >
        <p className="mb-3 text-[0.78rem] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
          Sessão
        </p>
        <button
          onClick={onLogout}
          className="flex items-center gap-2.5 rounded-[var(--radius)] border border-[var(--color-danger)] px-4 py-2 text-[0.875rem] font-medium text-[var(--color-danger)] transition-colors hover:bg-[var(--color-danger-soft)]"
        >
          <LogOut size={16} />
          Sair da conta
        </button>
      </div>
    </div>
  )
}
