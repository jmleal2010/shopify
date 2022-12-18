import { Product, ProductType } from "../../types";

export const SET_PRODUCTS = 'SET_PRODUCTS';

type ProductTypeAction = {
    type: typeof SET_PRODUCTS,
    payload: ProductType
}

export type ProductActionType = ProductTypeAction