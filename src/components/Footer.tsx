import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-4">
        {/* Disclaimer box */}
        <div className="bg-white border border-border rounded-xl px-5 py-4 text-sm text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground mb-1">Aviso importante</p>
          <p>
            yoalquilo.ar es una plataforma de anuncios clasificados que actúa exclusivamente como intermediario de contacto entre propietarios y huéspedes. No somos parte de ningún contrato de alquiler, no procesamos pagos y no garantizamos la veracidad de los anuncios publicados. Cada usuario es responsable de verificar la información antes de realizar cualquier acuerdo o pago. Al usar este sitio, aceptás nuestros{' '}
            <Link href="/terminos" className="text-primary hover:underline font-medium">
              Términos y Condiciones
            </Link>.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} yoalquilo.ar — Todos los derechos reservados</span>
          <div className="flex gap-4">
            <Link href="/terminos" className="hover:text-foreground transition-colors">
              Términos y condiciones
            </Link>
            <Link href="/terminos#datos" className="hover:text-foreground transition-colors">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
