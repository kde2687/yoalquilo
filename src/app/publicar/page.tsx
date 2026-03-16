'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import Step1Info from './Step1Info'
import Step2Photos from './Step2Photos'
import Step3Calendar from './Step3Calendar'
import Step4Precio from './Step4Precio'
import Step5Contacto from './Step5Contacto'

export type FormData = {
  title: string
  location: string
  province: string | undefined
  description: string
  images: File[]
  imageUrls: string[]
  blockedDates: Date[]
  price_per_night: number
  max_guests: number
  bedrooms: number
  bathrooms: number
  contact_whatsapp: string
  contact_phone: string
  contact_email: string
  contact_instagram: string
}

const INITIAL: FormData = {
  title: '', location: '', province: undefined, description: '',
  images: [], imageUrls: [],
  blockedDates: [],
  price_per_night: 0, max_guests: 4, bedrooms: 1, bathrooms: 1,
  contact_whatsapp: '', contact_phone: '', contact_email: '', contact_instagram: '',
}

const STEPS = ['Propiedad', 'Fotos', 'Calendario', 'Precio', 'Contacto']

export default function PublicarPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(INITIAL)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.replace('/auth/login?next=/publicar')
      else setChecking(false)
    })
  }, [])

  if (checking) return null

  const update = (partial: Partial<FormData>) => setForm((f) => ({ ...f, ...partial }))
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  const publish = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()

      // Upload images
      const uploadedUrls: string[] = []
      for (const file of form.images) {
        const ext = file.name.split('.').pop()
        const path = `properties/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error } = await supabase.storage.from('property-images').upload(path, file)
        if (!error) {
          const { data } = supabase.storage.from('property-images').getPublicUrl(path)
          uploadedUrls.push(data.publicUrl)
        }
      }

      const { data: property, error: propError } = await supabase
        .from('properties')
        .insert({
          owner_id: user?.id ?? null,
          title: form.title,
          location: form.location,
          province: form.province,
          description: form.description,
          max_guests: form.max_guests,
          bedrooms: form.bedrooms,
          bathrooms: form.bathrooms,
          amenities: [],
          price_per_night: form.price_per_night,
          images: uploadedUrls,
          contact_phone: form.contact_phone || null,
          contact_email: form.contact_email || null,
          contact_whatsapp: form.contact_whatsapp || null,
          contact_instagram: form.contact_instagram || null,
          is_active: true,
        })
        .select()
        .single()

      if (propError) throw propError

      if (form.blockedDates.length > 0 && property) {
        await supabase.from('availability').insert(
          form.blockedDates.map((d) => ({
            property_id: property.id,
            date: d.toISOString().split('T')[0],
            is_available: false,
          }))
        )
      }

      toast.success('¡Propiedad publicada!')
      router.push(`/propiedades/${property.id}`)
    } catch (err) {
      console.error(err)
      toast.error('Hubo un error al publicar. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      {/* Step indicators */}
      <div className="flex items-center mb-10">
        {STEPS.map((label, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors
                ${i < step ? 'bg-primary border-primary text-primary-foreground' : ''}
                ${i === step ? 'bg-primary border-primary text-primary-foreground shadow-md' : ''}
                ${i > step ? 'bg-white border-muted-foreground/30 text-muted-foreground' : ''}
              `}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs mt-1 font-medium ${i === step ? 'text-primary' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mb-4 mx-1 ${i < step ? 'bg-primary' : 'bg-border'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
        {step === 0 && <Step1Info form={form} update={update} onNext={next} />}
        {step === 1 && <Step2Photos form={form} update={update} onNext={next} onPrev={prev} />}
        {step === 2 && <Step3Calendar form={form} update={update} onNext={next} onPrev={prev} />}
        {step === 3 && <Step4Precio form={form} update={update} onNext={next} onPrev={prev} />}
        {step === 4 && <Step5Contacto form={form} update={update} onPublish={publish} onPrev={prev} loading={loading} />}
      </div>
    </div>
  )
}
