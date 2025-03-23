import { createSlice } from '@reduxjs/toolkit';

import { sessionApi } from '../api';

interface ISessionSliceState {
    isAuth: boolean;
    tokenType?: string;
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
    },
});

export const { clearSessionData } = sessionSlice.actions;
