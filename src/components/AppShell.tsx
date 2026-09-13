import { useState, type ReactNode } from "react"
import {
  ChevronRight,
  LayoutDashboard,
  LineChart,
  Menu as MenuIcon,
  Settings,
  UserCog,
  Users,
  X,
} from "lucide-react"
import { Logo } from "./Logo"
import { Avatar, IconButton } from "./ui"
import type { ModuleKey } from "../data"

export type Route = ModuleKey | "settings"
export type CurrentUser = { name: string; profile: string; email: string }

const NAV: { key: Route; label: string; icon: ReactNode }[] = [
  { key: "dashboard1", label: "Dashboard 1", icon: <LayoutDashboard size={18} /> },
  { key: "dashboard2", label: "Dashboard 2", icon: <LineChart size={18} /> },
  { key: "employees", label: "Funcionários", icon: <Users size={18} /> },
  { key: "profiles", label: "Perfis", icon: <UserCog size={18} /> },
]

const PAGE_META: Record<Route, { title: string; crumb: string }> = {
  dashboard1: { title: "Monitoramento de resgates", crumb: "Dashboard 1" },
  dashboard2: { title: "Retenção de cotistas", crumb: "Dashboard 2" },
  employees: { title: "Funcionários", crumb: "Funcionários" },
  profiles: { title: "Perfis", crumb: "Perfis" },
  settings: { title: "Minha conta", crumb: "Configurações" },
}

export function AppShell({
  route,
  onNavigate,
  allowed,
  user,
  onLogout,
  onOpenSettings,
  actions,
  children,
}: {
  route: Route
  onNavigate: (r: Route) => void
  allowed: Route[]
  user: CurrentUser
  onLogout: () => void
  onOpenSettings: () => void
  actions?: ReactNode
  children: ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const meta = PAGE_META[route]

  const sidebar = (
    <div className="flex h-full flex-col bg-[var(--color-bg-elevated)]">
      <div className="flex h-16 items-center justify-between px-5">
        <Logo />
        <IconButton className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
          <X size={18} />
        </IconButton>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="px-3 pb-2 t-label">Plataforma</p>
        {NAV.filter((n) => allowed.includes(n.key)).map((item) => {
          const active = route === item.key
          return (
            <button
              key={item.key}
              onClick={() => {
                onNavigate(item.key)
                setMobileOpen(false)
              }}
              className={`group flex w-full items-center gap-3 rounded-[var(--radius)] px-3 py-2.5 text-[0.875rem] font-medium transition-all ${
                active
                  ? "bg-[var(--color-brand-soft)] text-[var(--color-text)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
              }`}
            >
              <span
                className={`transition-colors ${
                  active ? "text-[var(--color-brand)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]"
                }`}
              >
                {item.icon}
              </span>
              {item.label}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-[var(--color-border)] p-3">
        <div className="flex w-full items-center gap-3 rounded-[var(--radius)] px-2 py-2">
          <Avatar name={user.name} size={36} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.8125rem] font-medium text-[var(--color-text)]">{user.name}</span>
            <span className="block truncate text-[0.72rem] text-[var(--color-text-muted)]">{user.profile}</span>
          </span>
          <button
            onClick={() => { onOpenSettings(); setMobileOpen(false) }}
            className="rounded-md p-1 transition-colors hover:bg-[var(--color-surface-hover)]"
            aria-label="Configurações da conta"
          >
            <Settings size={15} className="text-[var(--color-text-muted)]" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-full bg-[var(--color-bg)]">
      {/* Desktop sidebar */}
      <aside className="hidden w-[260px] shrink-0 border-r border-[var(--color-border)] lg:block">{sidebar}</aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm anim-fade" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[280px] border-r border-[var(--color-border)] anim-fade">
            {sidebar}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 px-5 backdrop-blur-md lg:px-8">
          <IconButton className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <MenuIcon size={18} />
          </IconButton>

          <div className="min-w-0">
            <div className="hidden items-center gap-1.5 text-[0.72rem] text-[var(--color-text-muted)] sm:flex">
              <span>Asset Sirius</span>
              <ChevronRight size={12} />
              <span className="text-[var(--color-text-secondary)]">{meta.crumb}</span>
            </div>
            <h1 className="truncate text-[1.05rem] font-semibold tracking-tight text-[var(--color-text)]">
              {meta.title}
            </h1>
          </div>

          {actions && <div className="ml-auto flex items-center gap-3">{actions}</div>}
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1400px] px-5 py-7 lg:px-8 lg:py-9">{children}</div>
        </main>
      </div>
    </div>
  )
}
