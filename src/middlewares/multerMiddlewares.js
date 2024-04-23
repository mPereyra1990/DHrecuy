const path =require ('path');
const multer = require ('multer'); 

// Multer - manejo del almacenamiento
const productStorage = multer.diskStorage({
	destination: (req , file , cb) => {
		cb (null , path.resolve(__dirname , "../../public/images/productos"));
	},
	filename: (req , file , cb) => {
		cb (null , file.fieldname + "-" + Date.now() + path.extname(file.originalname))
	}
});


const userStorage = multer.diskStorage({
	destination: (req , file , cb) => {
		cb (null , path.resolve(__dirname , "../../public/images/usuarios"));
	},
	filename: (req , file , cb) => {
		cb (null , file.fieldname + "-" + Date.now() + path.extname(file.originalname))
	}
});

// Instanciar multer para manejar los métodos
const productUpload = multer({ storage: productStorage });
const userUpload = multer({ storage: userStorage });

module.exports = {userUpload, productUpload};