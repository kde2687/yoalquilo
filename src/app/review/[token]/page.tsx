import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ReviewForm from './ReviewForm'
import { Star, CheckCircle2, Clock } from 'lucide-react'
import Link from 'next/link'

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const supabase = await createClient()

  const { data: review } = await supabase
    .from('reviews')
    .select('id, status, expires_at, review_type, reviewer_name, host_name, rating, property_id, properties(title)')
    .eq('token', token)
    .single()

  if (!review) notFound()

  const expired = new Date(review.expires_at) < new Date()
  const propertyTitle = (review.properties as unknown as { title: string } | null)?.title ?? 'la propiedad'
  const isGuest = review.review_type === 'guest_to_property'

  // Already completed
  if (review.status === 'completed') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm">
          <CheckCircle2 className="w-14 h-14 text-primary mx-auto" />
          <h1 className="text-2xl font-bold">¡Reseña enviada!</h1>
          <div className="flex justify-center gap-1">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className={`w-6 h-6 ${s <= (review.rating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/20'}`} />
            ))}
          </div>
          <p className="text-muted-foreground">Ya enviaste tu reseña. ¡Gracias!</p>
          <Link href="/" className="inline-block text-primary hover:underline text-sm">
            Ir a yoalquilo.ar →
          </Link>
        </div>
      </div>
    )
  }

  // Expired
  if (expired) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm">
          <Clock className="w-14 h-14 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-bold">Link expirado</h1>
          <p className="text-muted-foreground">Este link de reseña venció. Pedile al propietario que te envíe uno nuevo.</p>
          <Link href="/" className="inline-block text-primary hover:underline text-sm">
            Ir a yoalquilo.ar →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <p className="text-3xl mb-3">{isGuest ? '🏡' : '👤'}</p>
        <h1 className="text-2xl font-bold">
          {isGuest ? `¿Cómo estuvo tu estadía en "${propertyTitle}"?` : `¿Cómo fue ${review.host_name} como huésped?`}
        </h1>
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
        <ReviewForm
          token={token}
          reviewerName={review.reviewer_name}
          reviewType={review.review_type as 'guest_to_property' | 'host_to_guest'}
          propertyTitle={propertyTitle}
          subjectName={review.host_name}
        />
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Este link es personal e intransferible. Solo puede usarse una vez.
      </p>
    </div>
  )
}
