import { IProduct } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const findAll = () => {
  return api.get("/products");
};

const save = (product: IProduct) => {
  return api.post("/products", product);
};

const update = (product: IProduct) => {
  return api.put("/products", product);
};

const remove = (id: number) => {
  return api.delete(`/products/${id}`);
};

const findOne = (id: number) => {
  return api.get(`/products/${id}`);
};

const ProductService = {
  findAll,
  save,
  remove,
  findOne,
};

export default ProductService;
