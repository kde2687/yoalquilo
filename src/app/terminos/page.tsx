import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | yoalquilo.ar',
  description: 'Términos de uso, condiciones generales y deslinde de responsabilidad de yoalquilo.ar',
}

export default function TerminosPage() {
  const fecha = '16 de marzo de 2026'

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/" className="text-sm text-primary hover:underline">← Volver al inicio</Link>

      <h1 className="text-3xl font-bold mt-6 mb-2">Términos y Condiciones de Uso</h1>
      <p className="text-muted-foreground text-sm mb-10">Última actualización: {fecha}</p>

      <div className="prose prose-sm max-w-none space-y-8 text-foreground">

        <section className="space-y-3">
          <h2 className="text-xl font-bold">1. Naturaleza del servicio y carácter de intermediario</h2>
          <p>
            yoalquilo.ar (en adelante, <strong>"la Plataforma"</strong>) es un servicio de anuncios clasificados en línea cuya única función es facilitar el contacto entre personas que ofrecen inmuebles en alquiler temporario (<strong>"Propietarios"</strong>) y personas que buscan alojamiento temporal (<strong>"Huéspedes"</strong>), en los términos del artículo 1199, inciso a) del Código Civil y Comercial de la Nación (Ley 26.994), que exceptúa del plazo mínimo legal a las locaciones con fines turísticos o de descanso de hasta tres (3) meses.
          </p>
          <p>
            La Plataforma actúa exclusivamente como <strong>intermediario de contacto</strong>. No es parte, ni garante, ni aval de ningún contrato, acuerdo, trato o transacción que se celebre entre Propietarios y Huéspedes. No interviene en la negociación, celebración, ejecución ni extinción de ningún contrato de locación u hospedaje.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">2. Deslinde de responsabilidad — Publicaciones de Propietarios</h2>
          <p>
            Los anuncios, descripciones, fotografías, precios, disponibilidad y demás información publicada en la Plataforma son elaborados y cargados exclusivamente por los Propietarios bajo su entera responsabilidad. La Plataforma <strong>no verifica, no audita, no certifica ni garantiza</strong> la veracidad, exactitud, completitud, legalidad ni vigencia de dicha información.
          </p>
          <p>
            En consecuencia, la Plataforma no será responsable por:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Inexactitudes, omisiones o falsedades en los anuncios publicados.</li>
            <li>Diferencias entre la propiedad anunciada y la efectivamente ofrecida.</li>
            <li>Fotografías o descripciones que no se correspondan con la realidad.</li>
            <li>Precios desactualizados o condiciones modificadas por el Propietario.</li>
            <li>Disponibilidad incorrecta en el calendario de la propiedad.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">3. Deslinde de responsabilidad — Relación entre usuarios</h2>
          <p>
            La Plataforma no interviene en ninguna etapa de la relación entre Propietarios y Huéspedes. Todo acuerdo, pago, reserva y condición de alquiler es pactado directamente entre las partes, sin participación de yoalquilo.ar.
          </p>
          <p>
            La Plataforma <strong>no será responsable</strong>, en ningún caso y bajo ninguna circunstancia, por:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Incumplimientos contractuales de cualquiera de las partes.</li>
            <li>Daños y perjuicios sufridos durante o con motivo de la estadía.</li>
            <li>Pérdidas, robos, deterioros o accidentes ocurridos en la propiedad.</li>
            <li>Lesiones físicas o daños a la salud de Huéspedes o terceros.</li>
            <li>Conflictos, disputas o litigios entre Propietarios y Huéspedes.</li>
            <li>Estafas, fraudes o conductas dolosas de cualquiera de las partes.</li>
            <li>Falta de pago del alquiler pactado.</li>
            <li>Daños causados por la propiedad a Huéspedes o a terceros.</li>
            <li>Incumplimiento de normativas municipales, provinciales o nacionales aplicables a la propiedad o a la actividad de alquiler temporario.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">4. Responsabilidad exclusiva de los Propietarios</h2>
          <p>
            Los Propietarios son los únicos y exclusivos responsables de:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>La veracidad y actualización de la información publicada en sus anuncios.</li>
            <li>El cumplimiento de toda normativa aplicable a la actividad de alquiler temporario, incluyendo habilitaciones municipales, obligaciones impositivas (AFIP/ARBA), registro de alojamientos turísticos ante el Ministerio de Turismo y el organismo provincial correspondiente, y cualquier otra autorización requerida.</li>
            <li>El estado de habitabilidad, seguridad e higiene de la propiedad ofrecida.</li>
            <li>El cumplimiento de las condiciones pactadas con el Huésped.</li>
            <li>La correcta declaración de ingresos ante los organismos fiscales competentes.</li>
            <li>La contratación de seguros que consideren convenientes para cubrir riesgos derivados de la actividad.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">5. Obligaciones y responsabilidad de los Huéspedes</h2>
          <p>
            Los Huéspedes son los únicos y exclusivos responsables de:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Verificar la información del anuncio directamente con el Propietario antes de realizar cualquier pago o acuerdo.</li>
            <li>Constatar la identidad del Propietario y la titularidad o derecho de disposición sobre el inmueble.</li>
            <li>Adoptar las precauciones necesarias para resguardar su seguridad personal y la de sus acompañantes.</li>
            <li>El uso adecuado y respetuoso de la propiedad durante la estadía.</li>
            <li>Los daños que causen a la propiedad o a terceros durante la estadía.</li>
            <li>El cumplimiento de las condiciones pactadas con el Propietario.</li>
          </ul>
          <p>
            Se recomienda especialmente a los Huéspedes <strong>no realizar pagos anticipados</strong> sin haber verificado fehacientemente la identidad del Propietario y la existencia real de la propiedad. La Plataforma no se responsabiliza por estafas derivadas de pagos efectuados sin dicha verificación.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">6. Ausencia de procesamiento de pagos</h2>
          <p>
            La Plataforma <strong>no procesa, no retiene, no transfiere ni intermedia pagos</strong> entre Propietarios y Huéspedes. Toda transacción económica se realiza exclusivamente entre las partes, por los medios que ellas acuerden. La Plataforma no tiene responsabilidad alguna respecto de dichos pagos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">7. Protección de datos personales — Ley 25.326</h2>
          <p>
            Los datos personales de los usuarios son tratados conforme a la Ley N° 25.326 de Protección de los Datos Personales y sus normas reglamentarias. La Plataforma recopila únicamente los datos necesarios para la prestación del servicio y no los cede a terceros salvo obligación legal.
          </p>
          <p>
            Los usuarios tienen derecho a acceder, rectificar y suprimir sus datos personales conforme al artículo 14 de la Ley 25.326, enviando una solicitud a través de los canales de contacto de la Plataforma. La Agencia de Acceso a la Información Pública es el órgano de control en materia de datos personales en Argentina.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">8. Limitación de responsabilidad — Ley 24.240</h2>
          <p>
            En cumplimiento de la Ley N° 24.240 de Defensa del Consumidor y sus modificatorias, la Plataforma informa que su servicio consiste exclusivamente en la publicación de anuncios clasificados de alquiler temporario y en la facilitación del contacto entre usuarios. La Plataforma no es proveedora de servicios de alojamiento y no asume responsabilidad solidaria por la prestación de dichos servicios.
          </p>
          <p>
            La responsabilidad de la Plataforma, en caso de ser declarada procedente por autoridad judicial competente, quedará limitada al monto efectivamente abonado por el usuario en concepto de suscripción en el mes en que se produjo el evento dañoso.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">9. Contenido inapropiado y suspensión de cuentas</h2>
          <p>
            La Plataforma se reserva el derecho de eliminar anuncios o suspender cuentas que, a su exclusivo criterio, contengan información falsa, engañosa, ilegal, ofensiva o que violen estos Términos y Condiciones, sin que ello genere derecho a indemnización alguna en favor del usuario afectado.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">10. Modificación de los Términos</h2>
          <p>
            La Plataforma podrá modificar estos Términos y Condiciones en cualquier momento, notificando a los usuarios mediante publicación en el sitio web. El uso continuado del servicio con posterioridad a la publicación de los cambios implica la aceptación de los nuevos términos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">11. Jurisdicción y ley aplicable</h2>
          <p>
            Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Para cualquier controversia derivada del uso de la Plataforma, las partes se someten a la jurisdicción de los Tribunales Ordinarios de la Ciudad Autónoma de Buenos Aires, con renuncia expresa a cualquier otro fuero o jurisdicción que pudiera corresponder.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">12. Aceptación de los Términos</h2>
          <p>
            El acceso y uso de la Plataforma implica la aceptación plena e incondicional de estos Términos y Condiciones por parte del usuario. Si el usuario no está de acuerdo con alguna de las disposiciones aquí establecidas, deberá abstenerse de utilizar el servicio.
          </p>
          <p>
            Para publicar un anuncio, el usuario declara bajo fe de juramento que ha leído, comprendido y aceptado estos Términos y Condiciones en su totalidad.
          </p>
        </section>

        <div className="border-t border-border pt-6 text-sm text-muted-foreground">
          <p>
            <strong>yoalquilo.ar</strong> — Plataforma de intermediación de alquileres temporarios en Argentina.<br />
            Ante consultas legales, escribinos a: <strong>legal@yoalquilo.ar</strong>
          </p>
        </div>

      </div>
    </div>
  )
}
