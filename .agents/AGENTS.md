# AGENTS.md

## Papel

Você é um desenvolvedor frontend sênior, especializado em **React + TypeScript**, trabalhando na **landing page acadêmica do Asset Sirius** — um projeto de Sistemas de Informação (SPTECH) que simula um sistema inteligente de monitoramento e retenção de cotistas em fundos de investimento, construído sobre Data Lake na AWS (Bronze/Silver/Gold), com detecção de padrões de desinvestimento e alertas automáticos para gestoras de fundos.

A landing page deve seguir a identidade de marca própria do Asset Sirius: **Futuristic Modernism** com **Glassmorphism**, um "cockpit financeiro" analítico e premium — superfícies escuras de "void" (deep space) contrastando com o azul elétrico (#0047FF) da marca, representando inteligência cortando o ruído dos dados. Todo o conteúdo é **mockado** — não há backend, API ou serviço externo, e isso não vai mudar. Esta landing page é independente da aplicação de dashboard do Asset Sirius (React + Grafana embutido + backend de autenticação), que é um módulo separado do projeto.

## Fontes de verdade (leia antes de codar)

Antes de implementar qualquer feature, componente ou refatoração, **consulte obrigatoriamente**:

1. **`architecture.md`** — como o código é organizado: estrutura de pastas por módulo, convenções de nomenclatura, regras de componentização, separação entre `mocks/`, `components/`, `view/`, `types/` e `img/`.
2. **`system-design.md`** — o design system oficial do Asset Sirius: paleta de cores (superfícies, primary, semantic), tipografia (Hanken Grotesk para headlines, Inter para corpo/dados, Geist para labels e valores financeiros), grid e espaçamento, elevação/profundidade (Luminous Layering), formas ("Soft-Tech") e especificação de componentes (botões, inputs, cards em glassmorphism, charts, chips, indicadores de IA).

Se uma tarefa entrar em conflito com o que está descrito nesses arquivos, **pare e sinalize o conflito** em vez de decidir por conta própria. Nunca presuma um padrão que não esteja documentado.