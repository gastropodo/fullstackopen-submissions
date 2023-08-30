import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const byVotes = (a, b) => b.votes - a.votes;

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        vote(state, action) {
            return state.map(anecdote => anecdote.id !== action.payload
                ? anecdote
                : { ...anecdote, votes: anecdote.votes + 1 })
                .sort(byVotes);
        },

        append(state, action) {
            state.push(action.payload);
            state.sort(byVotes);
        },

        set(state, action) {
            return action.payload;
        }
    }
});

const { vote, append, set } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(set(anecdotes.sort(byVotes)));
    };
};

export const addAnecdote = content => {
    return async dispatch => {
        const anecdote = await anecdoteService.add({ content, votes: 0 });
        dispatch(append(anecdote));
    };
};

export const voteAnecdote = id => {
    return async dispatch => {
        const anecdote = await anecdoteService.get(id);
        await anecdoteService.update(id, { ...anecdote, votes: anecdote.votes + 1 });
        dispatch(vote(id));
    };
};

export default anecdoteSlice.reducer;