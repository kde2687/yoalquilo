import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const { token, rating, comment } = await req.json()

    if (!token) return NextResponse.json({ error: 'Token requerido' }, { status: 400 })
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Puntuación inválida (debe ser 1-5)' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Fetch the review
    const { data: review } = await supabase
      .from('reviews')
      .select('id, status, expires_at')
      .eq('token', token)
      .single()

    if (!review) return NextResponse.json({ error: 'Link inválido' }, { status: 404 })
    if (review.status === 'completed') {
      return NextResponse.json({ error: 'Esta reseña ya fue enviada' }, { status: 409 })
    }
    if (new Date(review.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Este link expiró' }, { status: 410 })
    }

    // Mark as completed — .eq('status', 'pending') prevents race conditions
    const { error } = await supabase
      .from('reviews')
      .update({
        status: 'completed',
        rating,
        comment: comment?.trim() || null,
        completed_at: new Date().toISOString(),
      })
      .eq('token', token)
      .eq('status', 'pending')

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit review error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
