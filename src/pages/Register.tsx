import { useState } from "react"
import { ArrowRight, Headset, Lock, Mail, ShieldCheck } from "lucide-react"
import { SiriusMark } from "../components/Logo"
import { Alert, Button, Input, PasswordInput, Select, Checkbox, useToast } from "../components/ui"
import { register, login } from "../services/auth"

export default function Register({
  onCancel,
  onSuccess,
}: {
  onCancel: () => void
  onSuccess: (email: string) => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [bindingType, setBindingType] = useState<"none" | "fkGerente" | "fkGestorFundo">("none")
  const [bindingId, setBindingId] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [banner, setBanner] = useState<null | { tone: "danger"; message: string }>(null)
  const [autoLogin, setAutoLogin] = useState(true)
  const toast = useToast()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBanner(null)
    setEmailError("")

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setEmailError("Informe um e-mail corporativo válido.")
      return
    }
    if (password.length < 4) {
      setBanner({ tone: "danger", message: "A senha precisa ter ao menos 4 caracteres." })
      return
    }
    if (password !== confirm) {
      setBanner({ tone: "danger", message: "A confirmação de senha não confere." })
      return
    }

    const payload: any = { email, password }
    if (bindingType === "fkGerente") payload.fkGerente = bindingId || null
    if (bindingType === "fkGestorFundo") payload.fkGestorFundo = bindingId || null

    setLoading(true)
    try {
      await register(payload)
      if (autoLogin) {
        await login(email, password)
        onSuccess(email)
        return
      }
      // show success toast and go back to login
      toast({ tone: "success", title: "Conta criada", desc: "Você já pode entrar com suas credenciais." })
      onCancel()
    } catch (err: any) {
      const status = err?.status ?? (err?.body && err.body.status) ?? null
      const msg = err?.message || (err?.body && err.body.message) || ''
      if (status === 409 || /exist/i.test(msg)) {
        setBanner({ tone: "danger", message: "Já existe uma conta com este e-mail." })
      } else if (status === 0 || /timed out|Failed to fetch/i.test(msg)) {
        setBanner({ tone: "danger", message: "Erro de conexão. Tente novamente." })
      } else {
        setBanner({ tone: "danger", message: msg || "Erro ao criar conta." })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-full items-center justify-center overflow-hidden bg-[var(--color-bg)] px-5 py-12">
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
          <h1 className="t-h1">Criar conta</h1>
          <p className="mt-2 max-w-xs t-small text-[var(--color-text-secondary)]">
            Registre um usuário autorizado. Apenas colaboradores e administradores podem acessar a plataforma.
          </p>
        </div>

        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-[0_32px_80px_-32px_rgba(0,0,0,0.9)]">
          {banner && (
            <div className="mb-5">
              <Alert tone="danger" title="Erro">{banner.message}</Alert>
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
              autoComplete="new-password"
            />
            <PasswordInput
              label="Confirmar senha"
              name="confirm"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              icon={<Lock size={17} />}
              autoComplete="new-password"
            />

            <Select
              label="Vinculação (opcional)"
              value={bindingType}
              onChange={(v) => setBindingType(v as any)}
              options={[
                { value: "none", label: "Nenhuma" },
                { value: "fkGerente", label: "fkGerente" },
                { value: "fkGestorFundo", label: "fkGestorFundo" },
              ]}
            />
            {bindingType !== "none" && (
              <Input
                label={bindingType === "fkGerente" ? "ID do Gerente (opcional)" : "ID do Gestor/Fundo (opcional)"}
                name="bindingId"
                placeholder="12345"
                value={bindingId}
                onChange={(e) => setBindingId(e.target.value)}
              />
            )}

            <div className="flex items-center justify-between">
              <Checkbox checked={autoLogin} onChange={setAutoLogin} label="Entrar automaticamente após registrar" />
            </div>

            <Button type="submit" size="lg" loading={loading} className="mt-1 w-full">
              {loading ? "Registrando..." : "Criar conta"}
              {!loading && <ArrowRight size={17} />}
            </Button>
          </form>

          <div className="mt-6 flex items-start gap-2.5 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3.5 py-3">
            <Headset size={15} className="mt-0.5 shrink-0 text-[var(--color-text-muted)]" />
            <p className="text-[0.75rem] leading-relaxed text-[var(--color-text-muted)]">
              Dúvidas sobre o registro? Entre em contato com o suporte: <a href="mailto:suporte@assetsirius.com.br" className="text-[var(--color-brand-text)] hover:underline">suporte@assetsirius.com.br</a>
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
