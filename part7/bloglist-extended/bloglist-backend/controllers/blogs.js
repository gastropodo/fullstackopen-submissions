const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const { NotFoundError, UnauthorizedError } = require('../utils/errors');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
        .populate('user', { blogs: 0 })
        .populate('comments', { blog: 0 });
    res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
        .populate('user', {
            blogs: 0,
        })
        .populate('comments', { blog: 0 });
    if (!blog) throw new NotFoundError('Blog not found.');
    res.json(blog);
});

blogsRouter.post('/', async (req, res) => {
    const user = req.user;
    const blog = new Blog({ ...req.body, user: user.id });
    const savedBlog = await blog.save();
    savedBlog.populate('user', {
        blogs: 0,
    });
    user.blogs = user.blogs.concat(blog.id);
    await user.save();
    res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
    const user = req.user;
    const blogToDelete = await Blog.findById(req.params.id);
    if (blogToDelete) {
        if (blogToDelete.user.toString() !== user.id)
            throw new UnauthorizedError(
                'You do not have the permission to delete this blog.',
            );
        user.blogs = user.blogs.filter((blog) => blog.id !== blogToDelete.id);
        await blogToDelete.deleteOne();
        await user.save();
    }
    res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        context: 'query',
    }).populate('user', { blogs: 0 }).populate('comments', { blog: 0 });
    if (!updatedBlog) throw new NotFoundError('Blog not found');
    res.json(updatedBlog);
});

blogsRouter.post('/:id/comments', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new NotFoundError('Blog not found');
    const comment = new Comment({ ...req.body, blog: blog.id });
    const savedComment = await comment.save();
    blog.comments = blog.comments.concat(savedComment.id);
    await blog.save();
    const result = await blog.populate('comments', { blog: 0 });
    res.status(201).json(result);
});

module.exports = blogsRouter;
