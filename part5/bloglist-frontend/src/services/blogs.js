import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const res = await axios.get(baseUrl, { headers: { Authorization: token } });
    return res.data;
};

const add = async newObject => {
    const res = await axios.post(baseUrl, newObject, { headers: { Authorization: token } });
    return res.data;
};

const update = async (id, newObject) => {
    const res = await axios.put(`${baseUrl}/${id}`, newObject, { headers: { Authorization: token } });
    return res.data;
};

const remove = async id => {
    const res = await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } });
    return res.data;
};

export default { getAll, add, update, remove, setToken };