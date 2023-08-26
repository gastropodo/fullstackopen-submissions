import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';

const BlogList = ({ blogs, user, loadBlogs, likeBlog, removeBlog }) => {
    const [loading, setLoading] = useState(true);

    const load = async () => {
        await loadBlogs();
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    if (loading) return (
        <div>Loading...</div>
    )

    if (blogs.length > 0) return (
        <>
            <h2>Blog List</h2>
            <div id='blog-list'>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} user={user} like={likeBlog} remove={removeBlog} />
                )}
            </div>
        </>
    );

    return (
        <div>No blogs</div>
    );
};

BlogList.propTypes = {
    blogs: PropTypes.arrayOf(PropTypes.exact({
        title: PropTypes.string,
        author: PropTypes.string,
        url: PropTypes.string,
        likes: PropTypes.number,
        user: PropTypes.exact({
            id: PropTypes.string,
            username: PropTypes.string,
            name: PropTypes.string
        }),
        id: PropTypes.string,
    })),
    loadBlogs: PropTypes.func.isRequired,
    likeBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
};

export default BlogList;