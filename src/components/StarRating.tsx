import { Star } from 'lucide-react'

export default function StarRating({
  rating,
  count,
  size = 'sm',
}: {
  rating: number
  count?: number
  size?: 'sm' | 'md'
}) {
  const w = size === 'md' ? 'w-5 h-5' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`${w} ${s <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/25'}`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-sm text-muted-foreground">({count})</span>
      )}
    </div>
  )
}
