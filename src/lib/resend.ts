import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

export async function sendReviewEmails({
  guestToken,
  hostToken,
  guestName,
  guestEmail,
  hostName,
  hostEmail,
  propertyTitle,
}: {
  guestToken: string
  hostToken: string
  guestName: string
  guestEmail: string
  hostName: string
  hostEmail: string
  propertyTitle: string
}) {
  const guestLink = `${BASE_URL}/review/${guestToken}`
  const hostLink = `${BASE_URL}/review/${hostToken}`

  await Promise.all([
    // Email to guest: review the property
    resend.emails.send({
      from: 'yoalquilo.ar <noreply@yoalquilo.ar>',
      to: guestEmail,
      subject: `${hostName} te pide una reseña sobre tu estadía en "${propertyTitle}"`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #C8604A;">¿Cómo estuvo tu estadía?</h2>
          <p>Hola ${guestName},</p>
          <p><strong>${hostName}</strong> te invita a dejar una reseña sobre tu estadía en <strong>"${propertyTitle}"</strong>.</p>
          <p>Solo te lleva 2 minutos y ayuda a otros viajeros a elegir mejor.</p>
          <a href="${guestLink}" style="display:inline-block; background:#C8604A; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:bold; margin: 16px 0;">
            Dejar mi reseña
          </a>
          <p style="color: #888; font-size: 13px;">Este link es válido por 30 días y solo puede usarse una vez.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #888; font-size: 12px;">yoalquilo.ar — Alquileres directos en Argentina</p>
        </div>
      `,
    }),

    // Email to host: review the guest
    resend.emails.send({
      from: 'yoalquilo.ar <noreply@yoalquilo.ar>',
      to: hostEmail,
      subject: `Dejá tu reseña sobre ${guestName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #C8604A;">¿Cómo fue ${guestName} como huésped?</h2>
          <p>Hola ${hostName},</p>
          <p>Usá este link para dejar tu reseña sobre <strong>${guestName}</strong> luego de su estadía en <strong>"${propertyTitle}"</strong>.</p>
          <a href="${hostLink}" style="display:inline-block; background:#C8604A; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:bold; margin: 16px 0;">
            Reseñar al huésped
          </a>
          <p style="color: #888; font-size: 13px;">Este link es válido por 30 días y solo puede usarse una vez.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #888; font-size: 12px;">yoalquilo.ar — Alquileres directos en Argentina</p>
        </div>
      `,
    }),
  ])

  return { guestLink, hostLink }
}
