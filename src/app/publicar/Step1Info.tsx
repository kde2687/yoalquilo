'use client'

import { FormData } from './page'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const PROVINCES = [
  'Buenos Aires', 'CABA', 'Córdoba', 'Mendoza', 'Santa Fe',
  'Salta', 'Jujuy', 'Tucumán', 'Misiones', 'Corrientes',
  'Entre Ríos', 'Chubut', 'Neuquén', 'Río Negro', 'San Luis',
  'La Rioja', 'Catamarca', 'Formosa', 'Chaco', 'Santiago del Estero',
  'San Juan', 'La Pampa', 'Santa Cruz', 'Tierra del Fuego',
]

export default function Step1Info({
  form, update, onNext,
}: {
  form: FormData
  update: (p: Partial<FormData>) => void
  onNext: () => void
}) {
  const valid = form.title.trim() && form.location.trim() && !!form.province

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Tu propiedad</h2>
        <p className="text-muted-foreground text-sm mt-1">Nombre, dónde está y una descripción.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title" className="text-base">Nombre de la propiedad</Label>
        <Input
          id="title"
          placeholder="Ej: Casa en la sierra con pileta"
          value={form.title}
          onChange={(e) => update({ title: e.target.value })}
          className="h-12 text-base"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-base">Ciudad o localidad</Label>
        <Input
          id="location"
          placeholder="Ej: Villa General Belgrano"
          value={form.location}
          onChange={(e) => update({ location: e.target.value })}
          className="h-12 text-base"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="province" className="text-base">Provincia</Label>
        <select
          id="province"
          value={form.province ?? ''}
          onChange={(e) => update({ province: e.target.value || undefined })}
          className="w-full h-12 text-base rounded-lg border border-input bg-white px-3 outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Seleccioná una provincia</option>
          {PROVINCES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="desc" className="text-base">
          Descripción <span className="text-muted-foreground font-normal text-sm">(opcional)</span>
        </Label>
        <Textarea
          id="desc"
          placeholder="Describí tu propiedad: ambiente, entorno, qué la hace especial..."
          value={form.description}
          onChange={(e) => update({ description: e.target.value })}
          rows={4}
          className="text-base resize-none"
        />
      </div>

      <Button onClick={onNext} disabled={!valid} className="w-full h-12 text-base">
        Siguiente →
      </Button>
    </div>
  )
}
