import { ICategory } from "@/commons/interfaces";
import CategoryService from "@/service/CategoryService";
import { useEffect, useState } from "react";

export function CategoryListPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    CategoryService.findAll()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="text-center">Category List PAGE</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>#ID</td>
              <td>Nome</td>
              <td>Ações</td>
            </tr>
          </thead>
          <tbody>
            {data.map((category: ICategory) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td> --- </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
