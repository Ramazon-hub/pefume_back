const { Router } = require("express");

const router = new Router();

const controller = require("./controller");

router.post("/register", controller.POST);

module.exports = router;
