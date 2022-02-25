const model = require("./model");
const { hashPassword } = require("../../utils/bcrypt");
const { sign } = require("../../utils/jwt");

module.exports = {
  POST: async (req, res) => {
    try {
      const {
        id,
        firstName,
        lastName,
        thirdName,
        email,
        pasportIIB,
        pasportSeria,
        inn,
        phone,
        password,
        conPassword,
        visaNumber,
        visaSroc,
        visaCod,
      } = req.body;
      if (
        !firstName ||
        !lastName ||
        !thirdName ||
        !pasportSeria ||
        !pasportIIB ||
        !inn ||
        !phone ||
        !email ||
        !id ||
        !password ||
        !conPassword ||
        password !== conPassword ||
        isNaN(inn) ||
        isNaN(id) ||
        (visaNumber && isNaN(visaNumber)) ||
        (visaSroc && isNaN(visaSroc)) ||
        (visaCod && isNaN(visaCod))
      )
        return res.status(400).json({ message: "BAD_REQUEST" });

      const findUser = await model.findUser(id);

      if (!findUser) return res.status(404).json({ message: "NOT_FOUND!" });

      const hashedPassword = await hashPassword(password);

      const code = String(Math.floor(1000000 + Math.random() * 900000));

      const createUser = await model.createUser(
        firstName,
        lastName,
        thirdName,
        pasportSeria,
        pasportIIB,
        inn,
        phone,
        email,
        hashedPassword,
        +code,
        visaNumber,
        visaSroc,
        visaCod,
        findUser.id
      );

      if (!createUser)
        return res.status(500).json({ message: "SERVER_CREATED_ERROR" });

      const token = sign({ userId: createUser.id });

      res
        .status(201)
        .json({ message: "CREATED", data: { user: createUser, token } });
    } catch (error) {
      res
        .status(400)
        .json({ message: `This email (${req.body.email}) already use` });
    }
  },
};
