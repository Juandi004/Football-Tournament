import { NavLink, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/AuthStore"

export default function SideBar() {
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  const handleLogOut = async () => {
    try {
      await logout()
      navigate("/")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-md px-3 py-2 transition-colors text-sm font-medium focus:outline-none ${
      isActive
        ? "bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-slate-50"
        : "text-slate-800 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-neutral-800"
    }`

  return (
    <aside className="bg-white dark:bg-neutral-900 border-r border-slate-300 dark:border-neutral-700 w-full h-full fixed top-0 left-0 max-w-[264px] py-6 px-4 overflow-auto flex flex-col justify-between">
      <div>
        <div className="min-w-9 mb-8 px-3">
          <img src="https://readymadeui.com/logo-alt.svg" alt="Company logo" className="h-9 w-auto" />
        </div>

        <nav aria-label="Primary sidebar navigation">
          <p className="text-black dark:text-slate-50 text-sm font-semibold px-3">Menú Principal</p>
          <ul className="mt-2 space-y-1">
            <li><NavLink to="/home" end className={linkClass}>Inicio</NavLink></li>
            <li><NavLink to="/teams" className={linkClass}>Equipos</NavLink></li>
            <li><NavLink to="/matches" className={linkClass}>Partidos</NavLink></li>
          </ul>
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-neutral-800">
        <button 
          onClick={handleLogOut}
          className="w-full py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  )
}