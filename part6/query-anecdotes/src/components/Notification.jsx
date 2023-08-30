import { useEffect } from 'react';
import { useNotificationValue, useNotificationDispatch } from '../NotificationContext';

const Notification = () => {
    const dispatch = useNotificationDispatch();
    const notification = useNotificationValue();
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    };

    useEffect(() => {
        if (notification) setTimeout(() => dispatch({ type: 'CLEAR' }), 5000);
    }, [notification]);

    if (!notification) return null;

    return (
        <div style={style}>
            {notification}
        </div>
    );
};

export default Notification;
