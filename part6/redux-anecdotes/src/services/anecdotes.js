import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const get = async id => {
    const res = await axios.get(`${baseUrl}/${id}`);
    return res.data;
};

const add = async data => {
    const res = await axios.post(baseUrl, data);
    return res.data;
};

const update = async (id, data) => {
    const res = await axios.put(`${baseUrl}/${id}`, data);
    return res.data;
};

export default { getAll, get, add, update };