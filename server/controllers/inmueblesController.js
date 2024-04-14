const { response } = require('express');
const { executeScrapeOnRemax } = require('../handlers');
const fs = require('fs');
let propiedades = [];

class PropertiesController {
    constructor() {
        if (!PropertiesController.instance) {
            this.#executeScrape();
        }
    }

    async #executeScrape() {
        console.log('Cargando propiedades');
        // propiedades = await executeScrapeOnRemax()

        const readStream = fs.ReadStream('./public/data/propiedades.json', {
            encoding: 'utf-8',
            highWaterMark: 1024 * 1024,
        });
        // llamar al json en ves de la funcion en caso de ser necesario
        readStream.on('data', (data) => {
            propiedades = JSON.parse(data);
        });

        readStream.on('error', (err) => {
            console.error(err);
        });

        console.log('Propiedades cargadas');
    }

    async getProperties(req, res = response) {
        res.send(propiedades);
    }

    async filterProperties(req, res = response) {
        const filters = req.query;

        let filteredProperties = [...propiedades];

        const filterFunctions = {
            price: (property) => {
                if (!filters.min_price && !filters.max_price) return true;

                const [value, currency] = property.price.split(' ');
                const propertyPrice = parseFloat(value);

                // Check if both min_price and max_price are provided
                if (filters.min_price && filters.max_price) {
                    const minPrice = parseFloat(filters.min_price);
                    const maxPrice = parseFloat(filters.max_price);
                    return propertyPrice >= minPrice && propertyPrice <= maxPrice;
                }

                // Check if only min_price is provided
                if (filters.min_price) {
                    const minPrice = parseFloat(filters.min_price);
                    return propertyPrice >= minPrice;
                }

                // Check if only max_price is provided
                if (filters.max_price) {
                    const maxPrice = parseFloat(filters.max_price);
                    return propertyPrice <= maxPrice;
                }
            },
            currency: (property) => {
                if (!filters.currency) return true;
                const currencyFilter = filters.currency.toUpperCase();
                const [value, currency] = property.price.split(' ');
                return currency === currencyFilter;
            },
            /*
              Basados en que existen diferentes casos del campo address:
              Caso 1: "address": "Gascón 500 Almagro, Capital Federal",
              Caso 2: "address": "3 de Febrero 2300 La Perla Sur, Mar del Plata, General Pueyrredon, Buenos Aires",
              Caso 3: "address": "Tres de Febrero 2300 Rosario, Rosario, Santa Fe",
              Se implementarán 4 filtros considerando el siguiente formato:  <address>, <city>, <partido>, <province>
              */
            address: (property) => {
                if (!filters.address) return true;
                const addressFilter = filters.address.toLowerCase();
                return property.address.toLowerCase().includes(addressFilter);
            },
            city: (property) => {
                if (!filters.city) return true;
                const cityFilter = filters.city.toLowerCase();
                const addressComponents = property.address
                    .toLowerCase()
                    .split(',')
                    .map((component) => component.trim());
                return (
                    addressComponents.length >= 3 &&
                    addressComponents[addressComponents.length - 3].includes(cityFilter)
                );
            },
            partido: (property) => {
                if (!filters.partido) return true;
                const partidoFilter = filters.partido.toLowerCase();
                const addressComponents = property.address
                    .toLowerCase()
                    .split(',')
                    .map((component) => component.trim());
                return (
                    addressComponents.length >= 2 &&
                    addressComponents[addressComponents.length - 2].includes(
                        partidoFilter
                    )
                );
            },
            province: (property) => {
                if (!filters.province) return true;
                const provinceFilter = filters.province.toLowerCase();
                const addressComponents = property.address
                    .toLowerCase()
                    .split(',')
                    .map((component) => component.trim());
                return (
                    addressComponents.length >= 1 &&
                    addressComponents[addressComponents.length - 1].includes(
                        provinceFilter
                    )
                );
            },
            total_size: (property) => {
                if (!filters.total_size) return true;
                const totalSizeFilter = filters.total_size.toLowerCase();
                return property.total_size.toLowerCase().includes(totalSizeFilter);
            },
            rooms: (property) => {
                if (!filters.rooms) return true;
                const roomsFilter = filters.rooms.toLowerCase();
                return property.rooms.toLowerCase().includes(roomsFilter);
            },
            bathrooms: (property) => {
                if (!filters.bathrooms) return true;
                const bathroomsFilter = filters.bathrooms.toLowerCase();
                return property.bathrooms.toLowerCase().includes(bathroomsFilter);
            },
        };

        // Apply filters
        Object.keys(filterFunctions).forEach((key) => {
            filteredProperties = filteredProperties.filter(filterFunctions[key]);
        });

        res.send(filteredProperties);
    }

    async sortProperties(req, res = response) {
        const { asc, desc, sortBy } = req.query; // eso se le pasa por el get

        try {
            // Verificar si se proporcionan los parámetros necesarios
            if (!(asc || desc) || !sortBy) {
                throw new Error(
                    'Debes especificar asc=true o desc=true y sortBy=price o sortBy=area en la URL para ordenar.'
                );
            }

            // Definir el objeto comparators localmente dentro de sortProperties, y cuando victor nos pase los otros parameros, lso agregamos aca en comparators para poder usarlos
            const comparators = {
                price: (a, b) => {
                    const [valueA] = a.price.split(' ');
                    const [valueB] = b.price.split(' ');
                    return parseFloat(valueA) - parseFloat(valueB);
                },
                area: (a, b) => {
                    const [sizeA] = a.total_size.split(' ');
                    const [sizeB] = b.total_size.split(' ');
                    return parseFloat(sizeA) - parseFloat(sizeB);
                },
            };

            // Validar el tipo de ordenamiento solicitado
            if (!comparators[sortBy]) {
                throw new Error('El parámetro sortBy debe ser "price" o "area".');
            }

            // Obtener el comparador adecuado según sortBy
            const comparator = comparators[sortBy];

            // Aplicar el ordenamiento según la dirección solicitada
            const sortedProperties = [...propiedades].sort((a, b) => {
                if (asc) {
                    return comparator(a, b);
                } else if (desc) {
                    return comparator(b, a); // Invertir el orden
                }
            });

            // Responder con las propiedades ordenadas
            res.json(sortedProperties);
        } catch (error) {
            // Manejar errores de validación
            res.status(400).json({ error: error.message });
        }
    }

    async searchProperties(req, res = response) {
        const { search } = req.body;
        if (!search || search.length < 1) {
            return res.status(200).send(propiedades);
        }
        const searchOnProperties = propiedades.filter(
            (property) =>
                property.title.toLowerCase().includes(search.toLowerCase()) ||
                property.rooms.toLowerCase().includes(search.toLowerCase()) ||
                property.bathrooms.toLowerCase().includes(search.toLowerCase()) ||
                property.address.toLowerCase().includes(search.toLowerCase())
        );
        if (searchOnProperties.length === 0) {
            return res.status(404).json({
                message:
                    'No se encontraron propiedades que coincidan con el término de búsqueda',
            });
        }
        res.send(searchOnProperties);
    }

    async addToFavorite(req, res = response) {
        const { id } = req.usuario;
        res.send(propiedades);
    }
    async removeFromFavorite(req, res = response) {
        const { id } = req.usuario;
        res.send(propiedades);
    }

    async loadProperties(req, res = response) {
        this.#executeScrape();
    }
}
const propertiesController = new PropertiesController();
module.exports = {
    propertiesController,
};