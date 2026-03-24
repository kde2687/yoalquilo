'use client'

import { DayPicker } from 'react-day-picker'
import { es } from 'date-fns/locale'
import 'react-day-picker/style.css'
import { CheckCircle2 } from 'lucide-react'

interface Props {
  blockedDates: string[]
  alwaysAvailable?: boolean | null
}

export default function AvailabilityCalendar({ blockedDates, alwaysAvailable }: Props) {
  if (alwaysAvailable ?? true) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-green-800">Disponible todo el año</p>
          <p className="text-xs text-green-700 mt-0.5">
            Contactá al propietario para confirmar disponibilidad para tus fechas.
          </p>
        </div>
      </div>
    )
  }

  const disabled = blockedDates.map((d) => new Date(d + 'T12:00:00'))
  const today = new Date()

  return (
    <div className="border border-border rounded-xl p-3 inline-block">
      <DayPicker
        mode="multiple"
        selected={disabled}
        disabled={[{ before: today }, ...disabled]}
        locale={es}
        numberOfMonths={1}
        classNames={{
          selected: 'bg-red-100 text-red-600 line-through opacity-50',
        }}
      />
      <div className="flex gap-4 text-xs text-muted-foreground mt-2 px-2">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-red-100 border border-red-200 inline-block" />
          No disponible
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-white border border-border inline-block" />
          Disponible
        </span>
      </div>
    </div>
  )
}
