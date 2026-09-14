# Asset Sirius | Web Frontend

Interface web do **Asset Sirius**, uma plataforma voltada ao monitoramento de resgates e à retenção de cotistas em fundos de investimento.

Esta aplicação apresenta uma demonstração navegável dos dashboards, alertas e fluxos administrativos do produto. Os dados são estáticos e o estado é mantido em memória, o que permite explorar a experiência sem depender de serviços externos.

<a id="visao-geral"></a>

## Visão geral 

O Asset Sirius apoia equipes de gestão e relacionamento na identificação antecipada de possíveis movimentos de desinvestimento. A interface transforma indicadores e alertas em uma visão operacional para priorizar contatos e ações de retenção.

- Acompanhe métricas de resgate, retenção e relacionamento.
- Priorize cotistas com maior sinal de risco.
- Consulte alertas e ações preventivas por fundo, período ou segmento.
- Gerencie usuários, perfis e permissões de acesso.

## Sumário 

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Como executar](#como-executar)
- [Acessos demonstrativos](#acessos-demonstrativos)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Limitações e evolução](#limitações-e-evolução)

<a id="funcionalidades"></a>

## Funcionalidades 

### 📈 Dashboards 

- **Monitoramento de resgates:** alertas ativos, volume em risco, cotistas monitorados, taxa de retenção e alertas recentes para contato comercial.
- **Retenção de cotistas:** acompanhamento de ações preventivas, resgates revertidos, NPS de relacionamento e filtros por período e segmento.
- Filtros contextuais por período, fundo ou segmento para apoiar a análise operacional.

### 🔐 Administração e acesso

- Login demonstrativo com diferenciação entre perfis de administrador e analista.
- Gestão de funcionários: busca, filtros, paginação, visualização, cadastro, edição e exclusão.
- Gestão de perfis, descrições, status e matriz de permissões por módulo.
- Página de conta, encerramento de sessão e tratamento de acesso sem permissão.
- Navegação responsiva com barra lateral no desktop e menu adaptado para dispositivos móveis.

<a id="tecnologias"></a>

## 🛠️ Tecnologias 

| Camada | Tecnologias |
| --- | --- |
| Interface | React 19, TypeScript e Lucide React |
| Estilização | Tailwind CSS 4 |
| Ferramentas | Vite 8 e oxfmt |

<a id="como-executar"></a>

## Como executar 

### 📋 Pré-requisitos 

- Node.js compatível com o projeto
- pnpm

### 📦 Instalação 

```bash
pnpm install
```

### 💻 Ambiente de desenvolvimento 

```bash
pnpm dev
```

O Vite exibirá no terminal o endereço local da aplicação.

### ⚙️ Build, preview e formatação 

```bash
# Gera a versão de produção
pnpm build

# Serve o build gerado localmente
pnpm preview

# Formata os arquivos do projeto
pnpm format
```

<a id="acessos-demonstrativos"></a>

## 👤 Acessos demonstrativos 

Na tela de login, informe um e-mail válido e uma senha com pelo menos quatro caracteres.

| E-mail | Perfil | Permissões |
| --- | --- | --- |
| `admin@assetsirius.com.br` | Administrador | Dashboards, funcionários e perfis |
| `analista@assetsirius.com.br` | Analista | Dashboards |

O fluxo de autenticação é simulado no cliente. Para testar cenários alternativos, inclua `bloqueado` ou `offline` no e-mail informado. Qualquer senha com quatro ou mais caracteres é aceita quando não há erro simulado.

<a id="estrutura-do-projeto"></a>

## 🗂️ Estrutura do projeto 

```text
src/
├── App.tsx                 # Sessão, autorização e roteamento principal
├── data.ts                 # Tipos e dados demonstrativos
├── index.css               # Design system e estilos globais
├── components/
│   ├── AppShell.tsx        # Layout, navegação e cabeçalho
│   ├── blocks.tsx          # Blocos reutilizáveis dos dashboards
│   ├── Logo.tsx            # Identidade visual da aplicação
│   └── ui.tsx              # Componentes de interface
└── pages/
    ├── Dashboard1.tsx      # Monitoramento de resgates
    ├── Dashboard2.tsx      # Retenção de cotistas
    ├── Employees.tsx       # Gestão de funcionários
    ├── Login.tsx           # Login demonstrativo
    ├── NoAccess.tsx        # Estado sem permissão
    ├── Profiles.tsx        # Gestão de perfis
    └── Settings.tsx        # Minha conta
```

<a id="limitações-e-evolução"></a>

## 🔭 Limitações e evolução 

No estado atual, a aplicação não possui backend, banco de dados, autenticação real ou persistência. Os gráficos e alguns painéis funcionam como representações visuais para a futura integração com o ecossistema analítico do Asset Sirius.

Próximas evoluções previstas:

1. Definir contratos de API e conectar os dashboards aos dados reais.
2. Integrar fontes da CVM, indicadores analíticos e alertas de retenção.
3. Substituir a autenticação simulada por um fluxo seguro no backend.
4. Persistir funcionários, perfis, permissões e ações de relacionamento.

## 🎯 Contexto do produto 

O Asset Sirius busca reduzir a incerteza nas decisões de gestão e relacionamento com cotistas. A solução completa contempla ingestão de dados públicos da CVM, processamento analítico em camadas e dashboards voltados à detecção de sinais de desinvestimento.
