import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export const getAnecdotes = async () => {
    const res = await axios.get(`${baseUrl}/anecdotes`);
    return res.data;
};

export const addAnecdote = async data => {
    const res = await axios.post(`${baseUrl}/anecdotes`, data);
    return res.data;
};

export const updateAnecdote = async data => {
    const res = await axios.put(`${baseUrl}/anecdotes/${data.id}`, data);
    return res.data;
};