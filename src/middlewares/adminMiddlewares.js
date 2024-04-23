const userService = require ("../model/userService");

function adminMiddleware (req,res,next) {
    if (req.session.userLogged.id_categoria != 1) {
        let adminError = {};
        return res.render('../views/users/profile.ejs', {
            title: 'Perfil de usuario',
            user: req.session.userLogged,
            adminError
            });
    }
    next ();
};

module.exports = adminMiddleware;