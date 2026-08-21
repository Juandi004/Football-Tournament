import React, { type FC } from 'react'
import SideBar from '../SideBar'
import { useAuthStore } from '../../store/AuthStore'

interface LayoutProps {
  children: React.ReactNode
}

export const MainLayout: FC<LayoutProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <div className="flex w-screen h-screen bg-neutral-950 text-white">
      {isAuthenticated && <SideBar />}
      <main className={`flex-1 overflow-auto ${isAuthenticated ? 'ml-[264px]' : ''}`}>
        {children}
      </main>
    </div>
  )
}