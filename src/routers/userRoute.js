const { Router } = require("express");
const routerUsers = Router();

const userController = require("../controllers/userController");
const loginValidations = require ("../middlewares/loginValidations");
const guestMiddleware = require ("../middlewares/guestMiddlewares");
const authMiddleware = require ("../middlewares/authMiddlewares");
const adminMiddleware = require("../middlewares/adminMiddlewares");
const multerMiddleware = require('../middlewares/multerMiddlewares');
const editValidations = require("../middlewares/editValidations");
const registerValidations = require("../middlewares/registerValidations");


const routesUser = {
    users: '/',
	user: '/:id',
    registration: "/registration",
	login: "/login",	
	edition: "/:id/edition",
    profile: "/:id/profile",
	list: "/list",
    logout: "/logout",
    deletion: "/:id/deletion",
    totalUsers: "/totalusers",
    adminRegister:"/:id/users/adminRegister"	
};

routerUsers.get(routesUser.registration, guestMiddleware, userController.registerController);
routerUsers.post(routesUser.users, multerMiddleware.userUpload.single("foto"), registerValidations, userController.addRegisterController);

routerUsers.get(routesUser.adminRegister, adminMiddleware, userController.registerController);
routerUsers.post(routesUser.users, multerMiddleware.userUpload.single("foto"), registerValidations, userController.addRegisterController);

routerUsers.get(routesUser.login, guestMiddleware , userController.loginController);
routerUsers.post(routesUser.login, loginValidations , userController.loginProcess);

routerUsers.get(routesUser.edition, authMiddleware, userController.editController);
routerUsers.put(routesUser.user, multerMiddleware.userUpload.single("foto"), editValidations, userController.updateEditController);

routerUsers.get(routesUser.profile, authMiddleware , userController.profileController);

routerUsers.get(routesUser.logout, userController.logoutController);

routerUsers.get(routesUser.deletion, authMiddleware, userController.deleteController);
routerUsers.delete(routesUser.user, authMiddleware, userController.destroyController);
 
routerUsers.get(routesUser.list, authMiddleware, adminMiddleware, userController.listUsersController);

routerUsers.get(routesUser.totalUsers, userController.apiUsersController);

module.exports = routerUsers;