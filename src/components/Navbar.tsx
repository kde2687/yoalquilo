'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Home, PlusCircle, LayoutDashboard, LogOut, LogIn } from 'lucide-react'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">yoalquilo</span>
          <span className="text-sm text-muted-foreground hidden sm:block">.ar</span>
        </Link>

        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <Link href="/publicar">
                <Button size="sm" className="gap-2">
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Publicar</span>
                </Button>
              </Link>
              <Link href="/mis-propiedades">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Mis propiedades</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/publicar">
                <Button size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Publicar propiedad</span>
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Ingresar</span>
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
