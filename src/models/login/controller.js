const model = require("./model");
const { comparePassword } = require("../../utils/bcrypt");
const { sign } = require("../../utils/jwt");

module.exports = {
  POST: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: "BAD_REQUEST!" });

      const findUser = await model.findUser(email);
      if (!findUser) return res.status(404).json({ message: "NOT_FOUND!" });
      const comparedPassword = await comparePassword(
        password,
        findUser.password
      );

      if (!comparedPassword)
        return res.status(400).json({ message: "BAD_REQUET!" });
      const token = sign({ userId: findUser.id });
      res.status(200).json({ message: "ok", data: { user: findUser, token } });
    } catch (error) {
      res.status(500).json({ message: "SERVER_ERROR!" });
    }
  },
};
