import { useField } from '../hooks';

const AnecdoteForm = ({ addNew }) => {
    const [content, contentInput, contentReset] = useField('text');
    const [author, authorInput, authorReset] = useField('text');
    const [info, infoInput, infoReset] = useField('text');

    const handleReset = (e) => {
        e.preventDefault();
        contentReset();
        authorReset();
        infoReset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNew({
            content,
            author,
            info,
            votes: 0
        });
    };

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' {...contentInput} />
                </div>
                <div>
                    author
                    <input name='author' {...authorInput} />
                </div>
                <div>
                    url for more info
                    <input name='info' {...infoInput} />
                </div>
                <button type='submit'>create</button>
                <button onClick={handleReset}>reset</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;