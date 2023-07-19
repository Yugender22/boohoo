import { PayloadAction } from '@reduxjs/toolkit'
import { GenericState, createGenericSlice } from './createGenericSlice'
import { CartItem } from '../../types/CartItem'

const cartSlice = createGenericSlice({
  name: 'cart',
  initialState: { isLoading: false } as GenericState<CartItem[]>,
  reducers: {
    addItem(state: GenericState<CartItem[]>, action: PayloadAction<CartItem>) {
      if (!state.data) {
        state.data = [action.payload]
      } else {
        let itemExist: boolean = false
        state.data.map(item => {
          if (item.product.id === action.payload.product.id) {
            item.quantity += 1
            itemExist = true
          }
        })
        if (!itemExist) {
          state.data.push(action.payload)
        }
      }
      console.log('state.data', state.data)
    },
    removeItem(state: GenericState<CartItem[]>, action: PayloadAction<CartItem>) {
      if (state.data) {
        state.data = state.data.filter(item => {
          if (item.product.id === action.payload.product.id) {
            if (item.quantity > 1) {
              item.quantity -= 1
              return true
            }
            return false
          }
          return true
        })
        console.log('state.data', state.data)
      }
    },
    
  }
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem } = cartSlice.actions

export default cartSlice.reducer
