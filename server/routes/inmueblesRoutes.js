const { Router } = require('express');
const { check } = require('express-validator');
const { propertiesController } = require('../controllers/inmueblesController');
const { isAuthenticated, fieldValidate } = require('../middlewares');
const { authorizeRoles } = require('../helpers');

const router = Router();
propertiesController
router.get('/', propertiesController.getProperties);

router.get('/filter', propertiesController.filterProperties);

router.get('/search', propertiesController.searchProperties);

router.get('/sort', propertiesController.sortProperties);

router.post('/',
    isAuthenticated,
    fieldValidate,
    propertiesController.addToFavorite);

router.put('/',
    isAuthenticated,
    fieldValidate,
    propertiesController.removeFromFavorite);

router.get('/admin/refresh',
    isAuthenticated,
    authorizeRoles('ADMIN_ROLE'),
    propertiesController.loadProperties

)

module.exports = router;