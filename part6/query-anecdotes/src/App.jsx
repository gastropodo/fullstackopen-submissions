import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, updateAnecdote } from './requests';
import { useNotificationDispatch } from './NotificationContext';

const App = () => {
    const dispatch = useNotificationDispatch();
    const queryClient = useQueryClient();
    const updateAnecdoteMutation = useMutation(updateAnecdote, {
        onSuccess: updatedAnecdote => {
            queryClient.setQueryData(['anecdotes'], queryClient.getQueryData(['anecdotes']).map(anecdote =>
                anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote));
        }
    });

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
        dispatch({ type: 'SET', payload: `You voted '${anecdote.content}'.` });
    };

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1
    });

    if (result.isLoading) return (
        <div>loading data...</div>
    );

    if (result.isError) return (
        <div>anecdote service not available due to problems in server.</div>
    );

    const anecdotes = result.data;

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
