import { ActionReducerMapBuilder, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers, createSlice } from "@reduxjs/toolkit"
import { Error } from "../../types"

export interface GenericState<T> {
  data?: T
  isLoading: boolean,
  error?: string,
}

export const createGenericSlice = <
  T,
  Reducers extends SliceCaseReducers<GenericState<T>>,
>({
  name = '',
  initialState,
  reducers,
  extraReducers,
}: {
  name: string
  initialState: GenericState<T>
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>
  extraReducers?: ValidateSliceCaseReducers<GenericState<T>, any> | ((builder: ActionReducerMapBuilder<GenericState<T>>) => void);
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      start(state) {
        state.isLoading = false
      },
      /**
       * If you want to write to values of the state that depend on the generic
       * (in this case: `state.data`, which is T), you might need to specify the
       * State type manually here, as it defaults to `Draft<GenericState<T>>`,
       * which can sometimes be problematic with yet-unresolved generics.
       * This is a general problem when working with immer's Draft type and generics.
       */
      success(state: GenericState<T>, action: PayloadAction<T>) {
        console.log('action payload', action.payload)
        state.data = action.payload
        state.isLoading = false
        state.error = undefined
      },
      // failure(state: GenericState<T>, action: Error) {
      //   state.data = undefined
      //   state.isLoading = false
      //   state.error = action.errorMessage
      // },
      ...reducers,
    },
    extraReducers: extraReducers,
  })
}
