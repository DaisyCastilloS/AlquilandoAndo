const mlDataClean = (arr) => {
    return arr.map(prop => {
        const relevantAttributes = ["BEDROOMS", "COVERED_AREA", 'FULL_BATHROOMS', 'ROOMS', 'TOTAL_AREA', 'PROPERTY_TYPE']; // Define the relevant attribute ids

        const attributes = prop.attributes
            .filter(attribute => relevantAttributes.includes(attribute.id))
            .map(attribute => {
                if (attribute.id === "BEDROOMS") {
                    return {
                        id: attribute.id,
                        name: attribute.name,
                        value_name: attribute.value_name,
                    };
                } else if (attribute.id === "COVERED_AREA") {
                    return {
                        id: attribute.id,
                        name: attribute.name,
                        value_name: attribute.value_name,
                        value_struct: {
                            number: attribute.value_struct.number,
                            unit: attribute.value_struct.unit
                        },
                    };
                } else if (attribute.id === "FULL_BATHROOMS") {
                    return {
                        id: attribute.id,
                        name: attribute.name,
                        value_name: attribute.value_name,
                    };
                } else if (attribute.id === "ROOMS") {
                    return {
                        id: attribute.id,
                        name: attribute.name,
                        value_name: attribute.value_name,
                    };
                } else if (attribute.id === "TOTAL_AREA") {
                    return {
                        id: attribute.id,
                        name: attribute.name,
                        value_name: attribute.value_name,
                        value_struct: {
                            number: attribute.value_struct.number,
                            unit: attribute.value_struct.unit
                        },
                    };
                } else if (attribute.id === "PROPERTY_TYPE") {
                    return {
                        id: attribute.id,
                        name: attribute.name,
                        value_name: attribute.value_name
                    };
                }
                return null; // Return null for other attributes if not needed
            })
            .filter(Boolean); // Filter out null values

        return {
            name: prop.title,
            condition: prop.condition,
            link: prop.permalink,
            moneda: prop.currency_id,
            price: prop.price,
            attributes: attributes,
            location: {
                address_line: prop.location.address_line,
                zip_code: prop.location.zip_code,
                neighborhood: prop.location.neighborhood.name,
                city: prop.location.city.name,
                state: prop.location.state.name,
                country: prop.location.country.name,
                latitude: prop.location.latitude,
                longitude: prop.location.longitude
            },
        };
    });
};

module.exports = { apiDataClean: mlDataClean }