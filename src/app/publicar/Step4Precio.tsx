'use client'

import { FormData } from './page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Minus, Plus } from 'lucide-react'

function Counter({ label, value, min = 0, onChange }: {
  label: string; value: number; min?: number; onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <Label className="text-base">{label}</Label>
      <div className="flex items-center gap-4">
        <button onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted">
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-6 text-center font-semibold text-base">{value}</span>
        <button onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export default function Step4Precio({
  form, update, onNext, onPrev,
}: {
  form: FormData
  update: (p: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}) {
  const valid = form.price_per_night > 0

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Precio y capacidad</h2>
        <p className="text-muted-foreground text-sm mt-1">¿Cuánto cobrás por noche y cuántas personas entran?</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price" className="text-base">Precio por noche (en pesos)</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
          <Input
            id="price"
            type="number"
            min={0}
            placeholder="0"
            value={form.price_per_night || ''}
            onChange={(e) => update({ price_per_night: Number(e.target.value) })}
            className="pl-7 h-12 text-base"
          />
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl px-4">
        <Counter label="Personas" value={form.max_guests} min={1} onChange={(v) => update({ max_guests: v })} />
        <Counter label="Dormitorios" value={form.bedrooms} min={0} onChange={(v) => update({ bedrooms: v })} />
        <Counter label="Baños" value={form.bathrooms} min={1} onChange={(v) => update({ bathrooms: v })} />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1 h-12 text-base">← Atrás</Button>
        <Button onClick={onNext} disabled={!valid} className="flex-1 h-12 text-base">Siguiente →</Button>
      </div>
    </div>
  )
}
