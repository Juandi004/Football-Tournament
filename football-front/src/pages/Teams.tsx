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
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-5 hover:border-neutral-500 transition-colors"
          >
            <h2 className="text-white font-semibold text-lg">{team.name}</h2>
            <span className="inline-block mt-3 text-xs text-slate-500">
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Teams