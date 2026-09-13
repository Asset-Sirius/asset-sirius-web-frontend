export type Status = "active" | "inactive" | "pending"

export type Employee = {
  id: string
  name: string
  email: string
  profile: string
  status: Status
  createdAt: string
  lastAccess: string
}

export type Permission = "view" | "create" | "edit" | "delete"
export type ModuleKey = "dashboard1" | "dashboard2" | "employees" | "profiles"

export type Profile = {
  id: string
  name: string
  description: string
  users: number
  status: Status
  updatedAt: string
  permissions: Record<ModuleKey, Partial<Record<Permission, boolean>>>
}

export const MODULES: { key: ModuleKey; label: string; perms: Permission[] }[] = [
  { key: "dashboard1", label: "Dashboard 1", perms: ["view"] },
  { key: "dashboard2", label: "Dashboard 2", perms: ["view"] },
  { key: "employees", label: "Funcionários", perms: ["view", "create", "edit", "delete"] },
  { key: "profiles", label: "Perfis", perms: ["view", "create", "edit", "delete"] },
]

export const PERMISSION_LABELS: Record<Permission, string> = {
  view: "Visualizar",
  create: "Criar",
  edit: "Editar",
  delete: "Excluir",
}

export const INITIAL_EMPLOYEES: Employee[] = [
  { id: "1", name: "Camila Andrade", email: "camila.andrade@assetsirius.com.br", profile: "Administrador", status: "active", createdAt: "12 mar 2024", lastAccess: "Há 4 min" },
  { id: "2", name: "Ricardo Monteiro", email: "ricardo.monteiro@assetsirius.com.br", profile: "Analista", status: "active", createdAt: "03 jan 2024", lastAccess: "Há 2 h" },
  { id: "3", name: "Fernanda Lopes", email: "fernanda.lopes@assetsirius.com.br", profile: "Gestor de Relacionamento", status: "active", createdAt: "27 nov 2023", lastAccess: "Ontem" },
  { id: "4", name: "Bruno Tavares", email: "bruno.tavares@assetsirius.com.br", profile: "Analista", status: "pending", createdAt: "18 ago 2026", lastAccess: "—" },
  { id: "5", name: "Juliana Prado", email: "juliana.prado@assetsirius.com.br", profile: "Gestor de Relacionamento", status: "active", createdAt: "09 jul 2025", lastAccess: "Há 1 dia" },
  { id: "6", name: "Henrique Salles", email: "henrique.salles@assetsirius.com.br", profile: "Auditoria", status: "inactive", createdAt: "22 fev 2023", lastAccess: "14 mai 2026" },
  { id: "7", name: "Patrícia Nunes", email: "patricia.nunes@assetsirius.com.br", profile: "Analista", status: "active", createdAt: "30 abr 2025", lastAccess: "Há 6 h" },
  { id: "8", name: "Diego Vasconcelos", email: "diego.vasconcelos@assetsirius.com.br", profile: "Administrador", status: "active", createdAt: "15 set 2024", lastAccess: "Há 22 min" },
  { id: "9", name: "Marina Castro", email: "marina.castro@assetsirius.com.br", profile: "Gestor de Relacionamento", status: "active", createdAt: "07 out 2025", lastAccess: "Há 3 h" },
  { id: "10", name: "Otávio Ramires", email: "otavio.ramires@assetsirius.com.br", profile: "Auditoria", status: "inactive", createdAt: "11 dez 2022", lastAccess: "02 jan 2026" },
]

export const INITIAL_PROFILES: Profile[] = [
  {
    id: "1",
    name: "Administrador",
    description: "Acesso total à plataforma, incluindo gestão de usuários e perfis.",
    users: 2,
    status: "active",
    updatedAt: "20 ago 2026",
    permissions: {
      dashboard1: { view: true },
      dashboard2: { view: true },
      employees: { view: true, create: true, edit: true, delete: true },
      profiles: { view: true, create: true, edit: true, delete: true },
    },
  },
  {
    id: "2",
    name: "Analista",
    description: "Visualização dos dashboards de monitoramento e retenção.",
    users: 3,
    status: "active",
    updatedAt: "16 ago 2026",
    permissions: {
      dashboard1: { view: true },
      dashboard2: { view: true },
      employees: {},
      profiles: {},
    },
  },
  {
    id: "3",
    name: "Gestor de Relacionamento",
    description: "Dashboards e acompanhamento da carteira de cotistas atribuída.",
    users: 3,
    status: "active",
    updatedAt: "11 ago 2026",
    permissions: {
      dashboard1: { view: true },
      dashboard2: { view: true },
      employees: { view: true },
      profiles: {},
    },
  },
  {
    id: "4",
    name: "Auditoria",
    description: "Consulta em modo leitura para fins de conformidade e auditoria.",
    users: 2,
    status: "inactive",
    updatedAt: "29 jul 2026",
    permissions: {
      dashboard1: { view: true },
      dashboard2: { view: true },
      employees: { view: true },
      profiles: { view: true },
    },
  },
]

export const PROFILE_OPTIONS = INITIAL_PROFILES.map((p) => ({ value: p.name, label: p.name }))
