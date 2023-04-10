const SECRET = process.env.PORT || 'testToken';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27018;
const PORT = process.env.PORT || 3000;

export default {
  SECRET,
  DB_PORT,
  DB_HOST,
  PORT,
};
