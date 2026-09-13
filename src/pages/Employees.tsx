import { useMemo, useState } from "react"
import { Eye, MoreHorizontal, Pencil, Plus, Trash2, UserPlus, Users } from "lucide-react"
import { PageHeader } from "../components/blocks"
import {
  Avatar,
  Badge,
  Button,
  Card,
  EmptyState,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Modal,
  Pagination,
  Select,
  SearchInput,
  StatusDot,
  useToast,
} from "../components/ui"
import { INITIAL_EMPLOYEES, PROFILE_OPTIONS, type Employee, type Status } from "../data"

const STATUS_META: Record<Status, { tone: "success" | "neutral" | "warning"; label: string }> = {
  active: { tone: "success", label: "Ativo" },
  inactive: { tone: "neutral", label: "Inativo" },
  pending: { tone: "warning", label: "Pendente" },
}
const PAGE_SIZE = 6
const emptyForm = { name: "", email: "", profile: "Analista", status: "active" as Status }

export function Employees({ canWrite }: { canWrite: boolean }) {
  const toast = useToast()
  const [rows, setRows] = useState<Employee[]>(INITIAL_EMPLOYEES)
  const [query, setQuery] = useState("")
  const [profileFilter, setProfileFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Employee | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  const [toDelete, setToDelete] = useState<Employee | null>(null)
  const [viewing, setViewing] = useState<Employee | null>(null)

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const q = query.toLowerCase()
      const matchQ = r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
      const matchP = profileFilter === "all" || r.profile === profileFilter
      const matchS = statusFilter === "all" || r.status === statusFilter
      return matchQ && matchP && matchS
    })
  }, [rows, query, profileFilter, statusFilter])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pageCount)
  const paged = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setErrors({})
    setFormOpen(true)
  }
  function openEdit(e: Employee) {
    setEditing(e)
    setForm({ name: e.name, email: e.email, profile: e.profile, status: e.status })
    setErrors({})
    setFormOpen(true)
  }

  function save() {
    const errs: typeof errors = {}
    if (form.name.trim().length < 3) errs.name = "Informe o nome completo."
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "E-mail inválido."
    setErrors(errs)
    if (Object.keys(errs).length) return

    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      if (editing) {
        setRows((r) => r.map((x) => (x.id === editing.id ? { ...x, ...form } : x)))
        toast({ tone: "success", title: "Funcionário atualizado", desc: form.name })
      } else {
        setRows((r) => [
          { id: Date.now().toString(), ...form, createdAt: "24 ago 2026", lastAccess: "—" },
          ...r,
        ])
        toast({ tone: "success", title: "Funcionário cadastrado", desc: `${form.name} foi adicionado.` })
      }
      setFormOpen(false)
    }, 900)
  }

  function confirmDelete() {
    if (!toDelete) return
    setRows((r) => r.filter((x) => x.id !== toDelete.id))
    toast({ tone: "danger", title: "Funcionário removido", desc: `${toDelete.name} perdeu o acesso.` })
    setToDelete(null)
  }

  return (
    <div className="anim-fade">
      <PageHeader
        title="Funcionários"
        description="Gerencie os usuários com acesso à plataforma."
        actions={
          canWrite && (
            <Button icon={<Plus size={16} />} onClick={openCreate}>
              Novo funcionário
            </Button>
          )
        }
      />

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-[var(--color-border)] p-4 lg:flex-row lg:items-center">
          <SearchInput value={query} onChange={(v) => { setQuery(v); setPage(1) }} placeholder="Buscar por nome ou e-mail..." className="lg:max-w-xs lg:flex-1" />
          <div className="flex gap-3">
            <Select
              value={profileFilter}
              onChange={(v) => { setProfileFilter(v); setPage(1) }}
              options={[{ value: "all", label: "Todos os perfis" }, ...PROFILE_OPTIONS]}
              className="min-w-[170px]"
            />
            <Select
              value={statusFilter}
              onChange={(v) => { setStatusFilter(v); setPage(1) }}
              options={[
                { value: "all", label: "Todos os status" },
                { value: "active", label: "Ativo" },
                { value: "inactive", label: "Inativo" },
                { value: "pending", label: "Pendente" },
              ]}
              className="min-w-[150px]"
            />
          </div>
        </div>

        {paged.length === 0 ? (
          <EmptyState
            icon={<Users size={22} />}
            title="Nenhum funcionário encontrado"
            description="Ajuste os filtros de busca ou cadastre um novo funcionário para começar."
            action={canWrite && <Button icon={<UserPlus size={16} />} onClick={openCreate}>Novo funcionário</Button>}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  {["Nome", "Perfil", "Status", "Cadastro", "Último acesso", ""].map((h) => (
                    <th key={h} className="px-5 py-3 t-label">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.map((e) => (
                  <tr key={e.id} className="group border-b border-[var(--color-border)] transition-colors last:border-0 hover:bg-[var(--color-surface-hover)]">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={e.name} size={34} />
                        <div className="min-w-0">
                          <p className="text-[0.875rem] font-medium text-[var(--color-text)]">{e.name}</p>
                          <p className="truncate text-[0.75rem] text-[var(--color-text-muted)]">{e.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[0.8125rem] text-[var(--color-text-secondary)]">{e.profile}</td>
                    <td className="px-5 py-3.5">
                      <Badge tone={STATUS_META[e.status].tone}>{STATUS_META[e.status].label}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-[0.8125rem] text-[var(--color-text-secondary)] tnum">{e.createdAt}</td>
                    <td className="px-5 py-3.5 text-[0.8125rem] text-[var(--color-text-muted)]">{e.lastAccess}</td>
                    <td className="px-5 py-3.5 text-right">
                      <Menu
                        trigger={
                          <IconButton className="opacity-60 group-hover:opacity-100" aria-label="Ações">
                            <MoreHorizontal size={18} />
                          </IconButton>
                        }
                      >
                        {(close) => (
                          <>
                            <MenuItem icon={<Eye size={15} />} onClick={() => { setViewing(e); close() }}>
                              Visualizar
                            </MenuItem>
                            {canWrite && (
                              <MenuItem icon={<Pencil size={15} />} onClick={() => { openEdit(e); close() }}>
                                Editar
                              </MenuItem>
                            )}
                            {canWrite && (
                              <>
                                <div className="my-1 h-px bg-[var(--color-border)]" />
                                <MenuItem icon={<Trash2 size={15} />} danger onClick={() => { setToDelete(e); close() }}>
                                  Excluir
                                </MenuItem>
                              </>
                            )}
                          </>
                        )}
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {paged.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--color-border)] px-5 py-3.5 sm:flex-row">
            <p className="text-[0.75rem] text-[var(--color-text-muted)] tnum">
              {filtered.length} funcionário{filtered.length !== 1 ? "s" : ""} · página {current} de {pageCount}
            </p>
            <Pagination page={current} pageCount={pageCount} onPage={setPage} />
          </div>
        )}
      </Card>

      {/* Create / Edit */}
      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Editar funcionário" : "Novo funcionário"}
        description={editing ? "Atualize os dados de acesso do funcionário." : "Cadastre um novo usuário com acesso à plataforma."}
        footer={
          <>
            <Button variant="secondary" onClick={() => setFormOpen(false)}>Cancelar</Button>
            <Button loading={saving} onClick={save}>{editing ? "Salvar alterações" : "Cadastrar funcionário"}</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Nome completo"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
            placeholder="Ex.: Camila Andrade"
          />
          <Input
            label="E-mail"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
            placeholder="nome@assetsirius.com.br"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select label="Perfil" value={form.profile} onChange={(v) => setForm({ ...form, profile: v })} options={PROFILE_OPTIONS} />
            <Select
              label="Status"
              value={form.status}
              onChange={(v) => setForm({ ...form, status: v as Status })}
              options={[
                { value: "active", label: "Ativo" },
                { value: "inactive", label: "Inativo" },
                { value: "pending", label: "Pendente" },
              ]}
            />
          </div>
        </div>
      </Modal>

      {/* View */}
      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Detalhes do funcionário">
        {viewing && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3.5">
              <Avatar name={viewing.name} size={52} />
              <div>
                <p className="t-h3">{viewing.name}</p>
                <p className="t-small text-[var(--color-text-secondary)]">{viewing.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-border)]">
              {[
                ["Perfil", viewing.profile],
                ["Status", STATUS_META[viewing.status].label],
                ["Cadastro", viewing.createdAt],
                ["Último acesso", viewing.lastAccess],
              ].map(([k, v]) => (
                <div key={k} className="bg-[var(--color-surface)] px-4 py-3">
                  <p className="t-label">{k}</p>
                  <p className="mt-1 text-[0.875rem] text-[var(--color-text)]">{v}</p>
                </div>
              ))}
            </div>
            <StatusDot tone={STATUS_META[viewing.status].tone === "warning" ? "warning" : STATUS_META[viewing.status].tone === "success" ? "success" : "neutral"} label={`Conta ${STATUS_META[viewing.status].label.toLowerCase()}`} />
          </div>
        )}
      </Modal>

      {/* Delete */}
      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Excluir funcionário?"
        description="Esta ação removerá o acesso deste funcionário à plataforma."
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setToDelete(null)}>Cancelar</Button>
            <Button variant="danger" icon={<Trash2 size={15} />} onClick={confirmDelete}>Excluir funcionário</Button>
          </>
        }
      >
        {toDelete && (
          <div className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3">
            <Avatar name={toDelete.name} size={38} />
            <div>
              <p className="text-[0.875rem] font-medium text-[var(--color-text)]">{toDelete.name}</p>
              <p className="text-[0.75rem] text-[var(--color-text-muted)]">{toDelete.email}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
