import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) =>
        anecdotes.filter(anecdote => anecdote.content.toLowerCase().match(filter.toLowerCase()))
    );
    const dispatch = useDispatch();

    const vote = anecdote => {
        dispatch(voteAnecdote(anecdote.id));
        dispatch(setNotification(`You voted: '${anecdote.content}'.`, 10));
    };

    return (
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        )
    );
};

export default AnecdoteList;