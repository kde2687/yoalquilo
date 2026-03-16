import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function GraciasPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-sm">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
        <h1 className="text-2xl font-bold">¡Gracias por tu reseña!</h1>
        <p className="text-muted-foreground">
          Tu opinión ayuda a construir una comunidad de confianza en yoalquilo.ar.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary text-primary-foreground rounded-xl px-6 py-3 font-semibold hover:opacity-90 transition-opacity mt-2"
        >
          Explorar propiedades
        </Link>
      </div>
    </div>
  )
}
