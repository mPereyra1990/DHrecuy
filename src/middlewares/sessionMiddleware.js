const userService = require("../model/userService");
async function sessionMiddleware(req, res, next) {
  
  res.locals.isLogged= false;

  let emailCookie = req.cookies && req.cookies.userEmail;
  if (emailCookie) {
    let userFromCookie = await userService.getByField(emailCookie);
    if (userFromCookie) {
      req.session.userLogged = userFromCookie;
    } else {req.session.userLogged = userToLogin}
  };
  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  };
    next();
  };
  
  module.exports = sessionMiddleware;