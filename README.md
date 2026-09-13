# Asset Sirius Web Frontend

Interface web do Asset Sirius, uma plataforma de monitoramento de resgates e retenção de cotistas em fundos de investimento.

O frontend apresenta dashboards operacionais, indicadores de risco, alertas priorizados e recursos de administração de usuários e permissões. Esta versão funciona como uma demonstração navegável, com dados estáticos e estado mantido apenas em memória.

## Funcionalidades

- Autenticação demonstrativa com perfis de acesso.
- Dashboard de monitoramento de resgates, com:
	- alertas ativos e volume em risco;
	- cotistas monitorados e taxa de retenção;
	- filtros por período e fundo;
	- alertas recentes priorizados para contato comercial.
- Dashboard de retenção de cotistas, com:
	- taxa de retenção e ações preventivas;
	- resgates revertidos e NPS de relacionamento;
	- filtros por período e segmento;
	- acompanhamento de ações de relacionamento.
- Gestão de funcionários com busca, filtros, paginação, visualização, cadastro, edição e exclusão.
- Gestão de perfis com status, descrição e matriz de permissões por módulo.
- Página de conta do usuário e encerramento de sessão.
- Controle de acesso para diferenciar usuários administradores e analistas.
- Layout responsivo com navegação lateral para desktop e menu móvel.

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- Lucide React
- oxfmt

## Pré-requisitos

- Node.js compatível com o projeto.
- pnpm instalado.

## Instalação

```bash
pnpm install
```

## Desenvolvimento

Inicie o servidor local com:

```bash
pnpm dev
```

O Vite disponibiliza a aplicação no endereço indicado no terminal.

## Build e preview

Para gerar a versão de produção:

```bash
pnpm build
```

Para servir o build localmente:

```bash
pnpm preview
```

Para formatar o projeto:

```bash
pnpm format
```

## Acesso demonstrativo

Na tela de login, use um e-mail válido e uma senha com pelo menos quatro caracteres.

| E-mail | Perfil | Acesso |
| --- | --- | --- |
| `admin@assetsirius.com.br` | Administrador | Dashboards, funcionários e perfis |
| `analista@assetsirius.com.br` | Analista | Apenas dashboards |

O login atual é simulado no cliente. Para testar estados adicionais, inclua `bloqueado` ou `offline` no e-mail. Qualquer senha com quatro ou mais caracteres é aceita quando não há erro simulado.

## Estrutura principal

```text
src/
├── App.tsx                    # Sessão, autorização e roteamento principal
├── data.ts                    # Tipos e dados demonstrativos
├── index.css                  # Design system e estilos globais
├── components/
│   ├── AppShell.tsx           # Layout, navegação e cabeçalho
│   ├── blocks.tsx             # Blocos reutilizáveis dos dashboards
│   ├── Logo.tsx
│   └── ui.tsx                 # Componentes de interface
└── pages/
		├── Dashboard1.tsx         # Monitoramento de resgates
		├── Dashboard2.tsx         # Retenção de cotistas
		├── Employees.tsx          # Gestão de funcionários
		├── Login.tsx              # Login demonstrativo
		├── NoAccess.tsx            # Estado sem permissão
		├── Profiles.tsx           # Gestão de perfis
		└── Settings.tsx           # Minha conta
```

## Estado atual e próximos passos

O repositório ainda não possui integração com backend, banco de dados, autenticação real ou persistência. Os gráficos e alguns painéis são placeholders visuais para futura integração com os dados do Asset Sirius, incluindo fontes da CVM, indicadores analíticos e alertas de retenção.

Para evoluir a aplicação, os principais próximos passos são:

1. Definir os contratos da API e conectar os dashboards aos dados reais.
2. Substituir a autenticação simulada por um fluxo seguro no backend.
3. Persistir funcionários, perfis, permissões e ações de relacionamento.
4. Integrar os painéis analíticos e o monitoramento operacional.

## Contexto do produto

O Asset Sirius busca identificar sinais antecipados de desinvestimento, priorizar alertas de risco de resgate e apoiar ações preventivas de relacionamento com cotistas. A arquitetura completa do produto contempla ingestão de dados públicos da CVM, processamento analítico e dashboards de gestão.
