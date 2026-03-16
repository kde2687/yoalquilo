import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendReviewEmails } from '@/lib/resend'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

    const { property_id, guest_name, guest_email, host_name } = await req.json()

    if (!property_id || !guest_name || !guest_email || !host_name) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    // Verify property belongs to this user
    const { data: property } = await supabase
      .from('properties')
      .select('id, title')
      .eq('id', property_id)
      .eq('owner_id', user.id)
      .single()

    if (!property) {
      return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 403 })
    }

    const guestToken = randomUUID().replace(/-/g, '') + randomUUID().replace(/-/g, '')
    const hostToken = randomUUID().replace(/-/g, '') + randomUUID().replace(/-/g, '')

    // Insert both review records
    const { error: insertError } = await supabase.from('reviews').insert([
      {
        property_id,
        owner_id: user.id,
        review_type: 'guest_to_property',
        token: guestToken,
        reviewer_name: guest_name,
        reviewer_email: guest_email,
        host_name,
      },
      {
        property_id,
        owner_id: user.id,
        review_type: 'host_to_guest',
        token: hostToken,
        reviewer_name: host_name,
        reviewer_email: user.email ?? '',
        host_name: guest_name,
      },
    ])

    if (insertError) throw insertError

    // Send emails (non-blocking — if email fails, reviews were created)
    try {
      await sendReviewEmails({
        guestToken,
        hostToken,
        guestName: guest_name,
        guestEmail: guest_email,
        hostName: host_name,
        hostEmail: user.email ?? '',
        propertyTitle: property.title,
      })
    } catch (emailErr) {
      console.error('Email send failed (reviews still created):', emailErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Request review error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
