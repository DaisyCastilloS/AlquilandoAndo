const { Router } = require('express');
const { check } = require('express-validator');
const {
  isValidEmail,
  isValidRole,
  authorizeRoles,
  validateToken,
} = require('../helpers');
const { fieldValidate, isAuthenticated } = require('../middlewares');
const { uploadProfileImage } = require('../handlers');
const {
  createUser,
  accountConfirm,
  login,
  getUserProfile,
  updateProfile,
  forgotPassword,
  newPassword,
  imageProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = Router();
// registrar usuario
router.post(
  '/signup',
  [
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    check('pais', 'El campo pais no puede ir vacio').not().isEmpty(),
    check('estado', 'El campo estado no puede ir vacio').not().isEmpty(),
    check('ciudad', 'El campo ciudad no puede ir vacio').not().isEmpty(),
    check(
      'password',
      'La contraseña no es valida y debe tener  mas de 6 letras',
    ).isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(isValidEmail),

    check('role').custom(isValidRole),
    fieldValidate,
  ],
  createUser,
);

// confirmar cuenta
router.get('/confirmar-cuenta/:id', accountConfirm);

// logear usuario

router.post(
  '/signin',
  [
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'El campo contraseña no puede ir vacio').not().isEmpty(),
    fieldValidate,
  ],
  login,
);
// user profile
router.route('/me').get(isAuthenticated, getUserProfile);
router.route('/me/update').put(isAuthenticated, updateProfile);
// upload images profile
router.post('/me/image', isAuthenticated, uploadProfileImage, imageProfile);
// recover user password
router.post(
  '/forgot-password',
  [
    check('email', 'El correo no es valido').isEmail(),
    check('email').not().custom(isValidEmail),
    fieldValidate,
  ],
  forgotPassword,
);
router.post(
  '/forgot-password/:token',
  [
    check(
      'password',
      'La contraseña no es valida y debe tener  mas de 6 letras',
    ).isLength({ min: 6 }),
    check('password', 'El campo contraseña no puede ir vacio').not().isEmpty(),
    check('repetirPassword', 'El campo repetir contraseña no puede ir vacio')
      .not()
      .isEmpty(),
    validateToken,
    fieldValidate,
  ],
  newPassword,
);
// admin routes
router.get(
  '/admin/users',
  isAuthenticated,
  authorizeRoles('ADMIN_ROLE'),
  getAllUsers,
);

router
  .route('/admin/user/:id')
  .get(isAuthenticated, authorizeRoles('ADMIN_ROLE'), getUserById)
  .put(isAuthenticated, authorizeRoles('ADMIN_ROLE'), updateUser)
  .delete(isAuthenticated, authorizeRoles('ADMIN_ROLE'), deleteUser);

module.exports = router;
