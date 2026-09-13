import { useState } from "react"
import { Eye, MoreHorizontal, Pencil, Plus, ShieldCheck, Trash2, UserCog } from "lucide-react"
import { PageHeader } from "../components/blocks"
import {
  Badge,
  Button,
  Card,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Modal,
  Select,
  StatusDot,
  Toggle,
  useToast,
} from "../components/ui"
import {
  INITIAL_PROFILES,
  MODULES,
  PERMISSION_LABELS,
  type ModuleKey,
  type Permission,
  type Profile,
  type Status,
} from "../data"

const STATUS_META: Record<Status, { tone: "success" | "neutral" | "warning"; label: string }> = {
  active: { tone: "success", label: "Ativo" },
  inactive: { tone: "neutral", label: "Inativo" },
  pending: { tone: "warning", label: "Pendente" },
}

function emptyPermissions(): Profile["permissions"] {
  return { dashboard1: {}, dashboard2: {}, employees: {}, profiles: {} }
}

export function Profiles({ canWrite }: { canWrite: boolean }) {
  const toast = useToast()
  const [rows, setRows] = useState<Profile[]>(INITIAL_PROFILES)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editing, setEditing] = useState<Profile | null>(null)
  const [viewing, setViewing] = useState<Profile | null>(null)
  const [toDelete, setToDelete] = useState<Profile | null>(null)
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<Status>("active")
  const [perms, setPerms] = useState<Profile["permissions"]>(emptyPermissions())
  const [nameError, setNameError] = useState("")

  function openCreate() {
    setEditing(null)
    setName("")
    setDescription("")
    setStatus("active")
    setPerms(emptyPermissions())
    setNameError("")
    setEditorOpen(true)
  }
  function openEdit(p: Profile) {
    setEditing(p)
    setName(p.name)
    setDescription(p.description)
    setStatus(p.status)
    setPerms(JSON.parse(JSON.stringify(p.permissions)))
    setNameError("")
    setEditorOpen(true)
  }

  function togglePerm(mod: ModuleKey, perm: Permission) {
    setPerms((prev) => ({ ...prev, [mod]: { ...prev[mod], [perm]: !prev[mod][perm] } }))
  }

  function countEnabled(p: Profile["permissions"]) {
    return Object.values(p).reduce((acc, m) => acc + Object.values(m).filter(Boolean).length, 0)
  }

  function save() {
    if (name.trim().length < 3) {
      setNameError("Informe um nome de perfil válido.")
      return
    }
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      if (editing) {
        setRows((r) =>
          r.map((x) => (x.id === editing.id ? { ...x, name, description, status, permissions: perms, updatedAt: "24 ago 2026" } : x)),
        )
        toast({ tone: "success", title: "Perfil atualizado", desc: name })
      } else {
        setRows((r) => [
          { id: Date.now().toString(), name, description, status, users: 0, updatedAt: "24 ago 2026", permissions: perms },
          ...r,
        ])
        toast({ tone: "success", title: "Perfil criado", desc: `${name} está disponível.` })
      }
      setEditorOpen(false)
    }, 900)
  }

  function confirmDelete() {
    if (!toDelete) return
    setRows((r) => r.filter((x) => x.id !== toDelete.id))
    toast({ tone: "danger", title: "Perfil excluído", desc: toDelete.name })
    setToDelete(null)
  }

  return (
    <div className="anim-fade">
      <PageHeader
        title="Perfis"
        description="Gerencie os níveis de acesso e permissões da plataforma."
        actions={canWrite && <Button icon={<Plus size={16} />} onClick={openCreate}>Novo perfil</Button>}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((p) => (
          <Card key={p.id} className="flex flex-col p-5 transition-colors hover:border-[var(--color-border-strong)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius)] bg-[var(--color-brand-soft)] text-[var(--color-brand-text)]">
                  <ShieldCheck size={18} />
                </span>
                <div>
                  <h3 className="text-[0.95rem] font-semibold text-[var(--color-text)]">{p.name}</h3>
                  <Badge tone={STATUS_META[p.status].tone}>{STATUS_META[p.status].label}</Badge>
                </div>
              </div>
              <Menu
                trigger={<IconButton aria-label="Ações"><MoreHorizontal size={18} /></IconButton>}
              >
                {(close) => (
                  <>
                    <MenuItem icon={<Eye size={15} />} onClick={() => { setViewing(p); close() }}>Visualizar</MenuItem>
                    {canWrite && <MenuItem icon={<Pencil size={15} />} onClick={() => { openEdit(p); close() }}>Editar</MenuItem>}
                    {canWrite && (
                      <>
                        <div className="my-1 h-px bg-[var(--color-border)]" />
                        <MenuItem icon={<Trash2 size={15} />} danger onClick={() => { setToDelete(p); close() }}>Excluir</MenuItem>
                      </>
                    )}
                  </>
                )}
              </Menu>
            </div>

            <p className="mt-4 min-h-[2.6rem] t-small text-[var(--color-text-secondary)]">{p.description}</p>

            <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-4 text-[0.75rem] text-[var(--color-text-muted)]">
              <span className="tnum"><span className="font-medium text-[var(--color-text-secondary)]">{p.users}</span> usuários</span>
              <span className="tnum">{countEnabled(p.permissions)} permissões</span>
              <span className="tnum">Atualizado {p.updatedAt}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Editor with permission matrix */}
      <Modal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        title={editing ? "Editar perfil" : "Novo perfil"}
        description="Defina os dados do perfil e as permissões de acesso por módulo."
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditorOpen(false)}>Cancelar</Button>
            <Button loading={saving} onClick={save}>Salvar perfil</Button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Nome do perfil" value={name} onChange={(e) => setName(e.target.value)} error={nameError} placeholder="Ex.: Analista" />
            <Select
              label="Status"
              value={status}
              onChange={(v) => setStatus(v as Status)}
              options={[
                { value: "active", label: "Ativo" },
                { value: "inactive", label: "Inativo" },
              ]}
            />
          </div>
          <Input label="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Breve descrição do nível de acesso." />

          <div>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h4 className="t-h3">Permissões de acesso</h4>
                <p className="mt-0.5 t-caption text-[var(--color-text-muted)]">Ative as permissões concedidas a este perfil.</p>
              </div>
              <span className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-2.5 py-1 text-[0.72rem] text-[var(--color-text-secondary)] tnum">
                {countEnabled(perms)} ativas
              </span>
            </div>

            <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--color-border)]">
              <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
                <div className="px-4 py-2.5 t-label">Módulo</div>
                {(["view", "create", "edit", "delete"] as Permission[]).map((p) => (
                  <div key={p} className="px-2 py-2.5 text-center t-label">{PERMISSION_LABELS[p]}</div>
                ))}
              </div>
              {MODULES.map((mod, i) => (
                <div
                  key={mod.key}
                  className={`grid grid-cols-[1.4fr_repeat(4,1fr)] items-center ${i < MODULES.length - 1 ? "border-b border-[var(--color-border)]" : ""}`}
                >
                  <div className="px-4 py-3 text-[0.8125rem] font-medium text-[var(--color-text)]">{mod.label}</div>
                  {(["view", "create", "edit", "delete"] as Permission[]).map((perm) => {
                    const available = mod.perms.includes(perm)
                    return (
                      <div key={perm} className="flex justify-center px-2 py-3">
                        {available ? (
                          <Toggle checked={!!perms[mod.key][perm]} onChange={() => togglePerm(mod.key, perm)} />
                        ) : (
                          <span className="text-[var(--color-text-disabled)]">—</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* View */}
      <Modal open={!!viewing} onClose={() => setViewing(null)} title={viewing?.name || ""} description={viewing?.description} size="md">
        {viewing && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-[var(--color-text-secondary)]">
              <StatusDot tone={STATUS_META[viewing.status].tone === "warning" ? "warning" : STATUS_META[viewing.status].tone === "success" ? "success" : "neutral"} label={STATUS_META[viewing.status].label} />
              <span className="tnum">{viewing.users} usuários</span>
              <span className="tnum">Atualizado {viewing.updatedAt}</span>
            </div>
            <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--color-border)]">
              {MODULES.map((mod, i) => {
                const active = mod.perms.filter((p) => viewing.permissions[mod.key][p]).map((p) => PERMISSION_LABELS[p])
                return (
                  <div key={mod.key} className={`flex items-center justify-between gap-4 px-4 py-3 ${i < MODULES.length - 1 ? "border-b border-[var(--color-border)]" : ""}`}>
                    <span className="text-[0.8125rem] font-medium text-[var(--color-text)]">{mod.label}</span>
                    <span className="flex flex-wrap justify-end gap-1.5">
                      {active.length ? active.map((a) => <Badge key={a} tone="brand">{a}</Badge>) : <span className="text-[0.75rem] text-[var(--color-text-muted)]">Sem acesso</span>}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete */}
      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Excluir perfil?"
        description="Usuários vinculados a este perfil ficarão sem nível de acesso definido."
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setToDelete(null)}>Cancelar</Button>
            <Button variant="danger" icon={<Trash2 size={15} />} onClick={confirmDelete}>Excluir perfil</Button>
          </>
        }
      >
        {toDelete && (
          <div className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius)] bg-[var(--color-danger-soft)] text-[#ff7a7e]">
              <UserCog size={18} />
            </span>
            <div>
              <p className="text-[0.875rem] font-medium text-[var(--color-text)]">{toDelete.name}</p>
              <p className="text-[0.75rem] text-[var(--color-text-muted)] tnum">{toDelete.users} usuários vinculados</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
