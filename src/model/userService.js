const db = require("./database/models");
const Op = db.Sequelize.Op;
const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");
let bcrypt = require("bcryptjs");

const userService = {
  getData: async function () {
    try {
      return await db.User.findAll();
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  // Método que obtiene a todos los usuarios
  findAll: async function () {
    try {
      return await this.getData();
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  // Método para encontrar un usuario por ID
  getByPk: async function (id) {
    try {
      const userFound = await db.User.findByPk(id);
      return userFound;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  // Método para encontrar un usuario por campo de formulario
  getByField: async function (email) {
    try {
      return await db.User.findOne({
        where: {
          email: email,
        },
      });      
    } catch (error) {
      return{errors: "Error al buscar el usuario"};
    }
  },

  delete: async (id) => {
    try {
      const userToUpdate = await db.User.findByPk(id);
      if (!userToUpdate) {
        throw new Error("Usuario no encontrado");
      }
      userToUpdate.activo = false; 
      await userToUpdate.save(); 
      return userToUpdate;
    } catch (error) {
      throw new Error("No se pudo procesar la solicitud correctamente");
    }
  },

  deleteImagen: async (img) => {
    try {
      let directorio = path.resolve(__dirname, "../../public/images/usuarios");
      const rutaImagen = path.join(directorio, img);
      fs.unlinkSync(rutaImagen);
    } catch (error) {
      throw new Error("No se pudo procesar la solicitud correctamente");
    }
  },

  updateList: async (body, id) => {
    try {      
      const editUser = new UserConstructor(body);  
      let newUser =  await db.User.update(editUser, {
        where: {
          id: id,
        },
      })
      return {newUser, editUser};
    } catch (error) {
      throw new Error("No se pudo editar el usuario correctamente");
    }
  },

  addUser: async function (body) {
    try {           
      const newUser = new UserConstructor(body);      
      return await db.User.create(newUser);
    } catch (error) {      
      throw new Error("No se pudo agregar el usuario");
    }
  },
  
  updateUser: async function (body, userId) {
    try {
      const newUser = new UserConstructor(body);
      return await db.User.update(newUser, {
        where: {
          id: userId,
        },
      });
    } catch (error) {      
      throw new Error("No se pudo actualizar el usuario");
    }
  },

  getAllApiUsers: async () => {
    let usersCount = await db.User.count();
    let result = {
      totalUsers: usersCount
    }
    return result;
  },

  login: async function (userData) {
    try {    
    const errors = validationResult(userData);
    if (!errors.isEmpty()) {
      const mappedErrors = errors.mapped();
      return { errors: mappedErrors };
    }    
    const userToLogin = await userService.getByField(userData.body.email);    

    if (!userToLogin || userToLogin.activo == false) {
      console.log(errors)
      return { errors: { email: { msg: "Este email no se encuentra registrado" } } };    
    }
    
    const isOkThePassword = bcrypt.compareSync(
      userData.body.contrasenia,
      userToLogin.contrasenia
    );
    if (!isOkThePassword) {
      return { errors: { contrasenia: { msg: "Credenciales inválidas" } } };
    }        
    return {user: userToLogin};  
  } catch (error) {
    return { errors: { general: { msg: "Error en el servidor al iniciar sesión" } } };
  }
}
};

function UserConstructor({
  nombre,
  apellido,
  email,
  dir,
  telefono,
  contrasenia,
  categoria,
  activo,
  foto
}){
  this.nombre = nombre;
  this.apellido = apellido;
  this.email = email;
  this.direccion = dir;
  this.telefono = telefono;
  this.contrasenia = contrasenia;
  this.id_categoria = categoria;
  this.activo = activo;
  this.imagen = foto;
}

module.exports = userService;