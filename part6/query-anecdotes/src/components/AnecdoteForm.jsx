import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
    const dispatch = useNotificationDispatch();
    const queryClient = useQueryClient();

    const newAnecdoteMutation = useMutation(addAnecdote, {
        onSuccess: newAnecdote => {
            queryClient.setQueryData(['anecdotes'], queryClient.getQueryData(['anecdotes']).concat(newAnecdote));
            dispatch({ type: 'SET', payload: `You created '${newAnecdote.content}'.` });
        },
        onError: error => {
            dispatch({ type: 'SET', payload: error.response.data.error });
        }
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        newAnecdoteMutation.mutate({ content, votes: 0 });
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
