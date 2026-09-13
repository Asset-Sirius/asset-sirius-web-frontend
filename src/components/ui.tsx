import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react"
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  Info,
  Loader2,
  Search,
  X,
  XCircle,
} from "lucide-react"

function cx(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ")
}

/* ---------------- Button ---------------- */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  icon?: ReactNode
}
export function Button({
  variant = "primary",
  size = "md",
  loading,
  icon,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const sizes = {
    sm: "h-8 px-3 text-[0.8125rem] gap-1.5",
    md: "h-10 px-4 text-[0.875rem] gap-2",
    lg: "h-12 px-5 text-[0.9375rem] gap-2",
  }
  const variants = {
    primary:
      "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] active:bg-[var(--color-brand-active)] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_8px_24px_-12px_rgba(47,107,255,0.7)]",
    secondary:
      "bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)] hover:border-[#3a4150]",
    ghost:
      "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]",
    danger:
      "bg-[var(--color-danger)] text-white hover:brightness-110 active:brightness-95",
  }
  return (
    <button
      disabled={disabled || loading}
      className={cx(
        "inline-flex items-center justify-center rounded-[var(--radius)] font-medium whitespace-nowrap transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none select-none",
        sizes[size],
        variants[variant],
        className,
      )}
      {...rest}
    >
      {loading ? <Loader2 size={16} className="anim-spin" /> : icon}
      {children}
    </button>
  )
}

export function IconButton({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cx(
        "inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] disabled:opacity-40",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

/* ---------------- Inputs ---------------- */
type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
  icon?: ReactNode
}
export function Input({ label, hint, error, icon, className, id, ...rest }: FieldProps) {
  const inputId = id || rest.name
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-[0.8125rem] font-medium text-[var(--color-text-secondary)]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={cx(
            "h-11 w-full rounded-[var(--radius)] border bg-[var(--color-bg-elevated)] px-3.5 text-[0.9375rem] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] transition-colors",
            "focus:outline-none focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[var(--color-brand)]/15",
            icon ? "pl-10" : "",
            error ? "border-[var(--color-danger)]" : "border-[var(--color-border-strong)] hover:border-[#3a4150]",
            className,
          )}
          {...rest}
        />
      </div>
      {error ? (
        <span className="flex items-center gap-1.5 text-[0.75rem] text-[var(--color-danger)]">
          <AlertTriangle size={12} /> {error}
        </span>
      ) : (
        hint && <span className="text-[0.75rem] text-[var(--color-text-muted)]">{hint}</span>
      )}
    </div>
  )
}

export function PasswordInput(props: FieldProps) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Input {...props} type={show ? "text" : "password"} className="pr-11" />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        className="absolute right-3 top-[2.35rem] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        style={{ top: props.label ? "2.35rem" : "0.85rem" }}
      >
        {show ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  )
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Pesquisar...",
  className,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <div className={cx("relative", className)}>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-[var(--radius)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] pl-9 pr-3 text-[0.875rem] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] transition-colors hover:border-[#3a4150] focus:outline-none focus:border-[var(--color-brand)]"
      />
    </div>
  )
}

export function Select({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label?: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  className?: string
}) {
  return (
    <div className={cx("flex flex-col gap-1.5", className)}>
      {label && <label className="text-[0.8125rem] font-medium text-[var(--color-text-secondary)]">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full appearance-none rounded-[var(--radius)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] pl-3.5 pr-9 text-[0.875rem] text-[var(--color-text)] transition-colors hover:border-[#3a4150] focus:outline-none focus:border-[var(--color-brand)]"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-[var(--color-surface)]">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
      </div>
    </div>
  )
}

/* ---------------- Checkbox / Toggle ---------------- */
export function Checkbox({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
  disabled?: boolean
}) {
  return (
    <label className={cx("inline-flex items-center gap-2.5 select-none", disabled ? "opacity-40" : "cursor-pointer")}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cx(
          "flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border transition-all",
          checked
            ? "border-[var(--color-brand)] bg-[var(--color-brand)]"
            : "border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] hover:border-[#4a5160]",
        )}
      >
        {checked && <Check size={13} strokeWidth={3} className="text-white" />}
      </button>
      {label && <span className="text-[0.875rem] text-[var(--color-text)]">{label}</span>}
    </label>
  )
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
  disabled?: boolean
}) {
  return (
    <label className={cx("inline-flex items-center gap-3 select-none", disabled ? "opacity-40" : "cursor-pointer")}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cx(
          "relative h-[22px] w-[38px] rounded-full transition-colors",
          checked ? "bg-[var(--color-brand)]" : "bg-[var(--color-surface-active)]",
        )}
      >
        <span
          className={cx(
            "absolute top-[3px] h-4 w-4 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-[19px]" : "translate-x-[3px]",
          )}
        />
      </button>
      {label && <span className="text-[0.875rem] text-[var(--color-text)]">{label}</span>}
    </label>
  )
}

export function Radio({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
      <button
        type="button"
        role="radio"
        aria-checked={checked}
        onClick={onChange}
        className={cx(
          "flex h-[18px] w-[18px] items-center justify-center rounded-full border transition-all",
          checked ? "border-[var(--color-brand)]" : "border-[var(--color-border-strong)] hover:border-[#4a5160]",
        )}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-[var(--color-brand)]" />}
      </button>
      <span className="text-[0.875rem] text-[var(--color-text)]">{label}</span>
    </label>
  )
}

/* ---------------- Badge / Status ---------------- */
type Tone = "neutral" | "brand" | "success" | "warning" | "danger"
const toneMap: Record<Tone, string> = {
  neutral: "bg-[var(--color-surface-active)] text-[var(--color-text-secondary)] border-[var(--color-border-strong)]",
  brand: "bg-[var(--color-brand-soft)] text-[var(--color-brand-text)] border-[#243a6e]",
  success: "bg-[var(--color-success-soft)] text-[#4fd39b] border-[#194a37]",
  warning: "bg-[var(--color-warning-soft)] text-[#f0b64a] border-[#4a3a15]",
  danger: "bg-[var(--color-danger-soft)] text-[#ff7a7e] border-[#5a2427]",
}
export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.72rem] font-medium",
        toneMap[tone],
      )}
    >
      {children}
    </span>
  )
}

const dotColor: Record<Tone, string> = {
  neutral: "bg-[var(--color-text-muted)]",
  brand: "bg-[var(--color-brand)]",
  success: "bg-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]",
  danger: "bg-[var(--color-danger)]",
}
export function StatusDot({ tone = "neutral", label }: { tone?: Tone; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.8125rem] text-[var(--color-text)]">
      <span className={cx("relative flex h-2 w-2")}>
        {tone === "success" && (
          <span className={cx("absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping", dotColor[tone])} />
        )}
        <span className={cx("relative inline-flex h-2 w-2 rounded-full", dotColor[tone])} />
      </span>
      {label}
    </span>
  )
}

/* ---------------- Card ---------------- */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cx(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]",
        className,
      )}
    >
      {children}
    </div>
  )
}

/* ---------------- Tabs ---------------- */
export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
}) {
  return (
    <div className="flex gap-1 border-b border-[var(--color-border)]">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cx(
            "relative px-3.5 py-2.5 text-[0.875rem] font-medium transition-colors",
            active === t.id ? "text-[var(--color-text)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",
          )}
        >
          {t.label}
          {active === t.id && (
            <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[var(--color-brand)]" />
          )}
        </button>
      ))}
    </div>
  )
}

/* ---------------- Dropdown menu ---------------- */
export function Menu({
  trigger,
  children,
  align = "right",
}: {
  trigger: ReactNode
  children: (close: () => void) => ReactNode
  align?: "left" | "right"
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])
  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div
          className={cx(
            "absolute z-40 mt-1.5 min-w-[190px] overflow-hidden rounded-[var(--radius)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] p-1 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.7)] anim-fade",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  )
}
export function MenuItem({
  children,
  onClick,
  icon,
  danger,
}: {
  children: ReactNode
  onClick?: () => void
  icon?: ReactNode
  danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "flex w-full items-center gap-2.5 rounded-[6px] px-2.5 py-2 text-left text-[0.8125rem] transition-colors",
        danger
          ? "text-[#ff7a7e] hover:bg-[var(--color-danger-soft)]"
          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]",
      )}
    >
      {icon}
      {children}
    </button>
  )
}

/* ---------------- Tooltip ---------------- */
export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="group/tt relative inline-flex">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-2 py-1 text-[0.72rem] text-[var(--color-text)] opacity-0 shadow-lg transition-opacity group-hover/tt:opacity-100">
        {label}
      </span>
    </span>
  )
}

/* ---------------- Modal ---------------- */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  size?: "sm" | "md" | "lg"
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])
  if (!open) return null
  const widths = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm anim-fade" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className={cx(
          "relative w-full rounded-[var(--radius-xl)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.8)] anim-fade",
          widths[size],
        )}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div>
            <h2 className="t-h2">{title}</h2>
            {description && <p className="mt-1.5 t-small text-[var(--color-text-secondary)]">{description}</p>}
          </div>
          <IconButton onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </IconButton>
        </div>
        {children && <div className="px-6 py-5">{children}</div>}
        {footer && (
          <div className="flex justify-end gap-3 border-t border-[var(--color-border)] px-6 py-4">{footer}</div>
        )}
      </div>
    </div>
  )
}

/* ---------------- Empty / Loading states ---------------- */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)]">
        {icon}
      </div>
      <h3 className="t-h3">{title}</h3>
      <p className="max-w-sm t-small text-[var(--color-text-secondary)]">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("skeleton rounded-[var(--radius)]", className)} />
}

/* ---------------- Alert ---------------- */
export function Alert({
  tone = "brand",
  title,
  children,
}: {
  tone?: "brand" | "warning" | "danger" | "success"
  title?: string
  children: ReactNode
}) {
  const icons = {
    brand: <Info size={16} />,
    warning: <AlertTriangle size={16} />,
    danger: <XCircle size={16} />,
    success: <CheckCircle2 size={16} />,
  }
  const styles = {
    brand: "border-[#243a6e] bg-[var(--color-brand-soft)] text-[var(--color-brand-text)]",
    warning: "border-[#4a3a15] bg-[var(--color-warning-soft)] text-[#f0b64a]",
    danger: "border-[#5a2427] bg-[var(--color-danger-soft)] text-[#ff7a7e]",
    success: "border-[#194a37] bg-[var(--color-success-soft)] text-[#4fd39b]",
  }
  return (
    <div className={cx("flex gap-3 rounded-[var(--radius)] border px-4 py-3", styles[tone])}>
      <span className="mt-0.5 shrink-0">{icons[tone]}</span>
      <div className="text-[0.8125rem] leading-relaxed">
        {title && <div className="font-semibold">{title}</div>}
        <div className={title ? "text-[var(--color-text-secondary)]" : ""}>{children}</div>
      </div>
    </div>
  )
}

/* ---------------- Pagination ---------------- */
export function Pagination({
  page,
  pageCount,
  onPage,
}: {
  page: number
  pageCount: number
  onPage: (p: number) => void
}) {
  if (pageCount <= 1) return null
  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="sm" disabled={page === 1} onClick={() => onPage(page - 1)}>
        Anterior
      </Button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={cx(
            "h-8 min-w-8 rounded-[var(--radius-sm)] px-2 text-[0.8125rem] font-medium tnum transition-colors",
            p === page
              ? "bg-[var(--color-brand-soft)] text-[var(--color-brand-text)]"
              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]",
          )}
        >
          {p}
        </button>
      ))}
      <Button variant="ghost" size="sm" disabled={page === pageCount} onClick={() => onPage(page + 1)}>
        Próxima
      </Button>
    </div>
  )
}

/* ---------------- Avatar ---------------- */
export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-soft)] font-medium text-[var(--color-brand-text)] tnum"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </span>
  )
}

/* ---------------- Toasts ---------------- */
type Toast = { id: number; tone: Tone; title: string; desc?: string }
const ToastCtx = createContext<(t: Omit<Toast, "id">) => void>(() => {})
export function useToast() {
  return useContext(ToastCtx)
}
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  function push(t: Omit<Toast, "id">) {
    const id = Date.now() + Math.random()
    setToasts((cur) => [...cur, { ...t, id }])
    setTimeout(() => setToasts((cur) => cur.filter((x) => x.id !== id)), 4200)
  }
  const icons: Record<Tone, ReactNode> = {
    neutral: <Info size={17} />,
    brand: <Info size={17} />,
    success: <CheckCircle2 size={17} className="text-[var(--color-success)]" />,
    warning: <AlertTriangle size={17} className="text-[var(--color-warning)]" />,
    danger: <XCircle size={17} className="text-[var(--color-danger)]" />,
  }
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-6 right-6 z-[60] flex w-[340px] flex-col gap-2.5">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="anim-toast flex items-start gap-3 rounded-[var(--radius)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-4 py-3 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.7)]"
          >
            <span className="mt-0.5">{icons[t.tone]}</span>
            <div className="flex-1">
              <div className="text-[0.875rem] font-medium text-[var(--color-text)]">{t.title}</div>
              {t.desc && <div className="mt-0.5 text-[0.8125rem] text-[var(--color-text-secondary)]">{t.desc}</div>}
            </div>
            <button
              onClick={() => setToasts((cur) => cur.filter((x) => x.id !== t.id))}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}
