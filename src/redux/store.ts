import { configureStore, combineReducers } from "@reduxjs/toolkit";

import baseCreateApi from "./apis/baseCreateApi";
import rootReducer from "./rootReducer";

const reducers = combineReducers({
  [baseCreateApi.reducerPath]: baseCreateApi.reducer,
  ...rootReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseCreateApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
