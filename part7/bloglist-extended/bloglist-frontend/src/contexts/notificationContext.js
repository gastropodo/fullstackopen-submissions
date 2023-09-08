import { createContext, useContext } from 'react';

const NotificationContext = createContext();

export const useNotificationValue = () => useContext(NotificationContext)[0];

export const useNotify = () => {
    const context = useContext(NotificationContext);
    const dispatch = context[1];
    return (payload) => {
        payload.duration ??= 5;
        dispatch({ type: 'SET', payload });
    };
};

export const useClear = () => {
    const context = useContext(NotificationContext);
    const dispatch = context[1];
    return (payload) => {
        dispatch({ type: 'CLEAR', payload });
    };
}

export default NotificationContext;
