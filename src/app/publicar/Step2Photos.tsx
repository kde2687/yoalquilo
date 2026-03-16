'use client'

import { FormData } from './page'
import { Button } from '@/components/ui/button'
import { Upload, X, GripVertical } from 'lucide-react'
import { useRef, useState } from 'react'

const MIN_PHOTOS = 5

export default function Step2Photos({
  form,
  update,
  onNext,
  onPrev,
}: {
  form: FormData
  update: (p: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragIndex = useRef<number | null>(null)
  const [dragOver, setDragOver] = useState<number | null>(null)

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const newFiles = Array.from(files).slice(0, 10 - form.images.length)
    const previews = newFiles.map((f) => URL.createObjectURL(f))
    update({
      images: [...form.images, ...newFiles],
      imageUrls: [...form.imageUrls, ...previews],
    })
  }

  const removeImage = (i: number) => {
    const imgs = [...form.images]
    const urls = [...form.imageUrls]
    imgs.splice(i, 1)
    urls.splice(i, 1)
    update({ images: imgs, imageUrls: urls })
  }

  const onDragStart = (i: number) => {
    dragIndex.current = i
  }

  const onDragEnter = (i: number) => {
    setDragOver(i)
  }

  const onDrop = (i: number) => {
    const from = dragIndex.current
    if (from === null || from === i) {
      setDragOver(null)
      return
    }
    const imgs = [...form.images]
    const urls = [...form.imageUrls]
    const [imgMoved] = imgs.splice(from, 1)
    const [urlMoved] = urls.splice(from, 1)
    imgs.splice(i, 0, imgMoved)
    urls.splice(i, 0, urlMoved)
    update({ images: imgs, imageUrls: urls })
    dragIndex.current = null
    setDragOver(null)
  }

  const valid = form.images.length >= MIN_PHOTOS

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Fotos de tu propiedad</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Mínimo {MIN_PHOTOS} fotos. La primera es la portada — arrastrá para reordenar.
        </p>
      </div>

      {form.images.length < 10 && (
        <div
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            handleFiles(e.dataTransfer.files)
          }}
        >
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-base font-medium">Tocá para agregar fotos</p>
          <p className="text-sm text-muted-foreground">o arrastrá las imágenes acá</p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      {form.imageUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {form.imageUrls.map((url, i) => (
            <div
              key={url}
              draggable
              onDragStart={() => onDragStart(i)}
              onDragEnter={() => onDragEnter(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(i)}
              onDragEnd={() => setDragOver(null)}
              className={`relative group rounded-lg overflow-hidden border-2 transition-all cursor-grab active:cursor-grabbing ${
                dragOver === i ? 'border-primary scale-95 opacity-70' : 'border-transparent'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Foto ${i + 1}`}
                className="w-full h-24 object-cover"
                draggable={false}
              />
              <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded p-0.5">
                <GripVertical className="w-3.5 h-3.5 text-white" />
              </div>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded font-semibold">
                  Portada
                </span>
              )}
              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <span className={form.images.length < MIN_PHOTOS ? 'text-destructive' : 'text-muted-foreground'}>
          {form.images.length} de {MIN_PHOTOS} fotos mínimas
          {form.images.length >= MIN_PHOTOS && ' ✓'}
        </span>
        <span className="text-muted-foreground">{form.images.length}/10</span>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1 h-12 text-base">
          ← Atrás
        </Button>
        <Button onClick={onNext} disabled={!valid} className="flex-1 h-12 text-base">
          Siguiente →
        </Button>
      </div>
    </div>
  )
}
