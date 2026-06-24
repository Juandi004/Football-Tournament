import React, { type FC } from 'react'
import SideBar from '../SideBar'

interface LayoutProps {
  children: React.ReactNode
}

export const MainLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex w-screen h-screen bg-neutral-950 text-white'>
      <SideBar />
      <main className='ml-[264px] flex-1 overflow-auto'>
        {children}
      </main>
    </div>
  )
}