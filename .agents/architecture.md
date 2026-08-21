# Architecture.md

## Visão Geral

Este projeto é uma aplicação **React + TypeScript** front-end, **sem qualquer integração com backend ou serviços externos**. Todos os dados exibidos nas páginas são **mockados** (textos, listas, configurações etc.), simulando o conteúdo real e não teremos nenhuma implementação futura de uma API.

A organização do código segue os princípios de:

- **Componentização** — toda a UI é construída a partir de componentes pequenos e reutilizáveis.
- **Reutilização** — componentes genéricos podem ser compartilhados entre módulos.
- **Modularização por funcionalidade de negócio** — cada "módulo" representa uma área/funcionalidade da aplicação (ex: `home-page`, `vitrine`), e concentra tudo que pertence a ela.
- **Tipagem estática** — todo o código é escrito em TypeScript, com props tipadas e isoladas em arquivos próprios.
- **Estilização isolada** — cada componente e view possui seu próprio arquivo `.css`, evitando estilos globais soltos.

> **Observação (assunção):** os exemplos abaixo consideram os módulos dentro de `src/modules/`. Se preferir outro caminho raiz (ex: `src/pages/`), é só ajustar — o padrão interno de cada módulo permanece o mesmo.

---

## Estrutura de Pastas

```
src/
  modules/
    home-page/
      mocks/
      components/
      view/
      types/
      img/
    vitrine/
      mocks/
      components/
      view/
      types/
      img/
  shared/
    components/
    types/
    img/
```

### Descrição das pastas por módulo

| Pasta         | Responsabilidade                                                                 |
|---------------|-----------------------------------------------------------------------------------|
| `mocks/`      | Arquivos JSON com os textos/dados estáticos que alimentam a página (conteúdo simulado). |
| `components/` | Componentes que compõem a página — blocos de UI específicos do módulo. Cada componente possui seu arquivo `.tsx` acompanhado de um `.css` de mesmo nome. |
| `view/`       | Página principal do módulo, responsável por montar o layout final combinando os componentes. Também possui seu próprio arquivo `.css` de layout. |
| `types/`      | Arquivos de tipagem (`.types.ts`) com as interfaces/types de props de cada componente e da view. |
| `img/`        | Imagens e vídeos utilizados exclusivamente por aquele módulo.                     |

### Pasta `shared/` (compartilhada entre módulos)

Quando um componente passa a ser usado por **mais de um módulo**, ele deve ser promovido para `src/shared/components/` (com sua respectiva tipagem em `src/shared/types/`), evitando duplicação de código. O mesmo vale para imagens genéricas (ícones, logos) em `src/shared/img/`.

---

## Estrutura de Código

### Componentes como funções com `return`

Todos os componentes (tanto os de `components/` quanto os de `view/`) devem ser escritos como **funções nomeadas** que retornam o JSX explicitamente via `return`. As tipagens de props **não ficam dentro do arquivo do componente** — cada componente/view possui seu arquivo de tipagem correspondente em `types/`, mantendo o arquivo `.tsx` focado apenas na lógica de renderização. A estilização também fica separada, em um arquivo `.css` de mesmo nome, importado diretamente no componente.

```ts
// types/BannerVitrine.types.ts

export type BannerVitrineProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
};
```

```css
/* components/BannerVitrine.css */

.banner-vitrine {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.banner-vitrine img {
  width: 100%;
  border-radius: 8px;
}
```

```tsx
// components/BannerVitrine.tsx

import { BannerVitrineProps } from '../types/BannerVitrine.types';
import './BannerVitrine.css';

function BannerVitrine({ title, subtitle, imageUrl }: BannerVitrineProps) {
  return (
    <section className="banner-vitrine">
      <img src={imageUrl} alt={title} />
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
}

export default BannerVitrine;
```

### Passagem de dados via Props

A `view/` é responsável por **ler o mock** e repassar os dados para os componentes via **props**. Os componentes não acessam os mocks diretamente — isso mantém a camada de dados isolada da camada de apresentação. A `view/` também possui sua própria tipagem, geralmente para tipar o formato do mock que ela consome.

```ts
// types/VitrineView.types.ts

export type VitrineMock = {
  banner: {
    title: string;
    subtitle: string;
    imageUrl: string;
  };
};
```

```css
/* view/VitrineView.css */

.vitrine-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
```

```tsx
// view/VitrineView.tsx

import BannerVitrine from '../components/BannerVitrine';
import vitrineMock from '../mocks/vitrine.mock.json';
import { VitrineMock } from '../types/VitrineView.types';
import './VitrineView.css';

const mock: VitrineMock = vitrineMock;

function VitrineView() {
  return (
    <main className="vitrine-view">
      <BannerVitrine
        title={mock.banner.title}
        subtitle={mock.banner.subtitle}
        imageUrl={mock.banner.imageUrl}
      />
    </main>
  );
}

export default VitrineView;
```

### Estrutura de um mock

```json
// mocks/vitrine.mock.json
{
  "banner": {
    "title": "Confira nossas novidades",
    "subtitle": "Ofertas especiais desta semana",
    "imageUrl": "/img/banner-vitrine.png"
  }
}
```

---

## Convenções de Nomenclatura

| Item                | Convenção            | Exemplo                          |
|---------------------|-----------------------|-----------------------------------|
| Pasta de módulo      | `kebab-case`           | `home-page/`, `vitrine/`         |
| Arquivo de componente| `PascalCase.tsx`       | `BannerVitrine.tsx`              |
| Função de componente | `PascalCase`           | `function BannerVitrine() {}`    |
| Arquivo de view      | `PascalCase` + `View`  | `VitrineView.tsx`                |
| Arquivo de mock      | `kebab-case.mock.json` | `vitrine.mock.json`              |
| Arquivo de tipagem   | `PascalCase.types.ts`  | `BannerVitrine.types.ts`, `VitrineView.types.ts` |
| Arquivo de estilo    | `PascalCase.css`       | `BannerVitrine.css`, `VitrineView.css`           |
| Tipagem de props     | `NomeDoComponenteProps`| `BannerVitrineProps`             |

---

## Regras Gerais

1. Cada módulo é **autocontido**: não deve importar `components/` ou `mocks/` de outro módulo diretamente.
2. Um componente só sobe para `shared/` quando **realmente reutilizado** por 2+ módulos — evitar abstração prematura.
3. Toda comunicação entre `view/` e `components/` acontece **exclusivamente via props** — sem contexto global, sem chamadas de API, sem estado compartilhado externo.
4. Os mocks representam a única fonte de dados da aplicação — nenhuma chamada HTTP deve existir no projeto.
5. Vídeos e imagens ficam versionados dentro da pasta `img/` do próprio módulo, salvo quando reutilizados (→ `shared/img/`).
6. Nenhum `type`/`interface` de props deve ser declarado dentro do arquivo `.tsx` do componente ou da view — toda tipagem vive em `types/`, em um arquivo `.types.ts` próprio, e é importada onde for necessária.
7. Cada componente possui **um único arquivo de tipagem correspondente** (ex: `BannerVitrine.tsx` → `BannerVitrine.types.ts`), evitando arquivos de tipagem genéricos com múltiplas responsabilidades.
8. Cada componente e cada view possui **um único arquivo `.css` correspondente** (ex: `BannerVitrine.tsx` → `BannerVitrine.css`), importado diretamente no topo do arquivo `.tsx`.
9. A classe raiz do `.css` deve seguir o mesmo nome do componente em `kebab-case` (ex: `BannerVitrine` → `.banner-vitrine`), evitando conflito de estilos entre componentes.
10. Não há arquivos de estilo globais/compartilhados fora dos módulos — se um estilo precisar ser reaproveitado, o componente inteiro deve ser promovido para `shared/`, levando seu `.css` junto.

---

## Exemplo completo de um módulo

```
modules/
  vitrine/
    mocks/
      vitrine.mock.json
    components/
      BannerVitrine.tsx
      BannerVitrine.css
      CardProduto.tsx
      CardProduto.css
      ListaProdutos.tsx
      ListaProdutos.css
    view/
      VitrineView.tsx
      VitrineView.css
    types/
      BannerVitrine.types.ts
      CardProduto.types.ts
      ListaProdutos.types.ts
      VitrineView.types.ts
    img/
      banner-vitrine.png
      logo-vitrine.svg
```
