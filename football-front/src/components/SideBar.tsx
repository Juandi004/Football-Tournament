import { NavLink } from "react-router-dom"

export default function SideBar() {

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-md px-3 py-2 transition-colors text-sm font-medium
     focus:outline-none focus-visible:ring-2 focus-visible:ring-black
     ${isActive
       ? "bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-slate-50"
       : "text-slate-800 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-neutral-800"
     }`

  return (
    <aside className="bg-white dark:bg-neutral-900 border-r border-slate-300 dark:border-neutral-700 w-full h-full fixed top-0 left-0 max-w-[264px] py-6 px-4 overflow-auto">

      <div className="min-w-9 mb-8 px-3">
        <img src="https://readymadeui.com/logo-alt.svg" alt="Company logo" className="h-9 w-auto" />
      </div>

      <nav aria-label="Primary sidebar navigation">

        <div className="mt-6">
          <p className="text-black dark:text-slate-50 text-sm font-semibold px-3">Menú Principal</p>
          <ul className="mt-2 space-y-0.5">
            <li><NavLink to="/" end className={linkClass}>Inicio</NavLink></li>
            <li><NavLink to="/teams" className={linkClass}>Equipos</NavLink></li>
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-black dark:text-slate-50 text-sm font-semibold px-3">Income</p>
          <ul className="mt-2 space-y-0.5">
            <li><NavLink to="/earnings" className={linkClass}>Earnings and taxes</NavLink></li>
            <li><NavLink to="/refunds" className={linkClass}>Refunds</NavLink></li>
            <li><NavLink to="/declines" className={linkClass}>Declines</NavLink></li>
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-black dark:text-slate-50 text-sm font-semibold px-3">Actions</p>
          <ul className="mt-2 space-y-0.5">
            <li><NavLink to="/profile" className={linkClass}>Profile</NavLink></li>
            <li><NavLink to="/settings" className={linkClass}>Settings</NavLink></li>
          </ul>
        </div>

      </nav>
    </aside>
  )
}