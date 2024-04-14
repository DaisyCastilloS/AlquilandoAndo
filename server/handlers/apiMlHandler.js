const { mlDataClean } = require('../helpers/mlDataClean')
const axios = require('axios')

const getDataHandler = async (req, res) => {
    try {
        const result = (await axios('https://api.mercadolibre.com/sites/MLA/search?category=MLA1473&limit=50')).data
        const cleanData = mlDataClean(result.results)
        res.status(200).json(cleanData)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getDataHandler }