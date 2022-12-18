import internal from "stream";
import axiosClient from "./client";

export type PaginationProps = {
  page: 0 | number;
  page_size: 10| number;
  ordering: string|null;
  search?: string|null;
  section?: number|null;
  department?: number|null;
  price?: number|string|null;
};
export const getProducts = async (props?: PaginationProps) => {
  const data = (await axiosClient.get("products", {
    params: { ...props },
  })).data;

  return data
};


export const getDepartments = async () => {
  return (await axiosClient.get("departments"))
};



export const getSections = async () => {
  return (await axiosClient.get("sections"))
};