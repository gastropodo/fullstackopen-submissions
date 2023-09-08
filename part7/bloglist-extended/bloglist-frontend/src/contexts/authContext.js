import { createContext, useContext } from 'react';
import { useLoginService } from '../hooks';

const AuthContext = createContext();

export const useUserValue = () => useContext(AuthContext)[0];

export const useLogin = () => {
    const context = useContext(AuthContext);
    const dispatch = context[1];
    const login = useLoginService();
    return async (payload) => {
        const user = await login(payload);
        window.localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOGIN', payload: user });
    };
};

export const useLogout = () => {
    const context = useContext(AuthContext);
    const dispatch = context[1];
    return () => {
        window.localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };
};

export default AuthContext;
