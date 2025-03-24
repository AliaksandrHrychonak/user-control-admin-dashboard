import { createSlice } from '@reduxjs/toolkit';

import { sessionApi } from '../api';

interface ISessionSliceState {
    isAuth: boolean;
    tokenType?: string;
    id?: string;
}

const initialState: ISessionSliceState = {
    isAuth: false,
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        clearSessionData: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(sessionApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.isAuth = true;
            if (state.isAuth) {
                state.tokenType = payload.tokenType;
            }
        });
        builder.addMatcher(sessionApi.endpoints.profile.matchFulfilled, (state, { payload }) => {
            state.id = payload.data.id;
        });
    },
});

export const { clearSessionData } = sessionSlice.actions;
