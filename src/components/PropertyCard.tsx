import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Property } from '@/lib/types'
import { MapPin, Users, BedDouble, Bath } from 'lucide-react'

export default function PropertyCard({ property }: { property: Property }) {
  const mainImage = property.images?.[0] ?? null

  return (
    <Link href={`/propiedades/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group p-0">
        <div className="relative h-52 bg-muted overflow-hidden">
          {mainImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-4xl">
              🏡
            </div>
          )}
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-white/90 text-foreground font-semibold text-sm backdrop-blur-sm">
              ${property.price_per_night.toLocaleString('es-AR')}/noche
            </Badge>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-base leading-tight line-clamp-1">{property.title}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground pt-1">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {property.max_guests} personas
            </span>
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5" />
              {property.bedrooms} dorm.
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              {property.bathrooms} baño{property.bathrooms !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
