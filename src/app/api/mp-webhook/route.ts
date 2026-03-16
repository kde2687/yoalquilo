import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Mercado Pago sends webhooks when subscription status changes
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, data } = body

    // Only handle subscription (preapproval) events
    if (type !== 'subscription_preapproval') {
      return NextResponse.json({ ok: true })
    }

    const preapprovalId = data?.id
    if (!preapprovalId) return NextResponse.json({ ok: true })

    // Fetch preapproval details from MP
    const res = await fetch(`https://api.mercadopago.com/preapproval/${preapprovalId}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    })
    const preapproval = await res.json()

    const propertyId = preapproval.external_reference
    const status = preapproval.status // 'authorized' | 'paused' | 'cancelled' | 'pending'

    if (!propertyId) return NextResponse.json({ ok: true })

    const supabase = await createClient()

    if (status === 'authorized') {
      // Activate property
      await supabase
        .from('properties')
        .update({ is_active: true })
        .eq('id', propertyId)
    } else if (status === 'cancelled' || status === 'paused') {
      // Deactivate property
      await supabase
        .from('properties')
        .update({ is_active: false })
        .eq('id', propertyId)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
