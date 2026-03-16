'use client'

import { DayPicker } from 'react-day-picker'
import { es } from 'date-fns/locale'
import 'react-day-picker/style.css'

export default function AvailabilityCalendar({ blockedDates }: { blockedDates: string[] }) {
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
