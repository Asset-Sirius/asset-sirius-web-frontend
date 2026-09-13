import { useMemo, useState } from "react"
import { AppShell, type CurrentUser, type Route } from "./components/AppShell"
import { ToastProvider } from "./components/ui"
import { Login } from "./pages/Login"
import { Dashboard1 } from "./pages/Dashboard1"
import { Dashboard2 } from "./pages/Dashboard2"
import { Employees } from "./pages/Employees"
import { Profiles } from "./pages/Profiles"
import { NoAccess } from "./pages/NoAccess"
import { Settings } from "./pages/Settings"
import type { ModuleKey } from "./data"

type Session = {
  user: CurrentUser
  allowed: Route[]
  canManage: boolean
}

/** Resolve a demo session from the login e-mail. */
function resolveSession(email: string): Session {
  const isAnalyst = email.toLowerCase().includes("analista")
  if (isAnalyst) {
    return {
      user: { name: "Ricardo Monteiro", profile: "Analista", email },
      allowed: ["dashboard1", "dashboard2"],
      canManage: false,
    }
  }
  return {
    user: { name: "Camila Andrade", profile: "Administrador", email },
    allowed: ["dashboard1", "dashboard2", "employees", "profiles"],
    canManage: true,
  }
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [route, setRoute] = useState<Route>("dashboard1")

  const authorized = useMemo(
    () => (session ? route === "settings" || session.allowed.includes(route as ModuleKey) : false),
    [session, route],
  )

  if (!session) {
    return (
      <ToastProvider>
        <Login
          onSuccess={(email) => {
            const s = resolveSession(email)
            setSession(s)
            setRoute(s.allowed[0])
          }}
        />
      </ToastProvider>
    )
  }

  function navigate(r: Route) {
    setRoute(r)
  }

  return (
    <ToastProvider>
      <AppShell
        route={route}
        onNavigate={navigate}
        allowed={session.allowed}
        user={session.user}
        onLogout={() => setSession(null)}
        onOpenSettings={() => setRoute("settings")}
      >
        {!authorized ? (
          <NoAccess onBack={() => setRoute(session.allowed[0])} />
        ) : route === "settings" ? (
          <Settings
            user={session.user}
            canManage={session.canManage}
            onLogout={() => setSession(null)}
            onNavigate={navigate}
          />
        ) : route === "dashboard1" ? (
          <Dashboard1 />
        ) : route === "dashboard2" ? (
          <Dashboard2 />
        ) : route === "employees" ? (
          <Employees canWrite={session.canManage} />
        ) : (
          <Profiles canWrite={session.canManage} />
        )}
      </AppShell>
    </ToastProvider>
  )
}
