import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export default async function PagoExitosoPage({
  searchParams,
}: {
  searchParams: Promise<{ property_id?: string }>
}) {
  const { property_id } = await searchParams

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-5 max-w-sm">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
        <h1 className="text-2xl font-bold">¡Suscripción activada!</h1>
        <p className="text-muted-foreground">
          Tu propiedad ya está activa en yoalquilo.ar. Los inquilinos pueden encontrarla y contactarte directamente.
        </p>
        <div className="flex flex-col gap-2 mt-4">
          {property_id && (
            <Link href={`/propiedades/${property_id}`}>
              <Button className="w-full">Ver mi propiedad publicada</Button>
            </Link>
          )}
          <Link href="/mis-propiedades">
            <Button variant="outline" className="w-full">Ir a mis propiedades</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
