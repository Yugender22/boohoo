import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import * as Redux from 'redux';
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import productSlice from './slices/ProductSlice';
import cartSlice from './slices/CartSlice';

const middleware = () => {
  const middleware: Array<Redux.Middleware> = [thunk]
  if (__DEV__) {
    middleware.push(logger);
  }
  return middleware
}

export type RootState = ReturnType<typeof store.getState>

const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware()),

})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;