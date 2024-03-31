const geolib = require('geolib');

// Coordenadas del punto de referencia (Montevideo)
const referencePoint = {
  latitude: -34.90111,
  longitude: -56.16453,
};

// Definir el radio en metros para el perímetro
const radiusMeters = 5000; // 5 kilómetros

// Lista de coordenadas
const coordinates = [
  { latitude: -34.8835, longitude: -56.19068 },
  // Aguada
  { latitude: -34.853867, longitude: -56.189575 },
  { latitude: -34.85342, longitude: -56.18206 },
  { latitude: -34.86688, longitude: -56.188183 },
  { latitude: -34.876938, longitude: -56.200745 },
  { latitude: -34.84971, longitude: -56.223087 },
  { latitude: -34.867786, longitude: -56.15608 },
  { latitude: -34.86503, longitude: -56.17841 },
  { latitude: -34.898106, longitude: -56.128174 },
  { latitude: -34.870754, longitude: -56.216106 },
  { latitude: -34.88504, longitude: -56.273373 },
  { latitude: -34.8149519, longitude: -56.1872217 },
  { latitude: -34.90452, longitude: -56.19516 },
  { latitude: -34.853493, longitude: -56.17283 },
  { latitude: -34.894646, longitude: -56.252098 },
  { latitude: -34.908024, longitude: -56.20633 },
  { latitude: -34.802345, longitude: -56.220295 },
  { latitude: -34.90414, longitude: -56.17841 },
  { latitude: -34.87982, longitude: -56.175484 },
  { latitude: -34.847946, longitude: -56.14352 },
  { latitude: -34.873837, longitude: -56.171432 },
  { latitude: -34.836315, longitude: -56.133755 },
  { latitude: -34.882454, longitude: -56.15608 },
  { latitude: -34.887627, longitude: -56.16864 },
  { latitude: -34.880337, longitude: -56.172497 },
  { latitude: -34.858643, longitude: -56.23886 },
  { latitude: -34.8796515, longitude: -56.1688165 },
  { latitude: -34.838448, longitude: -56.15608 },
  { latitude: -34.793262, longitude: -56.253815 },
  { latitude: -34.89107, longitude: -56.105858 },
  { latitude: -34.87993, longitude: -56.117016 },
  { latitude: -34.810486, longitude: -56.144917 },
  { latitude: -34.83679, longitude: -56.154682 },
  { latitude: -34.862137, longitude: -56.122593 },
  { latitude: -34.859158, longitude: -56.133495 },
  { latitude: -34.75813, longitude: -56.302803 },
  { latitude: -34.8682375, longitude: -56.1790557 },
  { latitude: -34.838715, longitude: -56.24264 },
  { latitude: -34.86836, longitude: -56.333473 },
  { latitude: -34.910686, longitude: -56.179806 },
  { latitude: -34.894394, longitude: -56.146236 },
  { latitude: -34.9128, longitude: -56.16515 },
  { latitude: -34.86097, longitude: -56.216106 },
  { latitude: -34.821766, longitude: -56.310368 },
  { latitude: -34.8597649, longitude: -56.1616623 },
  { latitude: -34.8247, longitude: -56.197952 },
  { latitude: -34.823402, longitude: -56.139336 },
  { latitude: -34.90853, longitude: -56.150406 },
  { latitude: -34.908558, longitude: -56.140034 },
  { latitude: -34.859127, longitude: -56.20633 },
  { latitude: -34.916664, longitude: -56.13333 },
  { latitude: -34.92155, longitude: -56.15608 },
  { latitude: -34.885796, longitude: -56.089123 },
  { latitude: -34.82089, longitude: -56.100277 },
  { latitude: -34.87832, longitude: -56.189575 },
  { latitude: -34.790337, longitude: -56.350254 },
  { latitude: -34.83642, longitude: -56.211918 },
  { latitude: -34.764877, longitude: -56.14771 },
  { latitude: -34.89496, longitude: -56.16864 },
  { latitude: -34.877186, longitude: -56.139336 },
  { latitude: -34.7, longitude: -56.152615 },
  { latitude: -34.894394, longitude: -56.146236 },
  { latitude: -34.864277, longitude: -56.144917 },
  { latitude: -34.786087, longitude: -56.075176 },
  { latitude: -34.887814, longitude: -56.177013 },
  { latitude: -34.883324, longitude: -56.255814 },

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
