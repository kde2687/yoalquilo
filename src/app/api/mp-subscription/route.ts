import { NextRequest, NextResponse } from 'next/server'
import MercadoPago, { PreApproval } from 'mercadopago'

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN ?? ''
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
const PRECIO_MENSUAL = 5990

export async function POST(req: NextRequest) {
  try {
    const { property_id, payer_email, property_title } = await req.json()

    if (!property_id) {
      return NextResponse.json({ error: 'Falta property_id' }, { status: 400 })
    }

    const client = new MercadoPago({ accessToken: MP_ACCESS_TOKEN })
    const preApproval = new PreApproval(client)

    const result = await preApproval.create({
      body: {
        reason: `yoalquilo.ar — ${property_title ?? 'Publicación mensual'}`,
        payer_email: payer_email || undefined,
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: PRECIO_MENSUAL,
          currency_id: 'ARS',
        },
        back_url: `${BASE_URL}/publicar/pago-exitoso?property_id=${property_id}`,
        external_reference: property_id,
        status: 'pending',
      },
    })

    return NextResponse.json({ init_point: result.init_point })
  } catch (err) {
    console.error('MP subscription error:', err)
    return NextResponse.json({ error: 'Error al crear la suscripción' }, { status: 500 })
  }
}
