import { useState } from 'react';

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
};

const marginLeft = {
    marginLeft: 5
};

const Blog = ({ blog, user, like, remove }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleLike = async () => {
        await like(blog.id, {
            ...blog, user: blog.user.id, likes: blog.likes + 1
        });
    };

    const handleRemove = async () => {
        const confirm = window.confirm(`Remove blog: ${blog.title}, by ${blog.author}?`);
        if (confirm) await remove(blog.id);
    };

    return (
        <div style={blogStyle} className='blog'>
            <div>
                {blog.title} {blog.author}
                <button
                    className='show-details'
                    style={marginLeft}
                    onClick={() => setShowDetails(!showDetails)}
                >
                    {!showDetails ? 'show' : 'hide'}
                </button>
            </div>
            {
                showDetails && <>
                    <div>{blog.url}</div>
                    <div>
                        likes: {blog.likes}
                        <button
                            className='like-button'
                            style={marginLeft}
                            onClick={handleLike}
                        >
                            like
                        </button>
                    </div>
                    <div>{blog.user.name}</div>
                    {
                        user.username === blog.user.username && <button onClick={handleRemove}>remove</button>
                    }

                </>
            }
        </div>
    );

};

export default Blog;