'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

export default function DeletePropertyButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async () => {
    setLoading(true)
    const { error } = await supabase.from('properties').delete().eq('id', id)
    if (error) {
      toast.error('No se pudo eliminar la propiedad.')
    } else {
      toast.success('Propiedad eliminada.')
      router.refresh()
    }
    setLoading(false)
    setConfirming(false)
  }

  if (confirming) {
    return (
      <div className="flex gap-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? '...' : 'Confirmar'}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
          Cancelar
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1.5 text-destructive hover:text-destructive"
      onClick={() => setConfirming(true)}
    >
      <Trash2 className="w-3.5 h-3.5" />
      Eliminar
    </Button>
  )
}
