import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AdminReducer from "./admin/reducers/admin.reducers";
import AuthReducer from "./auth/reducers/auth.reducers";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const middlewares: any = [];
const rootReducer = combineReducers({
  admin: AdminReducer.reducer,
  auth: AuthReducer.reducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}


const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(middlewares)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;

