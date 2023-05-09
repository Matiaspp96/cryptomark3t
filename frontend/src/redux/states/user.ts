import { User } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const UserEmptyState: Partial<User> = {
    name: '',
    walletAddress: '',
    chainId: 0
};

export const userSlice = createSlice({
    name: 'user',
    initialState: UserEmptyState,
    reducers: {
        loginUser: (_state, action) => {
            const { address, provider, chainId } = action.payload

            window.localStorage.setItem('walletAddress', address)
            return { ..._state, walletAddress: address, provider, chainId }
        },
        logoutUser: (_state, _action) => {
            window.localStorage.removeItem('walletAddress')
            return UserEmptyState
        },
        updateUser: (_state, action) => ({ ..._state, ...action.payload }),
        resetUser: () => UserEmptyState
    }
});

export const { loginUser, logoutUser, resetUser } = userSlice.actions;

export default userSlice.reducer;