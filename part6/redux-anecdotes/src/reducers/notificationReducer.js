import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        set(state, action) {
            return action.payload;
        }
    }
});

const { set } = notificationSlice.actions;

export const setNotification = (text, seconds = 5) => {
    return async dispatch => {
        dispatch(set(text));
        setTimeout(() => {
            dispatch(set(''));
        }, seconds * 1000);
    };
};

export default notificationSlice.reducer;