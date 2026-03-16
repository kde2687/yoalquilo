'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Star } from 'lucide-react'

export default function ReviewForm({
  token,
  reviewerName,
  reviewType,
  propertyTitle,
  subjectName,
}: {
  token: string
  reviewerName: string
  reviewType: 'guest_to_property' | 'host_to_guest'
  propertyTitle: string
  subjectName: string
}) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const isGuest = reviewType === 'guest_to_property'
  const subject = isGuest ? `"${propertyTitle}"` : subjectName

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Elegí una puntuación antes de enviar.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, rating, comment }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push(`/review/${token}/gracias`)
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error al enviar la reseña.')
      setLoading(false)
    }
  }

  const LABELS = ['Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente']

  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground text-sm">
          Hola <strong>{reviewerName}</strong>, contanos tu experiencia con {subject}.
        </p>
      </div>

      {/* Stars */}
      <div className="space-y-3">
        <p className="font-semibold text-base">Puntuación</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-10 h-10 transition-colors ${
                  star <= (hovered || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground/30'
                }`}
              />
            </button>
          ))}
        </div>
        {(hovered || rating) > 0 && (
          <p className="text-sm font-medium text-primary">
            {LABELS[(hovered || rating) - 1]}
          </p>
        )}
      </div>

      {/* Comment */}
      <div className="space-y-2">
        <p className="font-semibold text-base">Comentario <span className="text-muted-foreground font-normal text-sm">(opcional)</span></p>
        <Textarea
          placeholder={
            isGuest
              ? 'Contá cómo fue la propiedad, la atención del propietario, el entorno...'
              : 'Contá cómo fue el huésped, si cuidó la propiedad, si se puede recomendar...'
          }
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="text-base resize-none"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground text-right">{comment.length}/500</p>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading || rating === 0}
        className="w-full h-12 text-base font-semibold"
      >
        {loading ? 'Enviando...' : 'Enviar reseña'}
      </Button>
    </div>
  )
}
