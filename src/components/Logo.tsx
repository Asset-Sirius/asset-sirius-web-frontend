export function SiriusMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="14" stroke="var(--color-brand)" strokeWidth="1.5" opacity="0.55" />
      <circle cx="16" cy="16" r="9.5" stroke="var(--color-brand)" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="3.4" fill="var(--color-brand)" />
    </svg>
  )
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <SiriusMark />
      {!compact && (
        <span className="text-[0.95rem] font-semibold tracking-tight text-[var(--color-text)]">
          Asset Sirius
        </span>
      )}
    </div>
  )
}
