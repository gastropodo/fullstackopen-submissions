import axios from 'axios';

const useLoginService = () => {
    const baseUrl = 'http://localhost:3003/api/login'
    const login = async (credentials) => {
        const res = await axios.post(baseUrl, credentials);
        return res.data;
    };

    return login;
};

export default useLoginService;
