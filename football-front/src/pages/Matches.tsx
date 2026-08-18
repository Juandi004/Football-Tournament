import { useApi } from "@/hooks/useApi"
import type { Status } from "@/types/status"
import Team  from "./Teams"

interface Match {
    id: string,
    homeTeam: typeof Team,
    awayTeam: typeof Team,
    homeScore: number,
    awayScore: number,
    status: Status,
    matchDate: Date
}

export const Matches =()=>{

    const {data, loading, error } = useApi<Match[]>('match')
   /*  const { handleCreate, handleDelete, handleEdit, loading: isCreating, error: createError } = useMethods<Match>('match') */

    if (loading) return (
    <div className="flex items-center justify-center h-full w-full">
      <p className="text-slate-400 animate-pulse">Cargando ...</p>
    </div>
  )

    if (error) return (
    <div className="flex items-center justify-center h-full w-full">
      <p className="text-red-400">Error: {error}</p>
    </div>
  )
    
    return(
        // Lista de Partidos
        <div className="p-3 w-full max-w-screen mx-auto">
            <div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {data?.map((m) => (
            <div 
              key={m.id}
              className="flex flex-col justify-between p-6 bg-slate-900/60 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/50 group"
            >
              <div>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-400 border border-slate-700 ">
                    {m.matchDate.toString()}
                  </span>
                </div>
                <p className="text-white text-sm mb-8 leading-relaxed text-center text-l">
                  <strong>{m.homeTeam.name}</strong> vs <strong>{m.awayTeam.name}</strong> 
                </p>
              </div>
            </div>
          ))}
        </div>
            </div>
        </div>
    )
}