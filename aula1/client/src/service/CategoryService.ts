import { api } from "@/lib/axios";

const findAll = () => {
  return api.get("/categories");
};

const CategoryService = {
  findAll,
};

export default CategoryService;