const { body } = require("express-validator");
const path = require("path");

const editValidations = [
    body("nombre").notEmpty().withMessage("El nombre no puede quedar vacío").bail()
    .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres"),
    body("apellido").notEmpty().withMessage("El apellido no puede quedar vacío").bail()
    .isLength({ min: 2 }).withMessage("El apellido debe tener al menos 2 caracteres"),
  body("email").notEmpty().withMessage("El email no puede quedar vacío").bail()
    .isEmail().withMessage("Debes ingresar un email válido"),
  body("dir").notEmpty().withMessage("La dirección no puede quedar vacía"),
  body("telefono").notEmpty().withMessage("El número de teléfono no puede quedar vacío"),    
  body("categoria").notEmpty().withMessage("La categoria no puede quedar vacía"),
  body("activo").notEmpty().withMessage("El estado del usuario no puede quedar vacío"),
  body("contrasenia").custom((value, { req }) => {
    const valorContrasenia = req.body.contrasenia;
    if (valorContrasenia) {
      if (!value) {          
      } else if(value.length < 8) {        
        throw new Error("La contraseña debe tener al menos 8 caracteres");
      } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\#]).{8,}$/;
        if (!passwordRegex.test(value)) {
          throw new Error(
            "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial."
          );
        }
      }
    }
    return true;
  }),
  body("confirmar").custom((value, { req }) => {
    let valorContrasenia = req.body.contrasenia;
    let valorConfirmar = req.body.confirmar;   
    if ((valorContrasenia.trim() !== "") && (valorContrasenia !== valorConfirmar)) {
      throw new Error("Las contraseñas no coinciden, verifique por favor.");
    }
    return true;
  }),
  body("foto").custom((value, { req }) => {
    let file = req.file;
    let acceptExt = [".jpg", ".png", ".jpeg", ".gif"];

    if (file) {
      let fileExt = path.extname(file.originalname);
      if (!acceptExt.includes(fileExt)) {
        throw new Error(
          `Las extensiones permitidas para las imagenes son ${acceptExt.join(
            ", "
          )}`
        );
      }
      const maxSize = 1024 * 1024; // 1MB en bytes
      if (file.size > maxSize) {
          throw new Error('El tamaño del archivo excede el límite permitido (1MB)');
      }
    }
    return true;
  }),
];

module.exports = editValidations;
