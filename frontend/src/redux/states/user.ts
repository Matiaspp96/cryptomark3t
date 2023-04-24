import { User } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const UserEmptyState: User = {
    name: '',
    walletAddress: '',
    provider: '',
    chainId: 0
};

export const userSlice = createSlice({
    name: 'user',
    initialState: UserEmptyState,
    reducers: {
        loginUser: (_state, action) => {
            const { address, provider, chainId } = action.payload
            return { ..._state, walletAddress: address, provider, chainId }
        },
        logoutUser: (_state, action) => ({ ..._state, ...action.payload }),
        resetUser: () => UserEmptyState
    }
});

export const { loginUser, logoutUser, resetUser } = userSlice.actions;

export default userSlice.reducer;