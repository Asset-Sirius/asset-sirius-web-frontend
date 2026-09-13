import { useState } from "react"
import { ArrowRight, Headset, Lock, Mail, ShieldCheck, WifiOff } from "lucide-react"
import { SiriusMark } from "../components/Logo"
import { Alert, Button, Input, PasswordInput } from "../components/ui"

/**
 * Demo credentials:
 *   admin@assetsirius.com.br      → Administrador (todas as páginas)
 *   analista@assetsirius.com.br   → Analista (somente dashboards)
 *   qualquer senha com 4+ caracteres.
 *   Use "bloqueado" no e-mail para ver o estado de conta bloqueada,
 *   "offline" para simular erro de conexão.
 */
export function Login({ onSuccess }: { onSuccess: (email: string) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [banner, setBanner] = useState<null | { tone: "danger"; kind: "invalid" | "locked" | "offline" }>(null)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setBanner(null)
    setEmailError("")

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setEmailError("Informe um e-mail corporativo válido.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (email.includes("offline")) return setBanner({ tone: "danger", kind: "offline" })
      if (email.includes("bloqueado")) return setBanner({ tone: "danger", kind: "locked" })
      if (password.length < 4) return setBanner({ tone: "danger", kind: "invalid" })
      onSuccess(email)
    }, 1300)
  }

  return (
    <div className="relative flex min-h-full items-center justify-center overflow-hidden bg-[var(--color-bg)] px-5 py-12">
      {/* ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-[0.14] blur-[120px]"
        style={{ background: "var(--color-brand)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, #000 30%, transparent 75%)",
        }}
      />

      <div className="relative w-full max-w-[420px] anim-fade">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)]">
            <SiriusMark size={30} />
          </div>
          <p className="t-label mb-3">Private Banking · Investimentos</p>
          <h1 className="t-h1">Acesse sua conta</h1>
          <p className="mt-2 max-w-xs t-small text-[var(--color-text-secondary)]">
            Plataforma de monitoramento e retenção de cotistas. Acesso restrito a colaboradores autorizados.
          </p>
        </div>

        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-[0_32px_80px_-32px_rgba(0,0,0,0.9)]">
          {banner && (
            <div className="mb-5">
              {banner.kind === "invalid" && (
                <Alert tone="danger" title="Credenciais inválidas">
                  E-mail ou senha incorretos. Verifique os dados e tente novamente.
                </Alert>
              )}
              {banner.kind === "locked" && (
                <Alert tone="danger" title="Acesso bloqueado">
                  Sua conta foi temporariamente bloqueada por segurança. Contate o suporte.
                </Alert>
              )}
              {banner.kind === "offline" && (
                <div className="flex gap-3 rounded-[var(--radius)] border border-[#5a2427] bg-[var(--color-danger-soft)] px-4 py-3 text-[#ff7a7e]">
                  <WifiOff size={16} className="mt-0.5 shrink-0" />
                  <div className="text-[0.8125rem] leading-relaxed">
                    <div className="font-semibold">Erro de conexão</div>
                    <div className="text-[var(--color-text-secondary)]">
                      Não foi possível conectar ao servidor. Verifique sua rede e tente novamente.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
            <Input
              label="E-mail"
              name="email"
              type="email"
              placeholder="nome@assetsirius.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              icon={<Mail size={17} />}
              autoComplete="email"
            />
            <PasswordInput
              label="Senha"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={17} />}
              autoComplete="current-password"
            />
            <Button type="submit" size="lg" loading={loading} className="mt-1 w-full">
              {loading ? "Autenticando..." : "Entrar"}
              {!loading && <ArrowRight size={17} />}
            </Button>
          </form>

          <div className="mt-6 flex items-start gap-2.5 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3.5 py-3">
            <Headset size={15} className="mt-0.5 shrink-0 text-[var(--color-text-muted)]" />
            <p className="text-[0.75rem] leading-relaxed text-[var(--color-text-muted)]">
              Problemas para acessar? Entre em contato com o suporte:{" "}
              <a
                href="mailto:suporte@assetsirius.com.br"
                className="text-[var(--color-brand-text)] hover:underline"
              >
                suporte@assetsirius.com.br
              </a>
            </p>
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-[0.72rem] text-[var(--color-text-disabled)]">
          <ShieldCheck size={12} /> Conexão segura · © 2026 Asset Sirius S.A.
        </p>
      </div>
    </div>
  )
}
