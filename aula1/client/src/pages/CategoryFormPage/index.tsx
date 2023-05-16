import { ICategory } from "@/commons/interfaces";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Input } from "@/components/Input";
import CategoryService from "@/service/CategoryService";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function CategoryFormPage() {
  const [form, setForm] = useState({
    id: undefined,
    name: "",
  });
  const [errors, setErrors] = useState({
    id: undefined,
    name: "",
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      CategoryService.findOne(parseInt(id))
        .then((response) => {
          if (response.data) {
            setForm({ ...response.data });
            // setForm({
            //   id: response.data.id,
            //   name: response.data.name
            // });
          }
        })
        .catch((responseError) => {})
        .finally(() => {});
    }
  }, [id]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });

    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: undefined,
      };
    });
  };

  const onSubmit = () => {
    setPendingApiCall(true);
    const category: ICategory = {
      id: form.id,
      name: form.name,
    };
    CategoryService.save(category)
      .then((response) => {
        navigate("/categories");
      })
      .catch((responseError) => {
        if (
          responseError.response.data &&
          responseError.response.data.validationErrors
        ) {
          setErrors(responseError.response.data.validationErrors);
        }
      })
      .finally(() => {
        setPendingApiCall(false);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center">Cadastro de Categoria</h1>
      <div className="col-12 mb-3">
        <Input
          className="form-control"
          name="name"
          type="text"
          placeholder="Informe o nome"
          label="Informe o nome"
          value={form.name}
          hasError={errors.name ? true : false}
          error={errors.name}
          onChange={onChange}
        />
        <div className="text-center">
          <ButtonWithProgress
            className="btn btn-primary"
            onClick={onSubmit}
            disabled={pendingApiCall ? true : false}
            pendingApiCall={pendingApiCall}
            text="Salvar"
          />
        </div>
        <div className="text-center mb-3">
          <Link to="/categories" className="btn btn-outline-secondary">
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
