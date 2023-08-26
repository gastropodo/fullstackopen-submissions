require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const SECRET = process.env.SECRET;

const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT,
    SALT_ROUNDS,
    SECRET,
    NODE_ENV
}