'use client'

import { FormData } from './page'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const CITIES_BY_PROVINCE: Record<string, string[]> = {
  'Buenos Aires': [
    'Adolfo Alsina', 'Adolfo Gonzales Chaves', 'Aguas Verdes', 'Alberti', 'Alberdi', 'Azul',
    'Bahía Blanca', 'Balcarce', 'Baradero', 'Benito Juárez', 'Berisso', 'Bolívar', 'Bragado',
    'Brandsen', 'Campana', 'Cañuelas', 'Cariló', 'Carmen de Areco', 'Chascomús', 'Chivilcoy',
    'Claromecó', 'Coronel Brandsen', 'Coronel Dorrego', 'Coronel Pringles', 'Coronel Rosales',
    'Coronel Suárez', 'Darregueira', 'Dolores', 'Ensenada', 'Escobar', 'Exaltación de la Cruz',
    'Florentino Ameghino', 'General Arenales', 'General Belgrano', 'General Guido', 'General Juan Madariaga',
    'General La Madrid', 'General Las Heras', 'General Lavalle', 'General Paz', 'General Pinto',
    'General Pueyrredón', 'General Rodríguez', 'General San Martín', 'General Villegas', 'Gonzales Chaves',
    'Guaminí', 'Hipólito Yrigoyen', 'Junín', 'La Plata', 'Laprida', 'Las Flores', 'Leandro N. Alem',
    'Lincoln', 'Lobería', 'Lobos', 'Lomas de Zamora', 'Luján', 'Maipú', 'Mar Chiquita',
    'Mar de Ajó', 'Mar del Plata', 'Mar del Tuyú', 'Mercedes', 'Merlo', 'Miramar', 'Monte',
    'Monte Hermoso', 'Moreno', 'Morón', 'Navarro', 'Necochea', 'Nueve de Julio', 'Olavarría',
    'Patagones', 'Pellegrini', 'Pehuajó', 'Pergamino', 'Pinamar', 'Pilar', 'Puan',
    'Punta Indio', 'Quilmes', 'Rauch', 'Rivadavia', 'Rojas', 'Roque Pérez', 'Saavedra',
    'Saladillo', 'Salliqueló', 'Salto', 'San Andrés de Giles', 'San Antonio de Areco',
    'San Bernardo', 'San Cayetano', 'San Miguel del Monte', 'San Nicolás', 'San Pedro',
    'San Vicente', 'Santa Teresita', 'Suipacha', 'Tandil', 'Tapalqué', 'Tigre',
    'Tordillo', 'Tornquist', 'Trenque Lauquen', 'Tres Arroyos', 'Tres Lomas', 'Veinticinco de Mayo',
    'Villa Gesell', 'Villarino', 'Zárate',
  ],
  'CABA': [
    'Agronomía', 'Almagro', 'Balvanera', 'Barracas', 'Belgrano', 'Boedo', 'Caballito',
    'Chacarita', 'Coghlan', 'Colegiales', 'Constitución', 'Flores', 'Floresta', 'La Boca',
    'La Paternal', 'Las Cañitas', 'Liniers', 'Mataderos', 'Monte Castro', 'Montserrat',
    'Nueva Pompeya', 'Núñez', 'Palermo', 'Parque Avellaneda', 'Parque Chacabuco',
    'Parque Chas', 'Parque Patricios', 'Puerto Madero', 'Recoleta', 'Retiro', 'Saavedra',
    'San Cristóbal', 'San Nicolás', 'San Telmo', 'Vélez Sársfield', 'Versalles',
    'Villa Crespo', 'Villa del Parque', 'Villa Devoto', 'Villa General Mitre', 'Villa Lugano',
    'Villa Luro', 'Villa Ortúzar', 'Villa Pueyrredón', 'Villa Real', 'Villa Riachuelo',
    'Villa Santa Rita', 'Villa Soldati', 'Villa Urquiza',
  ],
  'Córdoba': [
    'Adelia María', 'Alta Gracia', 'Almafuerte', 'Arroyito', 'Bell Ville', 'Berrotarán',
    'Brinkmann', 'Cabrera', 'Camilo Aldao', 'Capilla del Monte', 'Carlos Paz', 'Carrilobo',
    'Cholí', 'Córdoba Capital', 'Cosquín', 'Cruz del Eje', 'Dean Funes', 'Embalse',
    'Hernando', 'Huerta Grande', 'Jesús María', 'Juárez Celman', 'La Carlota', 'La Falda',
    'La Para', 'Laboulaye', 'Laguna Larga', 'Las Varillas', 'Leones', 'Los Cocos',
    'Luque', 'Malagueño', 'Marcos Juárez', 'Mina Clavero', 'Morrison', 'Noetinger',
    'Oliva', 'Oncativo', 'Río Ceballos', 'Río Cuarto', 'Río Segundo', 'Río Tercero',
    'Sacanta', 'San Francisco', 'Santa Rosa de Calamuchita', 'Tancacha', 'Ticino',
    'Tío Pujio', 'Unquillo', 'Valle Hermoso', 'Villa Allende', 'Villa Carlos Paz',
    'Villa Ciudad de América', 'Villa Cura Brochero', 'Villa del Rosario', 'Villa Dolores',
    'Villa General Belgrano', 'Villa Giardino', 'Villa La Angostura', 'Villa María',
    'Villa Nueva', 'Villa Rumipal', 'Villa del Lago',
  ],
  'Mendoza': [
    'Agrelo', 'Barrancas', 'Bardas Blancas', 'Bowen', 'Chacras de Coria', 'Ciudad de Mendoza',
    'Eugenio Bustos', 'General Alvear', 'Godoy Cruz', 'Guaymallén', 'Junín', 'La Paz',
    'Las Heras', 'Lavalle', 'Luján de Cuyo', 'Maipú', 'Malargüe', 'Pedriel', 'Perdriel',
    'Potrerillos', 'Rivadavia', 'San Carlos', 'San Martín', 'San Rafael', 'Santa Rosa',
    'Tunuyán', 'Tupungato', 'Uspallata', 'Vista Flores', 'Vistalba',
  ],
  'Santa Fe': [
    'Alcorta', 'Armstrong', 'Avellaneda', 'Bella Italia', 'Bombal', 'Cañada de Gómez',
    'Casilda', 'Castellanos', 'Capitán Bermúdez', 'Carlos Pellegrini', 'Carcarañá',
    'Ceres', 'Coronda', 'El Trébol', 'Esperanza', 'Firmat', 'Funes', 'Galvez',
    'Gálvez', 'Granadero Baigorria', 'Hughes', 'Laguna Paiva', 'Las Rosas', 'Las Parejas',
    'Malabrigo', 'Pérez', 'Piamonte', 'Rafaela', 'Reconquista', 'Rosario', 'Rufino',
    'San Cristóbal', 'San Genaro', 'San Jorge', 'San Justo', 'San Lorenzo', 'Santa Fe Capital',
    'Santo Tomé', 'Sunchales', 'Tostado', 'Venado Tuerto', 'Vera', 'Villa Constitución',
    'Villa Gobernador Gálvez', 'Wheelwright',
  ],
  'Salta': [
    'Cafayate', 'Cachi', 'Campo Quijano', 'Chicoana', 'Embarcación', 'General Güemes',
    'Iruya', 'La Poma', 'La Viña', 'Metán', 'Molinos', 'Orán', 'Payogasta', 'Rivadavia',
    'Rosario de la Frontera', 'Rosario de Lerma', 'Salta Capital', 'San Antonio de los Cobres',
    'San Ramón de la Nueva Orán', 'Santa Rosa de Tastil', 'Tartagal', 'Tolar Grande',
  ],
  'Jujuy': [
    'Abra Pampa', 'El Aguilar', 'El Carmen', 'Fraile Pintado', 'Humahuaca', 'La Quiaca',
    'Libertador General San Martín', 'Maimará', 'Palpalá', 'Purmamarca', 'San Pedro de Jujuy',
    'San Salvador de Jujuy', 'Santa Catalina', 'Susques', 'Tilcara', 'Tumbaya', 'Uquía', 'Yavi',
  ],
  'Tucumán': [
    'Aguilares', 'Alderetes', 'Amaicha del Valle', 'Banda del Río Salí', 'Bella Vista',
    'Concepción', 'El Cadillal', 'Famaillá', 'Graneros', 'Juan Bautista Alberdi',
    'La Cocha', 'Leales', 'Lules', 'Monteros', 'San Miguel de Tucumán', 'Simoca',
    'Tafí del Valle', 'Tafí Viejo', 'Trancas', 'Yerba Buena',
  ],
  'Misiones': [
    'Apóstoles', 'Aristóbulo del Valle', 'Bernardo de Irigoyen', 'Campo Grande', 'Candelaria',
    'Capioví', 'Colonia Aurora', 'Dos de Mayo', 'El Dorado', 'Garupá', 'Iguazú',
    'Jardín América', 'Leandro N. Alem', 'Montecarlo', 'Oberá', 'Posadas',
    'Puerto Iguazú', 'Puerto Rico', 'San Ignacio', 'San Javier', 'San Pedro', 'Wanda',
  ],
  'Corrientes': [
    'Bella Vista', 'Bonpland', 'Concepción', 'Corrientes Capital', 'Curuzú Cuatiá',
    'Empedrado', 'Esquina', 'Goya', 'Ituzaingó', 'Itatí', 'Loreto', 'Mercedes',
    'Mburucuyá', 'Monte Caseros', 'Paso de la Patria', 'Saladas', 'San Cosme', 'San Luis del Palmar',
    'San Roque', 'Santa Rosa', 'Santo Tomé', 'Yapeyú',
  ],
  'Entre Ríos': [
    'Basavilbaso', 'Chajarí', 'Colón', 'Concordia', 'Crespo', 'Diamante', 'Federación',
    'Federal', 'General Ramírez', 'Gualeguay', 'Gualeguaychú', 'Hasenkamp', 'Hernandarias',
    'La Paz', 'Nogoyá', 'Paraná', 'San José', 'Santa Elena', 'Urdinarrain', 'Victoria',
    'Villaguay', 'Concepción del Uruguay',
  ],
  'Chubut': [
    'Alto Río Senguer', 'Camarones', 'Comodoro Rivadavia', 'Dolavon', 'El Maitén',
    'Esquel', 'Gaiman', 'Lago Puelo', 'Las Plumas', 'Puerto Madryn', 'Puerto Pirámides',
    'Rada Tilly', 'Rawson', 'Río Mayo', 'Río Senguer', 'Sarmiento', 'Tecka', 'Trelew',
    'Trevelin',
  ],
  'Neuquén': [
    'Aluminé', 'Andacollo', 'Bariloche', 'Caviahue', 'Centenario', 'Copahue', 'Cutral Có',
    'El Huecú', 'Junín de los Andes', 'Las Coloradas', 'Las Lajas', 'Loncopué',
    'Neuquén Capital', 'Plaza Huincul', 'San Martín de los Andes', 'San Patricio del Chañar',
    'Villa El Chocón', 'Villa La Angostura', 'Villa Pehuenia', 'Zapala',
  ],
  'Río Negro': [
    'Allen', 'Bariloche', 'Cervantes', 'Chichinales', 'Choele Choel', 'Cinco Saltos',
    'Cipolletti', 'Comallo', 'El Bolsón', 'El Cuy', 'Fray Luis Beltrán', 'General Conesa',
    'General Enrique Godoy', 'General Fernández Oro', 'General Roca', 'Ingeniero Jacobacci',
    'Lamarque', 'Las Grutas', 'Los Menucos', 'Mainqué', 'Maquinchao', 'Ministro Ramos Mexía',
    'Río Colorado', 'San Antonio Oeste', 'Sierra Colorada', 'Sierra Grande', 'Viedma',
    'Villa Regina',
  ],
  'San Luis': [
    'Arizona', 'Buena Esperanza', 'Carpintería', 'Concarán', 'Juan Martín de Pueyrredón',
    'Juana Koslay', 'La Punta', 'La Toma', 'Merlo', 'Naschel', 'Navia', 'Quines',
    'Potrero de los Funes', 'San Francisco del Monte de Oro', 'San Luis Capital',
    'San Martín', 'Tilisarao', 'Villa Mercedes',
  ],
  'La Rioja': [
    'Aimogasta', 'Chamical', 'Chepes', 'Chilecito', 'Famatina', 'General Ángel Vicente Peñaloza',
    'General Belgrano', 'General Juan Facundo Quiroga', 'Guandacol', 'La Rioja Capital',
    'Patquía', 'Ulapes', 'Villa Sanagasta', 'Villa Unión', 'Vinchina',
  ],
  'Catamarca': [
    'Aconquija', 'Andalgalá', 'Antofagasta de la Sierra', 'Belén', 'Capayán',
    'El Rodeo', 'Fiambalá', 'Huillapima', 'Icaño', 'Londres', 'Mutquín',
    'San Fernando del Valle de Catamarca', 'Santa María', 'Santa Rosa', 'Tinogasta',
  ],
  'Formosa': [
    'Clorinda', 'El Colorado', 'Formosa Capital', 'General Lucio Victorio Mansilla',
    'Ingeniero Juárez', 'Las Lomitas', 'Mayor Vicente Villafuerte', 'Pirané', 'Pozo del Tigre',
  ],
  'Chaco': [
    'Avia Terai', 'Barranqueras', 'Charata', 'Chorotis', 'Corzuela', 'El Sauzal',
    'Fontana', 'General San Martín', 'Hermoso Campo', 'Juan José Castelli', 'La Escondida',
    'La Tigra', 'Las Breñas', 'Machagai', 'Makallé', 'Pampa del Indio', 'Pampa del Infierno',
    'Presidencia de la Plaza', 'Presidencia Roque Sáenz Peña', 'Puerto Tirol',
    'Quitilipi', 'Resistencia', 'Roque Sáenz Peña', 'San Bernardo', 'Santa Sylvina',
    'Taco Pozo', 'Villa Ángela',
  ],
  'Santiago del Estero': [
    'Añatuya', 'Bandera', 'Campo Gallo', 'Choya', 'Fernández', 'Frías', 'Garza',
    'La Banda', 'Loreto', 'Los Juríes', 'Miraflores', 'Monte Quemado', 'Nueva Esperanza',
    'Quimilí', 'Río Hondo', 'Robles', 'Santiago del Estero Capital', 'Selva',
    'Suncho Corral', 'Termas de Río Hondo', 'Tintina', 'Villa Atamisqui',
  ],
  'San Juan': [
    'Albardón', 'Angaco', 'Barreal', 'Calingasta', 'Caucete', 'Chimbas', 'Iglesia',
    'Jachal', 'Media Agua', 'Pocito', 'Rawson', 'Rivadavia', 'San Juan Capital',
    'Santa Lucía', 'Sarmiento', 'Ullum', 'Valle Fértil', 'Zonda',
  ],
  'La Pampa': [
    'Anguil', 'Catriló', 'Eduardo Castex', 'General Acha', 'General Pico', 'Guatraché',
    'Ingeniero Luiggi', 'Intendente Alvear', 'Macachín', 'Maisonnave', 'Maraco',
    'Metileo', 'Quemú Quemú', 'Realicó', 'Santa Isabel', 'Santa Rosa', 'Speluzzi',
    'Telén', 'Toay', 'Trenel', 'Uriburu', 'Victorica', 'Winifreda',
  ],
  'Santa Cruz': [
    'Caleta Olivia', 'Cañadón Seco', 'El Calafate', 'El Chaltén', 'El Turbio',
    'Gobernador Gregores', 'Las Heras', 'Los Antiguos', 'Perito Moreno', 'Piedra Buena',
    'Puerto Deseado', 'Puerto San Julián', 'Punta Arenas', 'Río Gallegos', 'Río Turbio',
  ],
  'Tierra del Fuego': [
    'Río Grande', 'Tolhuin', 'Ushuaia',
  ],
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
          {Object.keys(CITIES_BY_PROVINCE).sort().map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-base">Ciudad o localidad</Label>
        {cities.length > 0 ? (
          <>
            <Input
              id="location"
              list="cities-list"
              placeholder="Escribí para buscar..."
              value={form.location}
              onChange={(e) => update({ location: e.target.value })}
              className="h-12 text-base"
              autoComplete="off"
            />
            <datalist id="cities-list">
              {cities.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </>
        ) : (
          <Input
            disabled
            placeholder="Primero seleccioná una provincia"
            className="h-12 text-base bg-muted"
          />
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
