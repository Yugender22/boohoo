import { createAsyncThunk } from "@reduxjs/toolkit"
import { ProductType } from "../../types"

export const getProducts = createAsyncThunk('products', async () => {
  const response: ProductType = await fetch(`https://my-json-server.typicode.com/benirvingplt/products/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response: Response) => response.json())
  
  return response
})