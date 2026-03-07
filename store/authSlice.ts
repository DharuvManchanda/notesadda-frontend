import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
    id: string;
    email: string;
    username: string;
    roles?: string[];
}

interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearCredentials: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
