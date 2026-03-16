'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Star } from 'lucide-react'

export default function RequestReviewDialog({
  propertyId,
  propertyTitle,
}: {
  propertyId: string
  propertyTitle: string
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [hostName, setHostName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/reviews/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_id: propertyId,
          guest_name: guestName,
          guest_email: guestEmail,
          host_name: hostName,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast.success(`¡Emails enviados! ${guestName} va a recibir el link para reseñar la propiedad.`)
      setOpen(false)
      setGuestName('')
      setGuestEmail('')
      setHostName('')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error al enviar la solicitud.')
    } finally {
      setLoading(false)
    }
  }

  const valid = guestName.trim() && guestEmail.trim() && hostName.trim()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className="inline-flex items-center gap-1.5 h-8 rounded-md border border-border bg-white px-3 text-sm font-medium hover:bg-muted transition-colors cursor-pointer">
          <Star className="w-3.5 h-3.5" />
          Pedir reseña
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Solicitar reseña</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground -mt-2">
          Enviamos emails a vos y al huésped con links únicos para reseñarse mutuamente.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="host_name">Tu nombre</Label>
            <Input
              id="host_name"
              placeholder="Ej: María García"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="guest_name">Nombre del huésped</Label>
            <Input
              id="guest_name"
              placeholder="Ej: Carlos López"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="guest_email">Email del huésped</Label>
            <Input
              id="guest_email"
              type="email"
              placeholder="huesped@email.com"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Propiedad: <strong>{propertyTitle}</strong>
          </p>
          <Button type="submit" disabled={loading || !valid} className="w-full h-11">
            {loading ? 'Enviando emails...' : 'Enviar links de reseña'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
