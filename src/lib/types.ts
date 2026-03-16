export type Property = {
  id: string
  owner_id: string
  title: string
  description: string | null
  location: string
  province: string | undefined
  price_per_night: number
  max_guests: number
  bedrooms: number
  bathrooms: number
  amenities: string[]
  images: string[]
  contact_phone: string | null
  contact_email: string | null
  contact_whatsapp: string | null
  contact_instagram: string | null
  is_active: boolean
  created_at: string
}

export type AvailabilityDate = {
  id: string
  property_id: string
  date: string
  is_available: boolean
}

export type Review = {
  id: string
  property_id: string
  owner_id: string | null
  review_type: 'guest_to_property' | 'host_to_guest'
  token: string
  status: 'pending' | 'completed'
  reviewer_name: string
  reviewer_email: string
  host_name: string
  rating: number | null
  comment: string | null
  expires_at: string
  created_at: string
  completed_at: string | null
}

export type Profile = {
  id: string
  email: string
  full_name: string | null
  is_owner: boolean
  subscription_active: boolean
  created_at: string
}
