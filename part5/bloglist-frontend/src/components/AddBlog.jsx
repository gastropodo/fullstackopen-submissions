import { useState } from 'react';

const AddBlog = ({ addBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const clearValues = () => {
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addBlog({ title, author, url });
        clearValues();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a new blog</h2>
            <div>
                title:
                <input id='title' placeholder='title' value={title} onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div>
                author:
                <input id='author' placeholder='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
                url:
                <input id='url' placeholder='url' value={url} onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button id='new-blog-button' type='submit'>create</button>
        </form>
    );
};

export default AddBlog;