const { Router } = require("express");
const controller = require("../controllers/mainController");


const router = Router();

const routes = {
  homeRoute: "/",
};

router.get(routes.homeRoute, controller.homeController);


module.exports = router;