const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const { UnauthorizedError } = require('../utils/errors');
const config = require('../utils/config');

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect))
        throw new UnauthorizedError('Invalid username or password.');

    const token = jwt.sign(
        {
            username: user.username,
            id: user.id,
        },
        config.SECRET,
    );

    res.json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
