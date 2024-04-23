const { validationResult } = require("express-validator");
let bcrypt = require("bcryptjs");

//Services
const userService = require("../model/userService");

const userController = {
  loginController: (req, res) => {
    try {
      res.render("../views/users/login.ejs", {
        title: "Login",
      });
    } catch (error) {
      res.status(500).send("Error en el servidor");
    }
  },

  // Método para procesar el login de usuarios
  loginProcess: async (req, res) => {
    try {
      const resultLogin = await userService.login(req);

      if (resultLogin.errors) {
        res.render("../views/users/login.ejs", {
          title: "Login",
          errors: resultLogin.errors,
          old: req.body,
        });
      } else {
        req.session.userLogged = resultLogin.user;
        if (req.body.recordarme) {
          res.cookie("userEmail", req.body.email, { maxAge: 60000 * 2 });
        }
        res.redirect(`${resultLogin.user.id}/profile`);
      }
    } catch (error) {
      console.error("Error en el proceso de inicio de sesión:", error);
      res.render("../views/users/login.ejs", {
        title: "Login",
        errors: { general: { msg: "Error al iniciar sesión" } },
        old: req.body,
      });
    }
  },

  registerController: async (req, res) => {
    try {
      res.render("../views/users/register.ejs", {
        title: "Registro de usuarios",
      });
    } catch (error) {
      res.status(500).send("Error inesperado del servido, intente más tarde");
    }
  },

  listUsersController: async (req, res) => {
    try {
      const totalUsers = await userService.getAllApiUsers();
      const usersList = await userService.getData();
      const user = req.session.userLogged || {};
      if (user && user.id_categoria == 1) {
        res.render("../views/users/usersList.ejs", {
          title: "Listado de usuarios",
          usersList,
          user,
          totalUsers
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error en el servidor");
    }
  },

  //Controlador Ruta para almacenar el nuevo usuario
  addRegisterController: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        if (req.file) {
          await userService.deleteImagen(req.file.filename);
        }
        return res.render("../views/users/register.ejs", {
          title: "Registro de usuarios",
          errors: resultValidation.mapped(),
          oldData: {
            ...req.body,
            imagen: req.file ? req.file.filename : "usuario-default.jpg",
          },
        });
      }
      const userInDB = await userService.getByField(req.body.email);
      if (userInDB && userInDB.activo) {
        return res.render("../views/users/register.ejs", {
          title: "Registro de usuarios",
          errors: {
            email: {
              msg: "Este email ya está registrado",
            },
          },
          oldData: req.body,
        });
      }
      const body = req.body;
      (body.contrasenia = bcrypt.hashSync(req.body.contrasenia, 10)),
        (body.foto = req.file ? req.file.filename : "usuario-default.jpg");

      if (userInDB && !userInDB.activo) {
        await userService.updateUser(body, userInDB.id);
      } else {
        await userService.addUser(body);
      }
      return res.render("../views/users/login.ejs", {
        title: "Login",
      });
    } catch (error) {
      console.error("Error en el controlador de registro:", error);
      return res.status(500).send("No se pudo registrar el usuario");
    }
  },

  profileController: async (req, res) => {
    try {
      const user = req.session.userLogged || {};
      if (user && user.id_categoria == 2) {
        res.render("../views/users/profile.ejs", {
          title: "Perfil de cliente",
          user,
        });
      } else {
        res.render("../views/users/profileAdmin.ejs", {
          title: "Perfil de Administrador",
          user,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.send("Error inesperado").status(500);
    }
  },

  logoutController: async (req, res) => {
    try {
      res.clearCookie("userEmail");
      req.session.destroy();
      return res.redirect("/");
    } catch (error) {
      console.log(error.message);
      res.send("Error inesperado").status(500);
    }
  },

  // Controlladores de edición de registro de usuario GET y PUT
  editController: async (req, res) => {
    try {
      const user = req.session.userLogged || {};
      const idUser = parseInt(req.params.id);
      const infoUser = await userService.getByPk(idUser);
      res.render("../views/users/editUser.ejs", {
        title: "Edición de usuarios",
        user,
        infoUser,
      });
    } catch (error) {
      console.log(error.message);
      res.send("Error inesperado").status(500);
    }
  },

  //Edición de usuario y actualizacion de los datos
  updateEditController: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      const user = req.session.userLogged || {};
      const idUser = parseInt(req.params.id);
      const infoUser = await userService.getByPk(idUser);
      const imagen = req.body.imageAnt;
      if (resultValidation.errors.length > 0) {
        // si hay nueva imagen la borro hasta tener todo ok
        if (req.file) {
          await userService.deleteImagen(req.file.filename);
        }
        return res.render("../views/users/editUser.ejs", {
          title: "Edición de usuarios",
          errors: resultValidation.mapped(),
          oldData: req.body,
          infoUser,
          user,
          imagen,
        });
      }
      // En caso de cambiar el correo: se verifica que el mail no esté registrado
      const userInDB = await userService.getByField(req.body.email);
      if (userInDB) {
        if (userInDB.id !== infoUser.id) {
          //si existe el mail significa que no se puede guardar al edición y borro la imagen que se ha subido
          if (req.file) {
            await userService.deleteImagen(req.file.filename);
          }
          // No se hace la edición del registro porque ya existe ese mail que esta editando.
          return res.render("../views/users/editUser.ejs", {
            title: "Edición de usuarios",
            errors: {
              email: {
                msg: "Este email ya está registrado",
              },
            },
            oldData: req.body,
            infoUser,
            user,
            imagen,
          });
        }
      }
      const body = req.body;      
      if (body.contrasenia && body.confirmar) {
        body.contrasenia = bcrypt.hashSync(req.body.contrasenia, 10);
      } else {
        body.contrasenia = infoUser.contrasenia;
      }
      body.foto = req.file ? req.file.filename : imagen;

      let newUser = await userService.updateList(body, idUser);
      // Actualiza la variable de sesión con los nuevos datos del usuario
      if (req.session.userLogged.id == infoUser.id) {
        req.session.userLogged = {
          ...newUser.editUser, // Agrega los nuevos datos,
          id: infoUser.id
        };
        console.log(req.session.userLogged);
        // Guarda la variable de sesión actualizada
        res.clearCookie("userEmail");
        req.session.save();
      }
      return res.redirect(`/users/${req.session.userLogged.id}/profile`);
    } catch (error) {
      return res.status(500).send("No se pudo editar el usuario");
    }
  },

  deleteController: async function (req, res) {
    try {
      const user = req.session.userLogged || {};
      const idToDelete = parseInt(req.params.id);
      const userToDelete = await userService.getByPk(idToDelete);
      res.render("../views/users/delete.ejs", {
        title: "Borrar usuario",
        user,
        userToDelete,
      });
    } catch (error) {
      console.log(error.message);
      res.send("Error inesperado").status(500);
    }
  },

  destroyController: async (req, res) => {
    try {
      const user = req.session.userLogged || {};
      const idToDelete = parseInt(req.params.id);
      if (user && user.id_categoria == 2 && user.id === idToDelete) {
        await userService.delete(user.id);
        res.clearCookie("userEmail");
        req.session.destroy();
        res.redirect("/");
      } else if (user && user.id_categoria == 1) {
        await userService.delete(idToDelete);
        res.redirect(`/users/${user.id}/profile`);
      }
    } catch (error) {
      console.log(error.message);
      res.send("Error inesperado").status(500);
    }
  },

  apiUsersController : async (req, res) => {
    try {
      let totalUsers = await userService.getAllApiUsers();
      res.json(totalUsers);
    } catch (error) {
      console.log(error.message);
      res.send("Error inesperado").status(500);
    }
  }
};

module.exports = userController;
