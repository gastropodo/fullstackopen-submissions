const bcrypt = require('bcrypt');

const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
];
const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 0,
};
const invalidBlogs = [
    {
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
    },
    {
        author: 'Edsger W. Dijkstra',
    },
];
const initialUsers = [
    {
        username: 'gastropodo1',
        name: 'Felipe Areyuna 1',
        password: 'test1',
    },
    {
        username: 'gastropodo2',
        name: 'Felipe Areyuna 2',
        password: 'test2',
    },
];
const newUser = {
    username: 'gastropodo3',
    name: 'Felipe Areyuna 3',
    password: 'test3',
};
const invalidUsers = [
    {
        name: 'Felipe Areyuna 3',
        password: 'test3',
    },
    {
        username: 'gastropodo3',
        name: 'Felipe Areyuna 3',
    },
    {
        name: 'Felipe Areyuna 3',
    },
    {},
    {
        username: 'ga',
        password: 'test3',
    },
    {
        username: 'gastropodo3',
        password: 'te',
    },
    {
        username: 'ga',
        password: 'te',
    },
    {
        username: 'gastropodo1',
        password: 'test3',
    },
];

const nonExistingBlogId = async () => {
    const blog = new Blog(newBlog);
    await blog.save();
    await blog.deleteOne();

    return blog.id;
};

const nonExistingUserId = async () => {
    const { username, name, password } = newUser;
    const user = new User({
        username,
        name,
        passwordHash: await bcrypt.hash(password, 10),
    });
    await user.save();
    await user.deleteOne();

    return user.id;
};

const blogsInDb = async () => {
    const blogs = await Blog.find({}).populate('user', { blogs: 0 });
    return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map((user) => user.toJSON());
};

module.exports = {
    initialBlogs,
    initialUsers,
    newBlog,
    newUser,
    invalidBlogs,
    invalidUsers,
    nonExistingBlogId,
    nonExistingUserId,
    blogsInDb,
    usersInDb,
};
