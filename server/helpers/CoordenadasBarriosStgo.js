const geolib = require('geolib');

// Coordenadas del punto de referencia (Parque Almagro)
const referencePoint = {
  latitude: -33.454623180332,
  longitude: -70.6541930508352,
};

// Definir el radio en metros para el perímetro
const radiusMeters = 5000; // 5 kilómetros

// Lista de coordenadas
const coordinates = [
  { latitude: -33.4404683740944, longitude: -70.6643917553142 },
  // Barrio Brasil
  { latitude: -33.453781926425, longitude: -70.6371776913787 }, // Barrio  10 de Julio
  { latitude: -33.4379882884577, longitude: -70.6407629742224 }, // Barrio  Lastarria
  { latitude: -33.4530486713969, longitude: -70.6683761646175 }, // Barrio Republica
  { latitude: -33.4408268651724, longitude: -70.6382291578569 }, // Barrio San Borja
  { latitude: -33.4423812723301, longitude: -70.6740847482317 }, // Barrio Yungay
  { latitude: -33.464547445685, longitude: -70.6341488012964 }, // Barrio Bogota- Sierra Bella
  { latitude: -33.4467474340512, longitude: -70.6507832251647 }, // Barrio Bulnes
  { latitude: -33.4384093853109, longitude: -70.6528996363429 }, // Centro  Historico de Santiago
  { latitude: -33.4661404950339, longitude: -70.6710382555349 }, // Club Hipico
  { latitude: -33.4482468373921, longitude: -70.6579507595842 }, // Dieciocho
  { latitude: -33.4522955147027, longitude: -70.6616291939298 }, // Ejército - Toesca
  { latitude: -33.4729770329032, longitude: -70.6454699274982 }, // Franklin - Bio Bio
  { latitude: -33.4542490831617, longitude: -70.6750935040234 }, // Meiggs
  { latitude: -33.454623180332, longitude: -70.6541930508352 }, // Parque Almagro
  { latitude: -33.4315662016504, longitude: -70.6716913487176 }, // Parque Los Reyes
  { latitude: -33.4657747074477, longitude: -70.6554700452384 }, // Parque O'Higgins
  { latitude: -33.4541867393898, longitude: -70.6473936187427 }, // San Diego
  { latitude: -33.446794036908, longitude: -70.6390705441123 }, // Santa Isabel
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
