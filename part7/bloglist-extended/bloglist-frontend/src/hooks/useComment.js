import axios from 'axios';
import { useUserValue } from '../contexts/authContext';

const useComment = () => {
    const baseUrl = 'http://localhost:3003/api/blogs';
    const user = useUserValue();
    const token = user ? `Bearer ${user.token}` : null;
    const comment = async (data) => {
        const res = await axios.post(`${baseUrl}/${data.id}/comments`, {
            text: data.text,
        }, {
            headers: {
                Authorization: token
            }
        });
        return res.data;
    };

    return comment;
};

export default useComment;
