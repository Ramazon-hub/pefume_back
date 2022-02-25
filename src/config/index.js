require("dotenv").config();

const env = process.env;

module.exports = {
  PORT: env.PORT,
  DB_URL: env.DB_URL,
  JWT_KEY: env.JWT_KEY,
};
