import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './states/user';

export interface AppStore {
    user: ReturnType<typeof userSlice.reducer>;

}

export default configureStore<AppStore>({
    reducer: {
        user: userSlice.reducer
    },
});