import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { ProductType } from '../../types'
import { getProducts } from '../service/getProducts'
import { GenericState, createGenericSlice } from './createGenericSlice'

export const productSlice = createGenericSlice({
  name: 'product',
  initialState: { isLoading: false } as GenericState<ProductType[]>,
  reducers: {
    
  },
  extraReducers: (builder: ActionReducerMapBuilder<GenericState<ProductType[]>>) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload
      state.isLoading = false
      state.error = undefined
    })
    builder.addCase(getProducts.rejected, (state, action) => {
      let error = undefined
      if (action.payload) {
        error = JSON.stringify(action.payload)
      } else {
        error = action.error.message
      }
      return {
        ...state,
        data: undefined,
        isLoading: false,
        error: error,
      }
    })
  }
})

// Action creators are generated for each case reducer function
export const { start } = productSlice.actions

export default productSlice.reducer
