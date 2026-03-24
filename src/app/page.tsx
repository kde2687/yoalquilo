export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import PropertyCard from '@/components/PropertyCard'
import { Property } from '@/lib/types'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { ARGENTINA_LOCATIONS } from '@/lib/argentina-cities'
import LocationSearch from '@/components/LocationSearch'

const ALL_PLACES = Array.from(new Set([
  ...Object.keys(ARGENTINA_LOCATIONS),
  ...Object.values(ARGENTINA_LOCATIONS).flatMap(partidos =>
    Object.values(partidos).flat()
  ),
])).sort()

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lugar?: string; checkin?: string; checkout?: string }>
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
  const hasFilters = params.lugar || params.checkin

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

          {/* Search — estilo Airbnb */}
          <form method="GET" action="/">
            <div className="bg-white rounded-full shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200 overflow-visible">

              {/* Destino */}
              <div className="flex-1 px-6 py-3 hover:bg-gray-50 rounded-full transition-colors cursor-text">
                <LocationSearch places={ALL_PLACES} defaultValue={params.lugar} />
              </div>

              {/* Llegada */}
              <div className="px-6 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex flex-col text-left">
                  <label className="text-xs font-semibold text-gray-800">Llegada</label>
                  <input
                    type="date"
                    name="checkin"
                    defaultValue={params.checkin}
                    min={today}
                    className="outline-none bg-transparent text-gray-800 placeholder:text-gray-400 text-sm pt-0.5 w-32"
                  />
                </div>
              </div>

              {/* Salida */}
              <div className="px-6 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex flex-col text-left">
                  <label className="text-xs font-semibold text-gray-800">Salida</label>
                  <input
                    type="date"
                    name="checkout"
                    defaultValue={params.checkout}
                    min={params.checkin ?? today}
                    className="outline-none bg-transparent text-gray-800 placeholder:text-gray-400 text-sm pt-0.5 w-32"
                  />
                </div>
              </div>

              {/* Botón buscar */}
              <div className="px-3 py-3 flex items-center justify-center sm:justify-start">
                <button
                  type="submit"
                  className="bg-primary text-white rounded-full p-3.5 hover:opacity-90 transition-opacity shadow-md"
                  aria-label="Buscar"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

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
