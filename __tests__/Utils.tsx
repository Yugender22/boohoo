import React, { PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import appStore, { AppStore, RootState } from '../src/redux/store';
import productReducer from '../src/redux/slices/ProductSlice';
import cartReducer from '../src/redux/slices/CartSlice';
import { RenderOptions, render } from '@testing-library/react-native';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export const renderWithProvider = (
  component: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { products: productReducer, cart: cartReducer }, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}) => {

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(component, { wrapper: Wrapper, ...renderOptions }) }
}
