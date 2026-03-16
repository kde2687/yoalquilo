export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Property } from '@/lib/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlusCircle, Pencil, Eye, MapPin } from 'lucide-react'
import DeletePropertyButton from './DeletePropertyButton'
import RequestReviewDialog from './RequestReviewDialog'

export default async function MisPropiedadesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: properties } = await supabase
    .from('properties')
    .select('*')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Mis propiedades</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {properties?.length ?? 0} propiedad{properties?.length !== 1 ? 'es' : ''} publicada{properties?.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/publicar">
          <Button className="gap-2">
            <PlusCircle className="w-4 h-4" />
            Nueva
          </Button>
        </Link>
      </div>

      {!properties || properties.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-2xl">
          <p className="text-5xl mb-4">🏡</p>
          <p className="text-lg font-medium">Todavía no publicaste propiedades.</p>
          <Link href="/publicar" className="mt-4 inline-block">
            <Button className="gap-2 mt-3">
              <PlusCircle className="w-4 h-4" />
              Publicar mi primera propiedad
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {properties.map((p: Property) => (
            <div key={p.id} className="bg-white border border-border rounded-2xl p-4 flex gap-4 items-start shadow-sm">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0">
                {p.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🏡</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <h3 className="font-semibold text-base leading-tight">{p.title}</h3>
                  <Badge variant={p.is_active ? 'default' : 'secondary'} className="shrink-0">
                    {p.is_active ? 'Activa' : 'Pausada'}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {p.location}, {p.province}
                </div>
                <p className="text-sm font-medium text-primary mt-1">
                  ${p.price_per_night.toLocaleString('es-AR')}/noche
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <Link href={`/propiedades/${p.id}`}>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      Ver
                    </Button>
                  </Link>
                  <Link href={`/mis-propiedades/${p.id}/editar`}>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Pencil className="w-3.5 h-3.5" />
                      Editar
                    </Button>
                  </Link>
                  <RequestReviewDialog propertyId={p.id} propertyTitle={p.title} />
                  <DeletePropertyButton id={p.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
