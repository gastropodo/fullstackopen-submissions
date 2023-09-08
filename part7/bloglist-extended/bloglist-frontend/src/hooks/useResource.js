import axios from 'axios';
import { useUserValue } from '../contexts/authContext';

const useResource = (resourceName) => {
    const baseUrl = `http://localhost:3003/api/${resourceName}`;
    const user = useUserValue();
    const token = user ? `Bearer ${user.token}` : null;

    const getAll = async () => {
        const res = await axios.get(baseUrl, {
            headers: { Authorization: token },
        });
        return res.data;
    };

    const get = async (id) => {
        const res = await axios.get(`${baseUrl}/${id}`, {
            headers: { Authorization: token },
        });
        return res.data;
    };

    const add = async (newObject) => {
        const res = await axios.post(baseUrl, newObject, {
            headers: { Authorization: token },
        });
        return res.data;
    };

    const update = async (newObject) => {
        const res = await axios.put(`${baseUrl}/${newObject.id}`, newObject, {
            headers: { Authorization: token },
        });
        return res.data;
    };

    const remove = async (id) => {
        const res = await axios.delete(`${baseUrl}/${id}`, {
            headers: { Authorization: token },
        });
        return res.data;
    };

    return { getAll, get, add, update, remove };
};

export default useResource;
