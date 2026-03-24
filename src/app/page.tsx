export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import PropertyCard from '@/components/PropertyCard'
import { Property } from '@/lib/types'
import { Search, MapPin, Calendar } from 'lucide-react'
import Link from 'next/link'
import { ARGENTINA_LOCATIONS } from '@/lib/argentina-cities'

const ALL_PLACES = Array.from(new Set([
  ...Object.keys(ARGENTINA_LOCATIONS),
  ...Object.values(ARGENTINA_LOCATIONS).flatMap(partidos =>
    Object.values(partidos).flat()
  ),
])).sort()

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; lugar?: string; checkin?: string; checkout?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  // Find properties with blocked dates in the requested range
  let excludedIds: string[] = []
  if (params.checkin && params.checkout) {
    const { data: blocked } = await supabase
      .from('availability')
      .select('property_id')
      .gte('date', params.checkin)
      .lte('date', params.checkout)
      .eq('is_available', false)
    excludedIds = [...new Set(blocked?.map((b) => b.property_id) ?? [])]
  }

  let query = supabase
    .from('properties')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (params.q) query = query.ilike('title', `%${params.q}%`)
  if (params.lugar) {
    const isProvince = Object.keys(ARGENTINA_LOCATIONS).includes(params.lugar)
    if (isProvince) {
      query = query.eq('province', params.lugar)
    } else {
      query = query.ilike('location', `%${params.lugar}%`)
    }
  }
  if (excludedIds.length > 0) query = query.not('id', 'in', `(${excludedIds.join(',')})`)

  const { data: properties } = await query.limit(24)

  const today = new Date().toISOString().split('T')[0]
  const hasFilters = params.q || params.lugar || params.checkin

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Alquilá directamente con el propietario
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Sin intermediarios. Contacto directo por WhatsApp, teléfono o email.
          </p>

          {/* Search */}
          <form method="GET" action="/">
            <div className="bg-white rounded-2xl p-3 flex flex-col sm:flex-row gap-2 shadow-lg">
              {/* Text search */}
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  name="q"
                  defaultValue={params.q}
                  placeholder="Buscar por nombre o lugar..."
                  className="flex-1 outline-none text-foreground placeholder:text-muted-foreground bg-transparent text-base py-1"
                />
              </div>

              <div className="w-px bg-border hidden sm:block" />

              {/* Location */}
              <div className="flex items-center gap-2 px-3 border-t sm:border-t-0 border-border pt-2 sm:pt-0">
                <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  name="lugar"
                  list="places-list"
                  defaultValue={params.lugar}
                  placeholder="Ciudad o provincia..."
                  autoComplete="off"
                  className="outline-none text-foreground placeholder:text-muted-foreground bg-transparent text-base py-1 w-full sm:w-44"
                />
                <datalist id="places-list">
                  {ALL_PLACES.map((p) => (
                    <option key={p} value={p} />
                  ))}
                </datalist>
              </div>

              <div className="w-px bg-border hidden sm:block" />

              {/* Dates */}
              <div className="flex items-center gap-2 px-3 border-t sm:border-t-0 border-border pt-2 sm:pt-0">
                <Calendar className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  type="date"
                  name="checkin"
                  defaultValue={params.checkin}
                  min={today}
                  className="outline-none text-foreground bg-transparent text-sm py-1 w-32"
                />
                <span className="text-muted-foreground text-sm">→</span>
                <input
                  type="date"
                  name="checkout"
                  defaultValue={params.checkout}
                  min={params.checkin ?? today}
                  className="outline-none text-foreground bg-transparent text-sm py-1 w-32"
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-primary-foreground rounded-xl px-6 py-2.5 font-semibold hover:opacity-90 transition-opacity text-base"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Properties */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        {hasFilters ? (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {properties?.length ?? 0} resultado{properties?.length !== 1 ? 's' : ''}
              {params.lugar ? ` en ${params.lugar}` : ''}
              {params.q ? ` para "${params.q}"` : ''}
              {params.checkin && params.checkout ? ` — ${params.checkin} al ${params.checkout}` : ''}
            </h2>
            <Link href="/" className="text-sm text-primary hover:underline">
              Ver todo
            </Link>
          </div>
        ) : (
          <h2 className="text-xl font-semibold mb-6">Propiedades disponibles</h2>
        )}

        {properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {properties.map((p: Property) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-5xl mb-4">🏡</p>
            <p className="text-lg font-medium">No encontramos propiedades con esos filtros.</p>
            <p className="text-sm mt-1">Probá con otro destino o borrá los filtros.</p>
          </div>
        )}
      </section>

      {/* CTA owners */}
      <section className="bg-muted border-t border-border py-14 px-4 mt-6">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold">¿Tenés una propiedad para alquilar?</h2>
          <p className="text-muted-foreground text-base">
            Publicá en minutos y recibí consultas directo en tu celular. Sin comisiones por reserva.
          </p>
          <Link
            href="/publicar"
            className="inline-block bg-primary text-primary-foreground rounded-xl px-8 py-3 font-semibold hover:opacity-90 transition-opacity text-base mt-2"
          >
            Publicar mi propiedad
          </Link>
        </div>
      </section>
    </div>
  )
}
