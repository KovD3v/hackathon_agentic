'use client'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      
      const { error } = await supabase.auth.signInWithPassword({
          email,
          password
      })

      if (error) {
          console.error(error)
          // Show error toast
      } else {
          router.push('/dashboard')
      }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900 text-slate-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your Health Agent account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button 
                variant="outline" 
                onClick={() => handleSocialLogin('google')}
                className="border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white"
            >
              Google
            </Button>
            <Button 
                variant="outline" 
                onClick={() => handleSocialLogin('apple')}
                className="border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white"
            >
              Apple
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-400">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
                  <input 
                    className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                  />
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">Password</label>
                  <input 
                    className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                  />
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Sign In
              </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
