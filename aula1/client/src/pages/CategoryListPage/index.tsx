import { ICategory } from "@/commons/interfaces";
import CategoryService from "@/service/CategoryService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function CategoryListPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    CategoryService.findAll()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {});
  };

  const onRemove = (id: number) => {
    CategoryService.remove(id)
      .then((response) => {
        loadData();
      })
      .catch((responseError) => {})
      .finally(() => {});
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center">Category List PAGE</h1>
        <Link to="/categories/new" className="btn btn-success">
          Nova Categoria
        </Link>
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
                <td>
                  <Link
                    to={`/categories/${category.id}`}
                    className="btn btn-primary"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => onRemove(category.id ? category.id : 0)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
