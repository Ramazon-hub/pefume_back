const { fetch } = require("../../utils/pg");

const FIND_USER = "SELECT user_id AS id FROM users WHERE user_cod_id = $1";

const CREATE_USER = `INSERT INTO users(
                                        user_firstname,
                                        user_lastname,
                                        user_sortname,
                                        user_passport_seria,
                                        user_passport_berilgan,
                                        user_inn,
                                        user_tell,
                                        user_email,
                                        user_password,
                                        user_cod_id,
                                        user_visa_number,
                                        user_visa_sroc,
                                        user_visa_three_num,
                                        user_ref
) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING 
                                                                user_id AS id,
                                                                user_cod_id AS code
`;

const findUser = (...values) => fetch(FIND_USER, values);
const createUser = (...values) => fetch(CREATE_USER, values);

module.exports = { findUser, createUser };
