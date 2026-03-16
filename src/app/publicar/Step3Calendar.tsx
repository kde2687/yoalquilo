'use client'

import { FormData } from './page'
import { Button } from '@/components/ui/button'
import { DayPicker } from 'react-day-picker'
import { es } from 'date-fns/locale'
import 'react-day-picker/style.css'

export default function Step3Calendar({
  form, update, onNext, onPrev,
}: {
  form: FormData
  update: (p: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Disponibilidad</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Marcá las fechas que ya están ocupadas o bloqueadas. Podés saltear este paso.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="border border-border rounded-xl p-2">
          <DayPicker
            mode="multiple"
            selected={form.blockedDates}
            onSelect={(dates) => update({ blockedDates: dates ?? [] })}
            disabled={[{ before: new Date() }]}
            locale={es}
          />
        </div>
      </div>

      {form.blockedDates.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          {form.blockedDates.length} fecha{form.blockedDates.length !== 1 ? 's' : ''} bloqueada{form.blockedDates.length !== 1 ? 's' : ''}
        </p>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1 h-12 text-base">← Atrás</Button>
        <Button onClick={onNext} className="flex-1 h-12 text-base">Siguiente →</Button>
      </div>
    </div>
  )
}
