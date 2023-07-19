import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit'
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

const rootReducer = combineReducers({
  products: productSlice,
  cart: cartSlice,
})

const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware()),
    preloadedState,
  })
}

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(middleware()),
// })


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default setupStore;