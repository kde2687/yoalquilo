'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { X, Upload, Minus, Plus } from 'lucide-react'
import { Property } from '@/lib/types'

const PROVINCES = [
  'Buenos Aires', 'CABA', 'Córdoba', 'Mendoza', 'Santa Fe',
  'Salta', 'Jujuy', 'Tucumán', 'Misiones', 'Corrientes',
  'Entre Ríos', 'Chubut', 'Neuquén', 'Río Negro', 'San Luis',
  'La Rioja', 'Catamarca', 'Formosa', 'Chaco', 'Santiago del Estero',
  'San Juan', 'La Pampa', 'Santa Cruz', 'Tierra del Fuego',
]

function Counter({ label, value, min = 0, onChange }: {
  label: string; value: number; min?: number; onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <Label className="text-base">{label}</Label>
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted">
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-6 text-center font-semibold text-base">{value}</span>
        <button type="button" onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export default function EditForm({ property }: { property: Property }) {
  const [title, setTitle] = useState(property.title)
  const [location, setLocation] = useState(property.location)
  const [province, setProvince] = useState(property.province ?? '')
  const [description, setDescription] = useState(property.description ?? '')
  const [price, setPrice] = useState(property.price_per_night)
  const [maxGuests, setMaxGuests] = useState(property.max_guests)
  const [bedrooms, setBedrooms] = useState(property.bedrooms)
  const [bathrooms, setBathrooms] = useState(property.bathrooms)
  const [contactWhatsapp, setContactWhatsapp] = useState(property.contact_whatsapp ?? '')
  const [contactPhone, setContactPhone] = useState(property.contact_phone ?? '')
  const [contactEmail, setContactEmail] = useState(property.contact_email ?? '')
  const [contactInstagram, setContactInstagram] = useState(property.contact_instagram ?? '')
  const [existingImages, setExistingImages] = useState<string[]>(property.images ?? [])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [newPreviews, setNewPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const total = existingImages.length + newFiles.length
    const toAdd = Array.from(files).slice(0, 10 - total)
    setNewFiles((f) => [...f, ...toAdd])
    setNewPreviews((p) => [...p, ...toAdd.map((f) => URL.createObjectURL(f))])
  }

  const removeExisting = (i: number) => {
    setExistingImages((imgs) => imgs.filter((_, idx) => idx !== i))
  }

  const removeNew = (i: number) => {
    setNewFiles((f) => f.filter((_, idx) => idx !== i))
    setNewPreviews((p) => p.filter((_, idx) => idx !== i))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const hasContact = contactWhatsapp || contactPhone || contactEmail || contactInstagram
    if (!hasContact) {
      toast.error('Necesitás al menos un medio de contacto.')
      return
    }
    setLoading(true)
    try {
      const uploadedUrls: string[] = []
      for (const file of newFiles) {
        const ext = file.name.split('.').pop()
        const path = `properties/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error } = await supabase.storage.from('property-images').upload(path, file)
        if (!error) {
          const { data } = supabase.storage.from('property-images').getPublicUrl(path)
          uploadedUrls.push(data.publicUrl)
        }
      }

      const { error } = await supabase
        .from('properties')
        .update({
          title,
          location,
          province: province || null,
          description,
          price_per_night: price,
          max_guests: maxGuests,
          bedrooms,
          bathrooms,
          images: [...existingImages, ...uploadedUrls],
          contact_whatsapp: contactWhatsapp || null,
          contact_phone: contactPhone || null,
          contact_email: contactEmail || null,
          contact_instagram: contactInstagram || null,
        })
        .eq('id', property.id)

      if (error) throw error
      toast.success('Propiedad actualizada')
      router.push('/mis-propiedades')
      router.refresh()
    } catch {
      toast.error('Error al guardar. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const allImages = [
    ...existingImages.map((url) => ({ url, isNew: false, index: existingImages.indexOf(url) })),
    ...newPreviews.map((url, i) => ({ url, isNew: true, index: i })),
  ]

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Info */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-lg">Información</h2>
        <div className="space-y-2">
          <Label className="text-base">Nombre de la propiedad</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required className="h-12 text-base" />
        </div>
        <div className="space-y-2">
          <Label className="text-base">Ciudad o localidad</Label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} required className="h-12 text-base" />
        </div>
        <div className="space-y-2">
          <Label className="text-base">Provincia</Label>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full h-12 text-base rounded-lg border border-input bg-white px-3 outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Seleccioná una provincia</option>
            {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label className="text-base">Descripción <span className="text-muted-foreground font-normal text-sm">(opcional)</span></Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="text-base resize-none" />
        </div>
      </div>

      {/* Photos */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-lg">Fotos <span className="text-muted-foreground font-normal text-sm">({allImages.length}/10)</span></h2>
        {allImages.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {allImages.map(({ url, isNew, index }, i) => (
              <div key={url} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-24 object-cover rounded-lg" />
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded font-semibold">Portada</span>
                )}
                <button
                  type="button"
                  onClick={() => isNew ? removeNew(index) : removeExisting(index)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
        {allImages.length < 10 && (
          <div
            className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
            <p className="text-sm font-medium">Agregar fotos</p>
            <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          </div>
        )}
      </div>

      {/* Precio y capacidad */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-lg">Precio y capacidad</h2>
        <div className="space-y-2">
          <Label className="text-base">Precio por noche (en pesos)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
            <Input type="number" min={0} value={price || ''} onChange={(e) => setPrice(Number(e.target.value))} className="pl-7 h-12 text-base" />
          </div>
        </div>
        <div className="bg-muted/50 rounded-xl px-4">
          <Counter label="Personas" value={maxGuests} min={1} onChange={setMaxGuests} />
          <Counter label="Dormitorios" value={bedrooms} min={0} onChange={setBedrooms} />
          <Counter label="Baños" value={bathrooms} min={1} onChange={setBathrooms} />
        </div>
      </div>

      {/* Contacto */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-lg">Contacto</h2>
        <div className="space-y-2">
          <Label className="text-base">WhatsApp</Label>
          <Input type="tel" placeholder="+54 9 11 1234-5678" value={contactWhatsapp} onChange={(e) => setContactWhatsapp(e.target.value)} className="h-12 text-base" />
        </div>
        <div className="space-y-2">
          <Label className="text-base">Teléfono</Label>
          <Input type="tel" placeholder="+54 9 11 1234-5678" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="h-12 text-base" />
        </div>
        <div className="space-y-2">
          <Label className="text-base">Email</Label>
          <Input type="email" placeholder="tu@email.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="h-12 text-base" />
        </div>
        <div className="space-y-2">
          <Label className="text-base">Instagram</Label>
          <Input placeholder="@tunombre" value={contactInstagram} onChange={(e) => setContactInstagram(e.target.value)} className="h-12 text-base" />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading} className="flex-1 h-12 text-base">
          Cancelar
        </Button>
        <Button type="submit" disabled={loading} className="flex-1 h-12 text-base font-semibold">
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  )
}
