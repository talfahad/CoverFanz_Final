import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import calendarReducer from './reducer/calendar';
import registerReducer from './reducer/register';
import bookingReducer from './reducer/bookingEvent';
import authReducer from './reducer/auth';

const reducers = combineReducers({
  calendar: calendarReducer,
  register: registerReducer,
  auth: authReducer,
  booking: bookingReducer,
});

const persistConfig = {
  key: 'coverfanz',
  keyPrefix: 'webanion',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
