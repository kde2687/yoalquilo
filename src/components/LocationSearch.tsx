'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPin, Search } from 'lucide-react'

interface Props {
  places: string[]
  defaultValue?: string
}

export default function LocationSearch({ places, defaultValue = '' }: Props) {
  const [value, setValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const [filtered, setFiltered] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const q = value.toLowerCase().trim()
    if (q.length > 0) {
      const starts = places.filter(p => p.toLowerCase().startsWith(q))
      const contains = places.filter(p => !p.toLowerCase().startsWith(q) && p.toLowerCase().includes(q))
      setFiltered([...starts, ...contains].slice(0, 8))
    } else {
      setFiltered([])
    }
  }, [value, places])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function selectPlace(place: string) {
    setValue(place)
    setOpen(false)
    inputRef.current?.closest('form')?.requestSubmit()
  }

  return (
    <div ref={containerRef} className="relative flex-1">
      <input type="hidden" name="lugar" value={value} />
      <div className="flex flex-col text-left">
        <label className="text-xs font-semibold text-gray-800 px-1">¿A dónde?</label>
        <input
          ref={inputRef}
          value={value}
          onChange={e => { setValue(e.target.value); setOpen(true) }}
          onFocus={() => { if (value.length > 0) setOpen(true) }}
          placeholder="Buscá destino"
          autoComplete="off"
          className="outline-none bg-transparent text-gray-800 placeholder:text-gray-400 text-sm font-normal px-1 pt-0.5"
        />
      </div>

      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 w-72">
          {filtered.map(place => (
            <button
              key={place}
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors"
              onMouseDown={() => selectPlace(place)}
            >
              <div className="bg-gray-100 rounded-xl p-2 shrink-0">
                <MapPin className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm text-gray-800">{place}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
