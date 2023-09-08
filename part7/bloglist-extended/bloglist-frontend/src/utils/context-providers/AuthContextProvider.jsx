import { useReducer, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts';

const authReducer = {
    initialState: null,
    reducer: (state, action) => {
        switch (action.type) {
            case 'LOGIN':
                return action.payload;
            case 'LOGOUT':
                return null;
            default:
                return state;
        }
    },
};

const AuthContextProvider = (props) => {
    const { reducer, initialState } = authReducer;
    const [auth, authDispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user');
        if (loggedUserJSON) {
            authDispatch({
                type: 'LOGIN',
                payload: JSON.parse(loggedUserJSON),
            });
        }
        setLoading(false);
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <AuthContext.Provider value={[auth, authDispatch]}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
