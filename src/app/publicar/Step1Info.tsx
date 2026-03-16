'use client'

import { useState, useRef } from 'react'
import { FormData } from './page'
import { CITIES_BY_PROVINCE } from '@/lib/argentina-cities'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// ─── CityCombobox ─────────────────────────────────────────────────────────────

function CityCombobox({
  value,
  onChange,
  cities,
  disabled,
}: {
  value: string
  onChange: (v: string) => void
  cities: string[]
  disabled: boolean
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const filtered = query.trim()
    ? cities.filter((c) => c.toLowerCase().includes(query.trim().toLowerCase()))
    : cities

  const handleSelect = (city: string) => {
    setQuery(city)
    onChange(city)
    setOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    onChange(e.target.value)
    setOpen(true)
  }

  const handleFocus = () => {
    if (!disabled) setOpen(true)
  }

  const handleBlur = () => {
    // Small delay so that a click on a dropdown item registers before closing
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }

  // Keep query in sync when the parent resets the value (e.g. province change)
  // We use a ref-based approach: if parent passes '' we reset the local query.
  if (value === '' && query !== '') {
    setQuery('')
  }

  if (disabled) {
    return (
      <Input
        disabled
        placeholder="Primero seleccioná una provincia"
        className="h-12 text-base bg-muted"
      />
    )
  }

  return (
    <div className="relative">
      <Input
        placeholder="Escribí para buscar..."
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
        className="h-12 text-base"
      />
      {open && filtered.length > 0 && (
        <ul
          className="absolute z-50 w-full bg-white border border-border rounded-lg shadow-md mt-1 overflow-y-auto"
          style={{ maxHeight: 200 }}
          // Prevent blur from firing when the user clicks inside the list
          onMouseDown={(e) => {
            e.preventDefault()
            if (closeTimer.current) clearTimeout(closeTimer.current)
          }}
        >
          {filtered.map((city) => (
            <li
              key={city}
              onMouseDown={() => handleSelect(city)}
              className={`px-3 py-2 cursor-pointer text-sm hover:bg-muted ${
                city === value ? 'bg-muted font-medium' : ''
              }`}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Step1Info ────────────────────────────────────────────────────────────────

export default function Step1Info({
  form,
  update,
  onNext,
}: {
  form: FormData
  update: (p: Partial<FormData>) => void
  onNext: () => void
}) {
  const cities = form.province ? (CITIES_BY_PROVINCE[form.province] ?? []) : []
  const valid = form.title.trim() && form.location.trim() && !!form.province

  const handleProvinceChange = (province: string) => {
    update({ province: province || undefined, location: '' })
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Tu propiedad</h2>
        <p className="text-muted-foreground text-sm mt-1">Nombre, dónde está y una descripción.</p>
      </div>

      {/* Title */}
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

      {/* Province */}
      <div className="space-y-2">
        <Label htmlFor="province" className="text-base">Provincia</Label>
        <select
          id="province"
          value={form.province ?? ''}
          onChange={(e) => handleProvinceChange(e.target.value)}
          className="w-full h-12 text-base rounded-lg border border-input bg-white px-3 outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Seleccioná una provincia</option>
          {Object.keys(CITIES_BY_PROVINCE).sort().map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* City combobox */}
      <div className="space-y-2">
        <Label className="text-base">Ciudad o localidad</Label>
        <CityCombobox
          value={form.location}
          onChange={(v) => update({ location: v })}
          cities={cities}
          disabled={!form.province}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="desc" className="text-base">
          Descripción{' '}
          <span className="text-muted-foreground font-normal text-sm">(opcional)</span>
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
