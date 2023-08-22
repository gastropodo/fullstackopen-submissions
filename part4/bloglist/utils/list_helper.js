const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 :
        _.reduce(blogs, (prev, curr) => prev + curr.likes, 0);
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
    const { title, author, likes } = _.maxBy(blogs, 'likes');
    return { title, author, likes };
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;
    const result = _.maxBy(_.map(_.groupBy(blogs, 'author'), (value, key) => {
        return { author: key, blogs: value.length }
    }), 'blogs');
    return result;
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null;
    const result = _.maxBy(_.map(_.groupBy(blogs, 'author'), (value, key) => {
        return { author: key, likes: _.reduce(value, (prev, curr) => prev + curr.likes, 0) }
    }), 'likes');
    return result;
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}