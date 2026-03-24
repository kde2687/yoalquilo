'use client'

import { FormData } from './page'
import { Button } from '@/components/ui/button'
import { DayPicker } from 'react-day-picker'
import { es } from 'date-fns/locale'
import 'react-day-picker/style.css'
import { CalendarX, CalendarCheck, CheckCircle2 } from 'lucide-react'

export default function Step3Calendar({
  form, update, onNext, onPrev,
}: {
  form: FormData
  update: (p: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}) {
  const blocked = form.blockedDates
  const alwaysAvailable = form.alwaysAvailable

  const toggleAlwaysAvailable = (val: boolean) => {
    update({ alwaysAvailable: val, blockedDates: val ? [] : blocked })
  }

  const clearAll = () => update({ blockedDates: [] })

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Disponibilidad</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Indicá cómo querés manejar la disponibilidad de tu propiedad.
        </p>
      </div>

      {/* Toggle siempre disponible */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => toggleAlwaysAvailable(true)}
          className={`w-full flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-colors ${
            alwaysAvailable
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-muted-foreground/40'
          }`}
        >
          <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
            alwaysAvailable ? 'border-primary' : 'border-muted-foreground/40'
          }`}>
            {alwaysAvailable && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
          </div>
          <div>
            <p className="font-semibold text-sm">Siempre disponible</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              La disponibilidad final se confirma por contacto directo con el huésped.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => toggleAlwaysAvailable(false)}
          className={`w-full flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-colors ${
            !alwaysAvailable
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-muted-foreground/40'
          }`}
        >
          <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
            !alwaysAvailable ? 'border-primary' : 'border-muted-foreground/40'
          }`}>
            {!alwaysAvailable && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
          </div>
          <div>
            <p className="font-semibold text-sm">Marcar fechas no disponibles</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Bloqueá las fechas en las que la propiedad no está disponible.
            </p>
          </div>
        </button>
      </div>

      {/* Calendar — solo si no es siempre disponible */}
      {!alwaysAvailable && (
        <>
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
                <span>No bloqueaste ninguna fecha</span>
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
        </>
      )}

      {/* Mensaje cuando es siempre disponible */}
      {alwaysAvailable && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-800">Tu propiedad aparecerá como siempre disponible</p>
            <p className="text-xs text-green-700 mt-0.5">
              Los huéspedes podrán contactarte para confirmar disponibilidad para sus fechas.
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1 h-12 text-base">← Atrás</Button>
        <Button onClick={onNext} className="flex-1 h-12 text-base">Siguiente →</Button>
      </div>
    </div>
  )
}
