import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from ".";
import { HYDRATE } from "next-redux-wrapper";
import { ProductType } from "../types";
import { ProductActionType } from "./types/products";

export type ProductState = {
  productState: ProductType;
};

export const initialState: ProductState = {
  productState: {
    products: [],
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state: ProductState = initialState, action) {
      console.log(action.payload)
      state.productState.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setProducts, (state: ProductState, action: any) => {
      return {
        ...state,
        productState: action.payload,
      };
    });
  },
});

export const { setProducts } = productSlice.actions;
export const products = (state: AppState) =>
  state.product.productState.products;
export default productSlice.reducer;
