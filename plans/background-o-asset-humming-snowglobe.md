# Context

Two UX refinements to the Asset Sirius shell:

1. **Top-bar declutter** — user account info (name, profile, avatar pill, dropdown) currently appears in both the top bar and the sidebar. The user wants it removed from the top bar and kept only in the sidebar.
2. **Settings page** — the gear icon next to the user's name in the sidebar currently opens a stub dropdown. Clicking it (or "Configurações da conta") should navigate to a dedicated read-only profile/settings page showing the user's registered info plus a logout button. Editing is only available via the Employees CRUD (which requires `canManage`).

---

## Files to change

| File | What changes |
|---|---|
| `src/App.tsx` | Extend `Route` type to include `"settings"`; pass `onOpenSettings` to `AppShell`; render `<Settings>` page for that route |
| `src/components/AppShell.tsx` | Remove the user-menu pill from the top bar; wire the sidebar gear icon to call `onOpenSettings` instead of opening a dropdown |
| `src/pages/Settings.tsx` | **New file** — read-only profile card + logout button |

---

## Detailed steps

### 1. `src/App.tsx`

- Add `"settings"` to the `Route` union type (or a local alias — the key point is it's not in `ModuleKey` so it doesn't appear in the sidebar nav and doesn't need an `allowed` check).
- In `resolveSession` the settings route is implicitly accessible to everyone (no permission guard needed).
- Pass `onOpenSettings={() => setRoute("settings")}` to `<AppShell>`.
- In the page-render switch add `case "settings": return <Settings user={session} canManage={session.canManage} onLogout={onLogout} onNavigate={setRoute} />`.

### 2. `src/components/AppShell.tsx`

**Top bar** (`<header>`, lines ~169–197):  
- Remove the `<Menu>` user-pill entirely. The header can keep only the logo/hamburger on mobile and any page-title or breadcrumb it already shows.

**Sidebar user card** (lines ~95–128):  
- Replace the `<Menu>` wrapper with a plain button layout:
  - Left: `<Avatar>` + name + profile (same as current trigger, no dropdown).
  - Right: `<Settings size={15}>` gear icon as a separate `<button>` that calls `onOpenSettings()`.
- Remove the three-item dropdown (`Configurações da conta`, `Segurança`, `Sair`) from this section — the full logout action moves to the Settings page.

Props change: add `onOpenSettings: () => void` to `AppShellProps`.

### 3. `src/pages/Settings.tsx` (new)

**Layout**: centered card (max-w-lg), consistent with the existing dark-premium design tokens from `src/index.css`.

**Content**:
- Page heading: "Minha conta" (with a back arrow that calls `onNavigate("dashboard1")` or the previous route).
- Avatar circle (initials, large — 64 px).
- Info rows (read-only): Nome completo, E-mail, Perfil de acesso.
- If `canManage` is true: a subtle link/button "Editar via Gestão de Funcionários" that calls `onNavigate("employees")`.
- Danger zone card at the bottom: "Sair da conta" button that calls `onLogout`.

**Props**:
```ts
type SettingsProps = {
  user: { name: string; email: string; profile: string };
  canManage: boolean;
  onLogout: () => void;
  onNavigate: (route: Route) => void;
};
```

---

## Aesthetic notes

- Use existing CSS tokens (`--color-cobalt`, `--color-amber`, `--color-surface-*`, Inter font) — no new design tokens needed.
- Info rows: label in muted text, value in foreground — same pattern as existing profile cards.
- Logout button: amber/danger style consistent with existing "Sair" menu items.

---

## Verification

1. Log in as `analista@assetsirius.com.br` → top bar should show no user info; sidebar shows name+profile with gear icon; clicking gear navigates to Settings page with read-only info; no "Editar" link visible; "Sair" logs out.
2. Log in as any other email (Admin) → same flow, but Settings page shows the "Editar via Gestão de Funcionários" link; clicking it navigates to Employees page.
3. Top bar no longer contains any avatar, name, profile, or user dropdown.
