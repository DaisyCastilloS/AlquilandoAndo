const geolib = require('geolib');

// Coordenadas del punto de referencia (Buenos Aires)
const referencePoint = {
  latitude: -34.6143048,
  longitude: -58.4401655,
};

// Definir el radio en metros para el perímetro
const radiusMeters = 5000; // 5 kilómetros

// Lista de coordenadas
const coordinates = [
  { latitude: -34.5891975, longitude: -58.4829834 },
  // Agronomía
  { latitude: -34.6, longitude: -58.4166667 }, // Almagro
  { latitude: -34.6105, longitude: -58.3976 }, // Balvanera
  { latitude: -34.65, longitude: -58.406868 }, // Barracas
  { latitude: -34.58722, longitude: -58.406868 }, // Barrio Norte
  { latitude: -34.5625, longitude: -58.4583333 }, // Belgrano
  { latitude: -34.5625, longitude: -58.4583333 }, // Belgrano Barrancas
  { latitude: -34.5625, longitude: -58.4583333 }, // Belgrano C
  { latitude: -34.5625, longitude: -58.4583333 }, // Belgrano Chico
  { latitude: -34.5625, longitude: -58.4583333 }, // Belgrano R
  { latitude: -34.6333333, longitude: -58.4166667 }, // Boedo
  { latitude: -34.5888889, longitude: -58.4305556 }, // Botánico
  { latitude: -34.6166667, longitude: -58.45 }, // Caballito
  { latitude: -34.587, longitude: -58.4542 }, // Chacarita
  { latitude: -34.5606944, longitude: -58.4747222 }, // Coghlan
  { latitude: -34.5741667, longitude: -58.4491667 }, // Colegiales
  { latitude: -34.609135, longitude: -58.392334 }, // Congreso
  { latitude: -34.6261244, longitude: -58.3859524 }, // Constitución
  { latitude: -34.6333333, longitude: -58.4666667 }, // Flores
  { latitude: -34.6282465, longitude: -58.4844109 }, // Floresta
  { latitude: -34.6344961, longitude: -58.3631337 }, // La Boca
  { latitude: -34.5888889, longitude: -58.4305556 }, // Las Cañitas
  { latitude: -34.6436, longitude: -58.5164 }, // Liniers
  { latitude: -34.6666667, longitude: -58.5 }, // Mataderos
  { latitude: -34.6125, longitude: -58.3833333 }, // Monserrat
  { latitude: -34.6166667, longitude: -58.5 }, // Monte Castro
  { latitude: -34.65, longitude: -58.4166667 }, // Nueva Pompeya
  { latitude: -34.55, longitude: -58.4666667 }, // Nuñez
  { latitude: -34.608955, longitude: -58.40592 }, // Once
  { latitude: -34.5888889, longitude: -58.4305556 }, // Palermo
  { latitude: -34.5888889, longitude: -58.4305556 }, // Palermo Chico
  { latitude: -34.5888889, longitude: -58.4305556 }, // Palermo Hollywood
  { latitude: -34.5888889, longitude: -58.4305556 }, // Palermo Nuevo
  { latitude: -34.5888889, longitude: -58.4305556 }, // Palermo Soho
  { latitude: -34.5888889, longitude: -58.4305556 }, // Palermo Viejo
  { latitude: -34.6455556, longitude: -58.4786111 }, // Parque Avellaneda
  { latitude: -34.6064996, longitude: -58.4378225 }, // Parque Centenario
  { latitude: -34.6344444, longitude: -58.4433333 }, // Parque Chacabuco
  { latitude: -34.585, longitude: -58.479444 }, // Parque Chas
  { latitude: -34.6333333, longitude: -58.4 }, // Parque Patricios
  { latitude: -34.5958969, longitude: -58.4715637 }, // Paternal
  { latitude: -34.6104263, longitude: -58.3617076 }, // Puerto Madero
  { latitude: -34.582736, longitude: -58.3747527 }, // Puerto Retiro
  { latitude: -34.5905556, longitude: -58.3905556 }, // Recoleta
  { latitude: -34.59125, longitude: -58.3740278 }, // Retiro
  { latitude: -34.55, longitude: -58.4833333 }, // Saavedra
  { latitude: -34.6235, longitude: -58.3977 }, // San Cristóbal
  { latitude: -34.6052778, longitude: -58.3758333 }, // San Nicolás
  { latitude: -34.6205556, longitude: -58.3716667 }, // San Telmo
  { latitude: -34.6124, longitude: -58.4811 }, // Santa Rita
  { latitude: -34.6333333, longitude: -58.4833333 }, // Velez Sarsfield
  { latitude: -34.6284, longitude: -58.524 }, // Versalles
  { latitude: -34.6, longitude: -58.45 }, // Villa Crespo
  { latitude: -34.6, longitude: -58.5166667 }, // Villa Devoto
  { latitude: -34.6108538, longitude: -58.4715637 }, // Villa Gral Mitre
  { latitude: -34.6833333, longitude: -58.4666667 }, // Villa Lugano
  { latitude: -34.6333333, longitude: -58.5 }, // Villa Luro
  { latitude: -34.5805556, longitude: -58.4683333 }, // Villa Ortúzar
  { latitude: -34.5833333, longitude: -58.5 }, // Villa Pueyrredón
  { latitude: -34.6191, longitude: -58.5266 }, // Villa Real
  { latitude: -34.7, longitude: -58.4666667 }, // Villa Riachuelo
  { latitude: -34.6666667, longitude: -58.45 }, // Villa Soldati
  { latitude: -34.5733333, longitude: -58.4969444 }, // Villa Urquiza
  { latitude: -34.6, longitude: -58.4833333 }, // Villa del Parque
];

// Función para verificar si una coordenada está dentro del radio
function isWithinRadius(coord) {
  const distance = geolib.getDistance(referencePoint, coord);
  return distance <= radiusMeters;
}

// Filtrar las coordenadas que están dentro del radio
const coordinatesWithinRadius = coordinates.filter(isWithinRadius);

// Imprimir las coordenadas dentro del radio
console.log(`Coordenadas dentro del radio de ${radiusMeters} metros:`);
coordinatesWithinRadius.forEach((coord) => {
  console.log(`Latitude: ${coord.latitude}, Longitude: ${coord.longitude}`);
});
