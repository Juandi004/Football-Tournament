import { useApi } from '../hooks/useApi'

interface Team {
  id: string
  name: string
  players: Player[]
}

interface Player {
    id: string
    name: string
    team: Team
}

const Teams = () => {
  const { data, loading, error } = useApi<Team[]>('team')

  if (loading) return (
    <div className="flex items-center justify-center h-full w-full">
      <p className="text-slate-400 animate-pulse">Cargando equipos...</p>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center h-full w-full">
      <p className="text-red-400">Error: {error}</p>
    </div>
  )

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold text-white mb-6">Equipos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map(team => (
          <div
            key={team.id}
            className="flex flex-col justify-between p-6 bg-slate-900/60 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/50 group"

          >
            <h2 className="text-4xl md:text-xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-skyblue-500 to-teal-500 bg-clip-text text-transparent">
              {team.name}</h2>
            <span className="inline-block mt-3 text-xs text-slate-500">
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Teams