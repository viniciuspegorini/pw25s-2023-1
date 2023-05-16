import { ICategory } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const findAll = () => {
  return api.get("/categories");
};

const save = (category: ICategory) => {
  return api.post("/categories", category);
};

const remove = (id: number) => {
  return api.delete(`/categories/${id}`);
};

const findOne = (id: number) => {
  return api.get(`/categories/${id}`);
};

const CategoryService = {
  findAll,
  save,
  remove,
  findOne,
};

export default CategoryService;
