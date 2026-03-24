export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users, BedDouble, Bath, ChevronLeft, Star } from 'lucide-react'
import Link from 'next/link'
import AvailabilityCalendar from '@/components/AvailabilityCalendar'
import StarRating from '@/components/StarRating'
import { Review } from '@/lib/types'
import ContactCard from './ContactCard'

const AMENITY_ICONS: Record<string, string> = {
  'Pileta': '🏊',
  'WiFi': '📶',
  'Estacionamiento': '🚗',
  'Parrilla': '🔥',
  'Aire acondicionado': '❄️',
  'Calefacción': '🌡️',
  'Cocina equipada': '🍳',
  'Lavarropas': '🫧',
  'Jardín': '🌿',
  'Quincho': '🏠',
  'TV cable': '📺',
  'Apto mascotas': '🐾',
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (!property) notFound()

  const { data: unavailableDates } = await supabase
    .from('availability')
    .select('date')
    .eq('property_id', id)
    .eq('is_available', false)

  const blockedDates = unavailableDates?.map((d) => d.date) ?? []

  const { data: reviews } = await supabase
    .from('reviews')
    .select('id, reviewer_name, rating, comment, completed_at')
    .eq('property_id', id)
    .eq('review_type', 'guest_to_property')
    .eq('status', 'completed')
    .order('completed_at', { ascending: false })

  const avgRating = reviews && reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / reviews.length
    : null

  const whatsappUrl = property.contact_whatsapp
    ? `https://wa.me/${property.contact_whatsapp.replace(/\D/g, '')}?text=Hola! Vi tu propiedad "${property.title}" en yoalquilo.ar y me gustaría consultar disponibilidad.`
    : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="w-4 h-4" />
        Volver al inicio
      </Link>

      {/* Images */}
      {property.images && property.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-8 rounded-2xl overflow-hidden">
          {property.images.slice(0, 5).map((img: string, i: number) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={img}
              alt={`Foto ${i + 1}`}
              className={`w-full object-cover ${i === 0 ? 'col-span-2 row-span-2 h-72 md:h-80' : 'h-36 md:h-40'}`}
            />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{property.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{property.location}{property.province ? `, ${property.province}` : ''}</span>
              </div>
              {avgRating !== null && (
                <StarRating rating={avgRating} count={reviews?.length} size="sm" />
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm py-4 border-y border-border">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" />
              <strong>{property.max_guests}</strong> personas
            </span>
            <span className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-primary" />
              <strong>{property.bedrooms}</strong> dormitorio{property.bedrooms !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-primary" />
              <strong>{property.bathrooms}</strong> baño{property.bathrooms !== 1 ? 's' : ''}
            </span>
          </div>

          {property.description && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>
          )}

          {property.amenities && property.amenities.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Lo que ofrece</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((a: string) => (
                  <Badge key={a} variant="secondary" className="text-sm py-1 px-3">
                    {AMENITY_ICONS[a] ?? '✓'} {a}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold mb-3">Disponibilidad</h2>
            <AvailabilityCalendar blockedDates={blockedDates} alwaysAvailable={property.always_available} />
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold">Reseñas</h2>
              {avgRating !== null && (
                <StarRating rating={avgRating} count={reviews?.length} size="md" />
              )}
            </div>

            {reviews && reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((r: Partial<Review> & { id: string; reviewer_name: string; rating: number | null; comment: string | null; completed_at: string | null }) => (
                  <div key={r.id} className="border border-border rounded-xl p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-sm">{r.reviewer_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {r.completed_at ? new Date(r.completed_at).toLocaleDateString('es-AR', { month: 'long', year: 'numeric' }) : ''}
                        </p>
                      </div>
                      <div className="flex shrink-0">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} className={`w-4 h-4 ${s <= (r.rating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/20'}`} />
                        ))}
                      </div>
                    </div>
                    {r.comment && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Todavía no hay reseñas para esta propiedad.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <ContactCard
            price={property.price_per_night}
            whatsappUrl={whatsappUrl}
            phone={property.contact_phone ?? null}
            email={property.contact_email ?? null}
            instagram={property.contact_instagram ?? null}
          />
        </div>
      </div>
    </div>
  )
}
