import { Pages } from "../types/page"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="min-h-screen bg-dark text-slate-100 p-6 flex flex-col items-start select-none">  
      <header className="my-12 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-skyblue-500 to-teal-500 bg-clip-text text-transparent">
          Gestión de Fútbol Base
        </h1>
        <p className="text-slate-400 mt-3 text-lg font-medium">
          Panel de administración de partidos, torneos y plantillas de jugadores.
        </p>
      </header>
      <main className="w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Pages.map((p) => (
            <div 
              key={p.url}
              className="flex flex-col justify-between p-6 bg-slate-900/60 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/50 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-slate-200 group-hover:text-blue-400 transition-colors duration-200">
                    {p.name}
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-400 rounded-full border border-slate-700">
                    Módulo
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                  Administra, edita y organiza toda la información relacionada con la sección de {p.name.toLowerCase()}.
                </p>
              </div>
              <Link 
                to={p.url}
                className="inline-flex items-center justify-center w-full px-5 py-3.5 font-bold text-sm text-center text-slate-950 bg-gradient-to-r from-blue-400 to-emerald-500 rounded-xl shadow-lg shadow-emerald-950/20 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                Ingresar al panel
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home