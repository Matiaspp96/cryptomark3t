import { User } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const UserEmptyState: User = {
    name: '',
    walletAddress: '',
    chainId: 0
};

export const userSlice = createSlice({
    name: 'user',
    initialState: UserEmptyState,
    reducers: {
        loginUser: (_state, action) => {
            console.log('loginUser action', action)
            const { address, provider, chainId } = action.payload

            window.localStorage.setItem('walletAddress', address)
            return { ..._state, walletAddress: address, provider, chainId }
        },
        logoutUser: (_state, _action) => {
            return { ..._state, walletAddress: '', provider: '', chainId: 0 }
        },
        resetUser: () => UserEmptyState
    }
});

export const { loginUser, logoutUser, resetUser } = userSlice.actions;

export default userSlice.reducer;