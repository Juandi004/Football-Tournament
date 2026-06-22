export default function SideBar() {
  return (
    <aside
    className="bg-white dark:bg-neutral-900 border-r border-slate-300 dark:border-neutral-700 w-full h-full fixed top-0 left-0 max-w-[264px] py-6 px-4 overflow-auto">

    <div className="min-w-9 mb-8 px-3">
        <img src="https://readymadeui.com/logo-alt.svg" alt="Company logo" className="h-9 w-auto" />
    </div>

    <nav aria-label="Primary sidebar navigation">
        <ul className="space-y-1">
            <li>
                <a href="#" aria-current="page"
                className="text-sm text-slate-800 dark:text-slate-400 font-medium block hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black0">
                Dashboard
                </a>
            </li>
        </ul>

        <div className="mt-6">
            <div className="text-black dark:text-slate-50 text-sm font-semibold px-3">Information</div>
            <ul className="mt-2 space-y-0.5 text-sm text-slate-800 dark:text-slate-400 font-medium">
                <li>
                <a href="#"
                    className="block hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black0">
                    Audience
                </a>
                </li>
                <li>
                <a href="#"
                    className="block hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black0">
                    Posts
                </a>
                </li>
                <li>
                <a href="#"
                    className="block hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black0">
                    Schedules
                </a>
                </li>
            </ul>
        </div>

        <div className="mt-6">
            <div className="text-black dark:text-slate-50 text-sm font-semibold px-3">Income</div>
            <ul className="mt-2 space-y-0.5 text-sm text-slate-800 dark:text-slate-400 font-medium">
                <li>
                <a href="#"
                    className="block hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black0">
                    Earnings and taxes
                </a>
                </li>
                <li>
                <a href="#"
                    className="block hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black0">
                    Refunds
                </a>
                </li>
                <li>
                <a href="#"
                    className="block hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black0">
                    Declines
                </a>
                </li>
            </ul>
        </div>

        <div className="mt-6">
            <div className="text-black dark:text-slate-50 text-sm font-semibold px-3">Actions</div>
            <ul className="mt-2 space-y-0.5 text-sm text-slate-800 dark:text-slate-400 font-medium">
                <li>
                <a href="#"
                    className="block hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black0">
                    Profile
                </a>
                </li>
                <li>
                <a href="#"
                    className="block hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black0">
                    Settings
                </a>
                </li>
            </ul>
        </div>
    </nav>
    </aside>
 )
}
