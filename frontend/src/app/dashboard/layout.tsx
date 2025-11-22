import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { GlobalChat } from "@/components/global-chat"

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-4">
            <SidebarTrigger />
            {children}
          </div>
        </main>
        <GlobalChat />
      </div>
    </SidebarProvider>
  )
}
