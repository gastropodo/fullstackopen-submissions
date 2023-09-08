import { useReducer } from 'react';
import { NotificationContext } from '../../contexts';

const notificationReducer = {
    initialState: '',
    reducer: (state, action) => {
        switch (action.type) {
            case 'SET':
                return action.payload;
            case 'CLEAR':
                return '';
            default:
                return state;
        }
    },
};

const NotificationContextProvider = (props) => {
    const { reducer, initialState } = notificationReducer;
    const [notification, notificationDispatch] = useReducer(
        reducer,
        initialState,
    );

    return (
        <NotificationContext.Provider
            value={[notification, notificationDispatch]}
        >
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationContextProvider;
