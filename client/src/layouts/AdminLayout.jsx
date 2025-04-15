import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/custom/AppSidebar'

export const AdminLayout = ({children}) => {
  return (
    <div>
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className='sm:m-10'>
        {children}
        </div>
      </main>
    </SidebarProvider>
    </div>
  )
}
