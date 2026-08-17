import React, { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { useMethods } from '../hooks/useMethods'

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
  // Estado para crear
  const [teamName, setTeamName] = useState('');

  // 1. Estados para saber qué equipo estamos editando en pantalla
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  // búsqueda
  const [searchTerm, setSearchTerm]=useState("");

  const { handleCreate, handleDelete, handleEdit, loading: isCreating, error: createError } = useMethods<Team>('team')
  const { data, loading, error } = useApi<Team[]>('team')

  // Crear
  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamName.trim()) return

    await handleCreate({ name: teamName })
    setTeamName('')
  }

  const filteredTeams = data?.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Borrar
  const onDelete = async (id: string) => {
    await handleDelete('team/' + id)
  }

  // 2. Función para ACTIVAR el modo edición en una tarjeta
  const startEditing = (team: Team) => {
    setEditingId(team.id)
    setEditingName(team.name) // Llenamos el input con el nombre actual
  }

  // 3. Función para GUARDAR los cambios en la API
  const onSaveEdit = async (id: string) => {
    if (!editingName.trim()) return

    // Llamamos al handleEdit del hook
    await handleEdit({ name: editingName }, 'team/' + id)

    // Salimos del modo edición limpiando el ID
    setEditingId(null)
    setEditingName('')
  }

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
    <div className="p-6 w-full max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Crear equipo</h1>

      {/* FORMULARIO DE CREAR */}
      <form onSubmit={onCreate} className="mb-8 flex gap-3 max-w-md">
        <input 
          value={teamName} 
          onChange={(e) => setTeamName(e.target.value)} 
          placeholder="Nombre del equipo"
          className="flex-1 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
        <button 
          type="submit" 
          disabled={isCreating}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-medium rounded-xl transition-colors"
        >
          {isCreating ? 'Guardando...' : 'Crear'}
        </button>
      </form>

    <div className='flex flex-row gap-6'>
      <h1 className="text-2xl font-bold text-white mb-6">Buscar Equipo</h1>
      <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} type="text" name="teamSearch" placeholder='Buscar Equipo' className='bg-slate-900 text-white border-slate-800 rounded-xl placeholder-slate-500'/>
    </div>

      {createError && <p className="text-red-400 text-sm mb-4">Error: {createError}</p>}

      <h1 className="text-2xl font-bold text-white mb-6">Equipos</h1>

      {/* LISTA DE EQUIPOS */}
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeams && filteredTeams.length > 0 ? (
          // 🟢 OPCIÓN A: Si hay equipos, hace el .map()
          filteredTeams.map(team => {
            const isEditingThis = editingId === team.id

            return (
              <div
                key={team.id}
                className="flex flex-col justify-between p-6 bg-slate-900/60 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50"
              >
                {isEditingThis ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => onSaveEdit(team.id)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-500 text-xs font-semibold text-white rounded-lg transition-colors"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-xs text-slate-300 rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <h2 className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-sky-400 to-teal-400 bg-clip-text text-transparent">
                    {team.name}
                  </h2>
                )}

                {!isEditingThis && (
                  <div className="flex gap-3 mt-4 pt-4 border-t border-slate-800/60">
                    <button
                      onClick={() => startEditing(team)}
                      className="text-xs text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                    >
                      Editar equipo
                    </button>
                    <button
                      onClick={() => onDelete(team.id)}
                      className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
                    >
                      Eliminar equipo
                    </button>
                  </div>
                )}
              </div>
            )
          })
        ) : (
          // 🔴 OPCIÓN B: Si no hay coincidencias en la búsqueda
          <p className="text-slate-400 text-center col-span-full py-8">
            No se encontraron equipos
          </p>
        )}
      </div>
    </div>
  )
}

export default Teams