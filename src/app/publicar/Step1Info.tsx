'use client'

import { FormData } from './page'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const CITIES_BY_PROVINCE: Record<string, string[]> = {
  'Buenos Aires': ['Mar del Plata', 'La Plata', 'Bahía Blanca', 'Tandil', 'Pinamar', 'Villa Gesell', 'Necochea', 'Miramar', 'Monte Hermoso', 'San Bernardo', 'Mar de Ajó', 'Santa Teresita', 'Cariló', 'Tigre', 'San Antonio de Areco', 'Luján', 'Zárate', 'Campana', 'Olavarría', 'Azul', 'Pergamino', 'Junín', 'Mercedes', 'Lobos', 'Chascomús', 'Dolores', 'Benito Juárez', 'Tres Arroyos', 'Coronel Suárez', 'Pehuajó'],
  'CABA': ['Palermo', 'Belgrano', 'San Telmo', 'Puerto Madero', 'Recoleta', 'Caballito', 'Almagro', 'Villa Crespo', 'Núñez', 'Colegiales', 'Chacarita', 'Villa Urquiza', 'Flores', 'Floresta', 'Devoto', 'Mataderos', 'Liniers', 'Boedo', 'Parque Patricios', 'La Boca'],
  'Córdoba': ['Córdoba Capital', 'Villa Carlos Paz', 'Villa General Belgrano', 'Alta Gracia', 'La Falda', 'Cosquín', 'Villa La Angostura', 'Mina Clavero', 'Río Cuarto', 'San Francisco', 'Villa María', 'Bell Ville', 'Jesús María', 'Río Tercero', 'La Carlota', 'Laboulaye', 'Cabrera', 'Almafuerte', 'Embalse', 'Cruz del Eje'],
  'Mendoza': ['Mendoza Capital', 'San Rafael', 'Malargüe', 'Luján de Cuyo', 'Maipú', 'Godoy Cruz', 'Las Heras', 'Rivadavia', 'Tunuyán', 'San Martín', 'Junín', 'La Paz', 'Santa Rosa', 'General Alvear', 'Uspallata'],
  'Santa Fe': ['Rosario', 'Santa Fe Capital', 'Venado Tuerto', 'Rafaela', 'Reconquista', 'Villa Constitución', 'Santo Tomé', 'Esperanza', 'Casilda', 'Cañada de Gómez', 'San Lorenzo', 'Funes', 'Granadero Baigorria', 'Firmat', 'Galvez'],
  'Salta': ['Salta Capital', 'San Miguel de Tucumán', 'Cafayate', 'Tartagal', 'Orán', 'Metán', 'Rosario de la Frontera', 'Cachi', 'Molinos', 'Iruya', 'La Poma', 'Tolar Grande'],
  'Jujuy': ['San Salvador de Jujuy', 'Palpalá', 'Libertador General San Martín', 'Tilcara', 'Humahuaca', 'Purmamarca', 'Tumbaya', 'La Quiaca', 'Abra Pampa'],
  'Tucumán': ['San Miguel de Tucumán', 'Yerba Buena', 'Tafí Viejo', 'Concepción', 'Tafí del Valle', 'Amaicha del Valle', 'Banda del Río Salí', 'Aguilares', 'Monteros'],
  'Misiones': ['Posadas', 'Oberá', 'Puerto Iguazú', 'Eldorado', 'Apóstoles', 'San Ignacio', 'Wanda', 'Jardín América'],
  'Corrientes': ['Corrientes Capital', 'Goya', 'Paso de la Patria', 'Ituzaingó', 'Mercedes', 'Curuzú Cuatiá', 'Santo Tomé', 'Esquina'],
  'Entre Ríos': ['Paraná', 'Concordia', 'Gualeguaychú', 'Colón', 'Federación', 'Villaguay', 'Gualeguay', 'Victoria', 'Concepción del Uruguay', 'Chajarí'],
  'Chubut': ['Rawson', 'Comodoro Rivadavia', 'Puerto Madryn', 'Trelew', 'Esquel', 'Rada Tilly', 'Gaiman', 'Dolavon', 'El Maitén'],
  'Neuquén': ['Neuquén Capital', 'San Martín de los Andes', 'Villa La Angostura', 'Bariloche', 'Zapala', 'Cutral Có', 'Junín de los Andes', 'Aluminé', 'Las Lajas', 'Caviahue'],
  'Río Negro': ['Viedma', 'San Carlos de Bariloche', 'General Roca', 'Cipolletti', 'Allen', 'El Bolsón', 'Villa Regina', 'Las Grutas', 'San Antonio Oeste', 'Choele Choel'],
  'San Luis': ['San Luis Capital', 'Villa Mercedes', 'Merlo', 'Potrero de los Funes', 'La Punta', 'Juana Koslay', 'Carpintería'],
  'La Rioja': ['La Rioja Capital', 'Chilecito', 'Aimogasta', 'Chamical', 'Chepes', 'Villa Unión', 'Vinchina'],
  'Catamarca': ['San Fernando del Valle de Catamarca', 'Tinogasta', 'Santa María', 'Belén', 'Andalgalá', 'Fiambalá'],
  'Formosa': ['Formosa Capital', 'Clorinda', 'Pirané', 'El Colorado', 'Ingeniero Juárez'],
  'Chaco': ['Resistencia', 'Presidencia Roque Sáenz Peña', 'Villa Ángela', 'Charata', 'Quitilipi', 'Las Breñas'],
  'Santiago del Estero': ['Santiago del Estero Capital', 'La Banda', 'Termas de Río Hondo', 'Añatuya', 'Frías', 'Fernández'],
  'San Juan': ['San Juan Capital', 'Rawson', 'Rivadavia', 'Caucete', 'Jachal', 'Valle Fértil', 'Barreal'],
  'La Pampa': ['Santa Rosa', 'General Pico', 'Toay', 'Realicó', 'General Acha', 'Eduardo Castex'],
  'Santa Cruz': ['Río Gallegos', 'Caleta Olivia', 'El Calafate', 'El Chaltén', 'Puerto Deseado', 'Perito Moreno', 'Las Heras'],
  'Tierra del Fuego': ['Ushuaia', 'Río Grande', 'Tolhuin'],
}

export default function Step1Info({
  form, update, onNext,
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

      <div className="space-y-2">
        <Label htmlFor="province" className="text-base">Provincia</Label>
        <select
          id="province"
          value={form.province ?? ''}
          onChange={(e) => handleProvinceChange(e.target.value)}
          className="w-full h-12 text-base rounded-lg border border-input bg-white px-3 outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Seleccioná una provincia</option>
          {Object.keys(CITIES_BY_PROVINCE).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-base">Ciudad o localidad</Label>
        {cities.length > 0 ? (
          <select
            id="location"
            value={form.location}
            onChange={(e) => update({ location: e.target.value })}
            className="w-full h-12 text-base rounded-lg border border-input bg-white px-3 outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Seleccioná una ciudad</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        ) : (
          <select disabled className="w-full h-12 text-base rounded-lg border border-input bg-muted px-3 text-muted-foreground">
            <option>Primero seleccioná una provincia</option>
          </select>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="desc" className="text-base">
          Descripción <span className="text-muted-foreground font-normal text-sm">(opcional)</span>
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
