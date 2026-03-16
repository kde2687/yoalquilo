'use client'

import { FormData } from './page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Phone, Mail, MessageCircle, Instagram } from 'lucide-react'

export default function Step5Contacto({
  form, update, onPublish, onPrev, loading,
}: {
  form: FormData
  update: (p: Partial<FormData>) => void
  onPublish: () => void
  onPrev: () => void
  loading: boolean
}) {
  const hasContact = form.contact_whatsapp || form.contact_phone || form.contact_email || form.contact_instagram

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">¿Cómo te contactamos?</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Los inquilinos te van a escribir directamente. Agregá al menos uno.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="whatsapp" className="text-base flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-[#25D366]" /> WhatsApp (recomendado)
          </Label>
          <Input id="whatsapp" type="tel" placeholder="+54 9 11 1234-5678"
            value={form.contact_whatsapp}
            onChange={(e) => update({ contact_whatsapp: e.target.value })}
            className="h-12 text-base" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-base flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" /> Teléfono
          </Label>
          <Input id="phone" type="tel" placeholder="+54 9 11 1234-5678"
            value={form.contact_phone}
            onChange={(e) => update({ contact_phone: e.target.value })}
            className="h-12 text-base" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-base flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" /> Email
          </Label>
          <Input id="email" type="email" placeholder="tu@email.com"
            value={form.contact_email}
            onChange={(e) => update({ contact_email: e.target.value })}
            className="h-12 text-base" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="instagram" className="text-base flex items-center gap-2">
            <Instagram className="w-4 h-4 text-primary" /> Instagram
          </Label>
          <Input id="instagram" placeholder="@tunombre"
            value={form.contact_instagram}
            onChange={(e) => update({ contact_instagram: e.target.value })}
            className="h-12 text-base" />
        </div>
      </div>

      {!hasContact && (
        <p className="text-sm text-destructive">Necesitás al menos un medio de contacto.</p>
      )}

      <div className="bg-muted/50 rounded-xl p-4 text-sm space-y-1">
        <p className="font-semibold">Resumen:</p>
        <p>📍 {form.title} — {form.location}, {form.province}</p>
        <p>💰 ${form.price_per_night.toLocaleString('es-AR')} por noche</p>
        <p>📷 {form.images.length} foto{form.images.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} disabled={loading} className="flex-1 h-12 text-base">
          ← Atrás
        </Button>
        <Button onClick={onPublish} disabled={loading || !hasContact} className="flex-1 h-12 text-base font-semibold">
          {loading ? 'Publicando...' : '🚀 Publicar'}
        </Button>
      </div>
    </div>
  )
}
