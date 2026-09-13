import { Lock } from "lucide-react"
import { Button } from "../components/ui"

export function NoAccess({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center anim-fade">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] text-[var(--color-warning)]">
        <Lock size={26} />
      </span>
      <h2 className="t-h1">Acesso não autorizado</h2>
      <p className="mt-2 max-w-md t-body text-[var(--color-text-secondary)]">
        Você não possui permissão para acessar esta página. Caso acredite que isso é um engano, contate um administrador da plataforma.
      </p>
      <Button className="mt-6" onClick={onBack}>Voltar para o início</Button>
    </div>
  )
}
