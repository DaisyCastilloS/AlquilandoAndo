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
  { latitude: -34.853867, longitude: -56.189575 }, //Aires Puros
  { latitude: -34.85342, longitude: -56.18206 }, //Arroyo Seco
  { latitude: -34.86688, longitude: -56.188183 }, //Atahualpa
  { latitude: -34.876938, longitude: -56.200745 }, //Bella Vista
  { latitude: -34.84971, longitude: -56.223087 }, //Belvedere
  { latitude: -34.867786, longitude: -56.15608 }, //Bolivar
  { latitude: -34.86503, longitude: -56.17841 }, //Brazo Oriental
  { latitude: -34.898106, longitude: -56.128174 }, //Buceo
  { latitude: -34.870754, longitude: -56.216106 }, // Capurro
  { latitude: -34.88504, longitude: -56.273373 }, //Casabo
  { latitude: -34.8149519, longitude: -56.1872217 }, //Casavalle
  { latitude: -34.90452, longitude: -56.19516 }, //Centro
  { latitude: -34.853493, longitude: -56.17283 }, //Cerrito
  { latitude: -34.894646, longitude: -56.252098 }, //Cerro
  { latitude: -34.908024, longitude: -56.20633 }, //Ciudad Vieja
  { latitude: -34.802345, longitude: -56.220295 }, //Colón
  { latitude: -34.90414, longitude: -56.17841 }, //Cordón
  { latitude: -34.87982, longitude: -56.175484 }, //Goes
  { latitude: -34.847946, longitude: -56.14352 }, //Ituzaingó
  { latitude: -34.873837, longitude: -56.171432 }, //Jacinto Vera
  { latitude: -34.836315, longitude: -56.133755 }, //Jardines Hipódromo
  { latitude: -34.882454, longitude: -56.15608 }, //La Blanqueada
  { latitude: -34.887627, longitude: -56.16864 }, //La Comercial
  { latitude: -34.880337, longitude: -56.172497 }, //La Figurita
  { latitude: -34.858643, longitude: -56.23886 }, //La Teja
  { latitude: -34.8796515, longitude: -56.1688165 }, //Larrañaga
  { latitude: -34.838448, longitude: -56.15608 }, //Las Acacias
  { latitude: -34.793262, longitude: -56.253815 }, //Lezica
  { latitude: -34.89107, longitude: -56.105858 }, //Malvin
  { latitude: -34.87993, longitude: -56.117016 }, //Malvin Norte
  { latitude: -34.810486, longitude: -56.144917 }, //Manga
  { latitude: -34.83679, longitude: -56.154682 }, //Marconi
  { latitude: -34.862137, longitude: -56.122593 }, //Maroñas
  { latitude: -34.859158, longitude: -56.133495 }, //Maroñas, Curva
  { latitude: -34.75813, longitude: -56.302803 }, //Melilla
  { latitude: -34.8682375, longitude: -56.1790557 }, //Mercado Modelo
  { latitude: -34.838715, longitude: -56.24264 }, //Nuevo París
  { latitude: -34.86836, longitude: -56.333473 }, //Pajas Blancas
  { latitude: -34.910686, longitude: -56.179806 }, //Palermo
  { latitude: -34.894394, longitude: -56.146236 }, //Parque Batlle
  { latitude: -34.9128, longitude: -56.16515 }, //Parque Rodó
  { latitude: -34.86097, longitude: -56.216106 }, //Paso Molino
  { latitude: -34.821766, longitude: -56.310368 }, //Paso de la Arena
  { latitude: -34.8597649, longitude: -56.1616623 }, //Perez Castellanos
  { latitude: -34.8247, longitude: -56.197952 }, //Peñarol
  { latitude: -34.823402, longitude: -56.139336 }, //Piedras Blancas
  { latitude: -34.90853, longitude: -56.150406 }, //Pocitos
  { latitude: -34.908558, longitude: -56.140034 }, //Pocitos Nuevo
  { latitude: -34.859127, longitude: -56.20633 }, //Prado
  { latitude: -34.916664, longitude: -56.13333 }, //Puerto Buceo
  { latitude: -34.92155, longitude: -56.15608 }, //Punta Carretas
  { latitude: -34.885796, longitude: -56.089123 }, //Punta Gorda
  { latitude: -34.82089, longitude: -56.100277 }, //Punta Rieles
  { latitude: -34.87832, longitude: -56.189575 }, //Reducto
  { latitude: -34.790337, longitude: -56.350254 }, //Santiago Vázquez
  { latitude: -34.83642, longitude: -56.211918 }, //Sayago
  { latitude: -34.764877, longitude: -56.14771 }, //Toledo Chico
  { latitude: -34.89496, longitude: -56.16864 }, //Tres Cruces
  { latitude: -34.877186, longitude: -56.139336 }, //Unión
  { latitude: -34.7, longitude: -56.152615 }, //Villa Biarritz
  { latitude: -34.894394, longitude: -56.146236 }, //Villa Dolores
  { latitude: -34.864277, longitude: -56.144917 }, //Villa Española
  { latitude: -34.786087, longitude: -56.075176 }, //Villa García
  { latitude: -34.887814, longitude: -56.177013}, //Villa Muñoz
  { latitude: -34.883324, longitude: -56.255814}, //Villa del Cerro

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