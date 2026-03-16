'use client'

import { FormData } from './page'
import { Button } from '@/components/ui/button'
import { DayPicker } from 'react-day-picker'
import { es } from 'date-fns/locale'
import 'react-day-picker/style.css'
import { CalendarX, CalendarCheck } from 'lucide-react'

export default function Step3Calendar({
  form, update, onNext, onPrev,
}: {
  form: FormData
  update: (p: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}) {
  const blocked = form.blockedDates

  const clearAll = () => update({ blockedDates: [] })

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Disponibilidad</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Hacé clic en las fechas que <strong>no están disponibles</strong> para reservar. Podés saltear este paso si todo el año está disponible.
        </p>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-primary" />
          <span className="text-muted-foreground">Bloqueada / ocupada</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full border border-border bg-white" />
          <span className="text-muted-foreground">Disponible</span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="border border-border rounded-xl p-2">
          <DayPicker
            mode="multiple"
            selected={blocked}
            onSelect={(dates) => update({ blockedDates: dates ?? [] })}
            disabled={[{ before: new Date() }]}
            locale={es}
            modifiersClassNames={{
              selected: 'rdp-day_blocked',
            }}
          />
        </div>
      </div>

      {/* Status */}
      <div className="bg-muted/50 rounded-xl p-3 flex items-center justify-between">
        {blocked.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-green-700">
            <CalendarCheck className="w-4 h-4" />
            <span>Todo disponible — no bloqueaste ninguna fecha</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <CalendarX className="w-4 h-4" />
            <span>{blocked.length} fecha{blocked.length !== 1 ? 's' : ''} bloqueada{blocked.length !== 1 ? 's' : ''}</span>
          </div>
        )}
        {blocked.length > 0 && (
          <button onClick={clearAll} className="text-xs text-muted-foreground underline hover:text-foreground">
            Limpiar todo
          </button>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1 h-12 text-base">← Atrás</Button>
        <Button onClick={onNext} className="flex-1 h-12 text-base">Siguiente →</Button>
      </div>
    </div>
  )
}
