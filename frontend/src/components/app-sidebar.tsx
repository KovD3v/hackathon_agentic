'use client'

import { Dumbbell, Heart, Home, Utensils, LogOut, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Home', icon: Home, href: '/dashboard' },
  { label: 'Training', icon: Dumbbell, href: '/dashboard/training' },
  { label: 'Nutrition', icon: Utensils, href: '/dashboard/nutrition' },
  { label: 'Health', icon: Heart, href: '/dashboard/health' },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card px-4 py-6">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="h-8 w-8 rounded-full bg-primary" />
        <span className="text-lg font-bold">HealthAgent</span>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3",
                  pathname === item.href && "bg-accent text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={handleSignOut}>
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
