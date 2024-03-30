const multer = require('multer');
const { generateId } = require('../helpers');

const multerProfileConfiguration = {
  limits: { filesize: 10000 },
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, next) => {
      next(null, `${__dirname}/../public/uploads/users/`);
    },
    filename: (req, file, next) => {
      const extension = file.mimetype.split('/')[1];
      next(null, `${generateId}.${extension}`);
    },
  })),
  fileFilter(req, file, next) {
    if (
      file.mimetype == 'image/jpeg'
      || file.mimetype == 'image/png'
      || file.mimetype == 'image/jpg'
    ) {
      // formato valido
      next(null, true);
    } else {
      // formato invalido

      next(new Error('Formato no valido'), false);
    }
  },
};

const uploadProfile = multer(multerProfileConfiguration).single('imagen');

const uploadProfileImage = (req, res, next) => {
  uploadProfile(req, res, (error) => {
    if (error) {
      res.json({ msg: error });
    }
    return next();
  });
};

module.exports = {
  uploadProfileImage,
};
