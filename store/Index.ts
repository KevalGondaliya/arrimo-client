// config the store
import UserSlice, { userSlice } from "./UserSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});

// export default the store
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
