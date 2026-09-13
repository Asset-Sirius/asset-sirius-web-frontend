Crie um **Design System completo e consistente para uma aplicação web corporativa chamada “Asset Sirius”**, utilizando como referência visual principal as imagens anexadas a este prompt.

As imagens anexadas representam o estilo visual que deve ser seguido. **Não copie literalmente o layout do e-mail**, mas utilize sua linguagem visual para construir uma aplicação web completa.

## 1. Direção visual

A interface deve transmitir:

* Plataforma corporativa de alto nível
* Ambiente financeiro / Private Banking
* Segurança
* Confiabilidade
* Tecnologia
* Sofisticação
* Clareza operacional
* Visual premium e minimalista

Utilize uma estética **dark mode como padrão**, inspirada diretamente nas referências anexadas.

Características visuais desejadas:

* Fundo predominantemente preto ou quase preto
* Superfícies em tons de preto/cinza muito escuro
* Azul elétrico/cobalto como cor primária e de destaque
* Azul utilizado para ações principais, links, estados ativos e elementos de destaque
* Pequenos detalhes em amarelo/âmbar para alertas e situações de atenção
* Texto principal em branco
* Texto secundário em cinza
* Bordas discretas em cinza escuro
* Cards com cantos arredondados
* Sombras extremamente sutis
* Alto contraste
* Espaçamento generoso
* Tipografia moderna, limpa e corporativa
* Ícones minimalistas, preferencialmente estilo outline
* Evitar excesso de elementos decorativos
* Evitar gradientes excessivos
* Evitar aparência de dashboard genérico de template

A interface deve parecer um **produto financeiro enterprise premium**, e não um site comercial.

## 2. Criar um Design System

Antes das telas, crie uma estrutura de Design System contendo:

### Cores

Defina tokens para:

* Background principal
* Background secundário
* Surface / Cards
* Surface hover
* Border
* Texto primário
* Texto secundário
* Texto desabilitado
* Azul primário
* Azul hover
* Azul ativo
* Verde para sucesso
* Amarelo/âmbar para atenção
* Vermelho para erro/exclusão
* Estados informativos

### Tipografia

Defina:

* Display
* H1
* H2
* H3
* Body
* Small
* Caption
* Labels
* Números/KPIs

A tipografia deve seguir uma hierarquia semelhante à das imagens de referência.

### Componentes

Criar componentes reutilizáveis para:

* Buttons
* Secondary buttons
* Ghost buttons
* Inputs
* Password inputs
* Search inputs
* Selects
* Dropdowns
* Checkboxes
* Radio buttons
* Toggles
* Badges
* Status indicators
* Cards
* KPI cards
* Tables
* Pagination
* Tabs
* Breadcrumbs
* Modals
* Confirmation dialogs
* Toasts
* Alerts
* Tooltips
* Navigation sidebar
* Top navigation
* User profile menu
* Empty states
* Loading states
* Error states

Todos os componentes devem possuir estados de:

* Default
* Hover
* Focus
* Active
* Disabled
* Error
* Success, quando aplicável

## 3. Estrutura geral da aplicação

Após o login, a aplicação deve utilizar um **layout administrativo padrão**, composto por:

### Sidebar lateral

Sidebar fixa no lado esquerdo contendo:

**Asset Sirius**

Menu:

* Dashboard 1
* Dashboard 2
* Funcionários
* Perfis

Na parte inferior da sidebar:

* Usuário logado
* Nome do usuário
* Perfil atual
* Menu para configurações/conta
* Botão de logout

O item selecionado deve possuir destaque visual utilizando o azul primário.

A sidebar deve ser elegante e compacta, seguindo o mesmo nível de acabamento das imagens de referência.

### Topbar

Criar uma barra superior contendo:

* Breadcrumb
* Título da página
* Área para ações específicas da página
* Indicador do usuário logado
* Avatar
* Menu do usuário

## 4. Tela de Login

Criar uma tela de login corporativa.

A tela deve conter:

* Logo/nome Asset Sirius
* Título "Acesse sua conta"
* Texto curto explicando o acesso
* Campo "E-mail"
* Campo "Senha"
* Botão principal "Entrar"
* Indicador visual de carregamento durante autenticação

Não utilizar link de "Esqueci minha senha".

No lugar dele, apresentar uma informação discreta:

"Problemas para acessar? Entre em contato com o suporte: [suporte@assetsirius.com.br](mailto:suporte@assetsirius.com.br)"

O e-mail deve ter aparência de informação de suporte, e não de ação principal.

Criar também estados de:

* Login padrão
* Campo com erro
* Credenciais inválidas
* Loading
* Login bloqueado
* Erro de conexão

A tela deve manter o visual dark premium das referências, com uma composição centralizada e bastante espaço negativo.

## 5. Dashboard 1

Criar uma página de dashboard destinada à visualização de indicadores.

IMPORTANTE:

Os indicadores e gráficos reais serão posteriormente integrados utilizando **Grafana**.

Portanto, **não criar gráficos complexos ou dados fictícios detalhados**.

Criar apenas a estrutura visual e áreas reservadas para os painéis do Grafana.

A página deve possuir:

* Título
* Descrição curta
* Filtros de período
* Filtros relevantes
* Cards de KPI no topo
* Grandes áreas reservadas para gráficos Grafana
* Cards para indicadores adicionais
* Área para tabelas, caso necessário

Os placeholders do Grafana devem parecer parte natural da interface, utilizando:

"Grafana Panel"

ou

"Área reservada para indicador"

Não inventar dados reais.

Organizar os espaços de maneira modular, permitindo que diferentes gráficos sejam posteriormente incorporados.

## 6. Dashboard 2

Criar uma segunda página de dashboard seguindo exatamente o mesmo Design System.

Ela deve possuir uma organização diferente da primeira, mas manter:

* Mesmo sidebar
* Mesma topbar
* Mesmas cores
* Mesma tipografia
* Mesmos componentes
* Mesmos espaçamentos
* Mesmos padrões de cards

Novamente, os gráficos serão posteriormente integrados pelo Grafana.

Criar apenas placeholders estruturais para os painéis.

## 7. Gerenciamento de Funcionários

Criar uma página completa para gerenciamento de funcionários.

A página deve conter:

Título:

"Funcionários"

Descrição:

"Gerencie os usuários com acesso à plataforma."

Área superior com:

* Campo de pesquisa
* Filtro por perfil
* Filtro por status
* Botão "Novo funcionário"

Tabela contendo:

* Nome
* E-mail
* Perfil
* Status
* Data de cadastro
* Último acesso
* Ações

A coluna de ações deve permitir:

* Visualizar
* Editar
* Excluir

Utilizar menus de ação discretos para não poluir a tabela.

Criar também o fluxo de cadastro de funcionário.

### Modal/página de cadastro

Campos:

* Nome completo
* E-mail
* Perfil
* Status

Botões:

* Cancelar
* Cadastrar funcionário

Criar também o estado de edição.

### Exclusão

Ao excluir um funcionário, apresentar um modal de confirmação:

"Excluir funcionário?"

"Esta ação removerá o acesso deste funcionário à plataforma."

Botões:

* Cancelar
* Excluir funcionário

A ação destrutiva deve utilizar a cor de erro/vermelho apenas nos elementos necessários.

## 8. Gerenciamento de Perfis

Criar uma página específica para gerenciamento de perfis e permissões.

Título:

"Perfis"

Descrição:

"Gerencie os níveis de acesso e permissões da plataforma."

Mostrar uma tabela/lista contendo:

* Nome do perfil
* Descrição
* Número de usuários
* Status
* Última atualização
* Ações

Ações:

* Visualizar
* Editar
* Excluir

Adicionar botão:

"Novo perfil"

## 9. Criação e edição de perfil

Criar uma interface para criação/edição de perfil.

Campos:

* Nome do perfil
* Descrição
* Status

Depois, criar uma seção:

"Permissões de acesso"

Apresentar uma matriz de permissões organizada por módulo.

Exemplo:

Dashboard 1

* Visualizar

Dashboard 2

* Visualizar

Funcionários

* Visualizar
* Criar
* Editar
* Excluir

Perfis

* Visualizar
* Criar
* Editar
* Excluir

Utilizar switches ou checkboxes para controlar as permissões.

A interface deve deixar extremamente claro quais permissões estão habilitadas.

Adicionar:

* Cancelar
* Salvar perfil

## 10. Controle de acesso

O Design System deve considerar que diferentes usuários possuem diferentes perfis.

Exemplo:

Um usuário com perfil "Administrador" pode acessar todas as páginas.

Um usuário com perfil "Analista" pode acessar apenas os dashboards.

Um usuário sem permissão para determinada página não deve visualizar aquela opção na sidebar.

Também criar um estado de:

"Você não possui permissão para acessar esta página."

Essa tela deve seguir o mesmo Design System.

## 11. Responsividade

Criar o sistema pensando principalmente em **desktop corporativo**, mas preparar os componentes para responsividade.

Breakpoints:

* Desktop
* Tablet
* Mobile

No mobile:

* Sidebar deve transformar-se em menu lateral recolhível
* Tabelas devem possuir comportamento responsivo
* Cards devem se reorganizar verticalmente
* Dashboards devem manter áreas adequadas para os painéis Grafana

## 12. UX e consistência

Priorizar:

* Hierarquia visual clara
* Poucos elementos por tela
* Espaçamento consistente
* Feedback visual para todas as ações
* Estados de loading
* Estados vazios
* Estados de erro
* Confirmações para ações destrutivas
* Feedback de sucesso após operações
* Navegação intuitiva

Não criar elementos desnecessários.

Não utilizar excesso de cores.

Não utilizar ilustrações genéricas de SaaS.

Não utilizar aparência de template de administração genérico.

## 13. Resultado esperado no Figma

Organizar o arquivo de forma profissional:

1. Design System
2. Foundations / Tokens
3. Components
4. Login
5. Dashboard 1
6. Dashboard 2
7. Funcionários
8. Cadastro/Edição de Funcionário
9. Perfis
10. Cadastro/Edição de Perfil
11. Estados e Modais
12. Controle de acesso

Utilizar Auto Layout, componentes reutilizáveis e variantes sempre que possível.

O resultado deve parecer um **sistema corporativo financeiro real, premium e pronto para desenvolvimento**, mantendo a identidade visual das imagens de referência do Asset Sirius.

A referência visual principal deve ser sempre as imagens anexadas: **dark, premium, financeira, minimalista, tecnológica, com azul elétrico como cor de destaque e alto nível de acabamento visual.**
