'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MessageCircle, Instagram } from 'lucide-react'

type Props = {
  price: number
  whatsappUrl: string | null
  phone: string | null
  email: string | null
  instagram: string | null
}

export default function ContactCard({ price, whatsappUrl, phone, email, instagram }: Props) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="sticky top-24 bg-white border border-border rounded-2xl p-5 shadow-sm space-y-4">
      <div className="text-center pb-3 border-b border-border">
        <span className="text-3xl font-bold text-primary">
          ${price.toLocaleString('es-AR')}
        </span>
        <span className="text-muted-foreground"> / noche</span>
      </div>

      {!revealed ? (
        <Button onClick={() => setRevealed(true)} className="w-full h-12 text-base font-semibold">
          Ver datos de contacto
        </Button>
      ) : (
        <div>
          <p className="text-sm font-semibold mb-3">Contactar al propietario</p>
          <div className="space-y-2">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full bg-[#25D366] text-white rounded-xl px-4 py-3 font-medium hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-3 w-full border border-border rounded-xl px-4 py-3 font-medium hover:bg-muted transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                {phone}
              </a>
            )}
            {email && (
              <div className="flex items-center gap-3 w-full border border-border rounded-xl px-4 py-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium break-all">{email}</span>
              </div>
            )}
            {instagram && (
              <a
                href={`https://instagram.com/${instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full border border-border rounded-xl px-4 py-3 font-medium hover:bg-muted transition-colors"
              >
                <Instagram className="w-5 h-5 text-primary" />
                @{instagram.replace('@', '')}
              </a>
            )}
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center pt-1">
        La reserva se coordina directamente con el propietario.
      </p>
    </div>
  )
}
