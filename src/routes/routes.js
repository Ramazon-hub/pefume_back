const { Router } = require("express");

const router = new Router();

const register = require("../models/register/route");
const login = require("../models/login/route");

router.use("/auth", register);
router.use("/auth", login);

module.exports = router;
