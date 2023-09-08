const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const { NotFoundError, BadRequestError } = require('../utils/errors');
const config = require('../utils/config');

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { user: 0 });
    res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).populate('blogs', {
        user: 0,
    });
    if (!user) throw new NotFoundError('User not found');
    res.json(user);
});

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;
    if (!password) throw new BadRequestError('Password is required');
    if (password.length < 3)
        throw new BadRequestError('Password must be at least 3 characters.');
    const user = new User({
        username,
        name,
        passwordHash: await bcrypt.hash(password, config.SALT_ROUNDS),
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
});

module.exports = usersRouter;
