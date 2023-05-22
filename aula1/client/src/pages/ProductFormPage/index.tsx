import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ICategory, IProduct } from "@/commons/interfaces";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Input } from "@/components/Input";
import CategoryService from "@/service/CategoryService";
import ProductService from "@/service/ProductService";

export function ProductFormPage() {
  // o objeto form armazena os dados do cadastro do produto no state do componente.
  const [form, setForm] = useState<IProduct>({
    id: undefined,
    name: "",
    price: 0,
    description: "",
    category: { id: undefined, name: "" },
  });
  // o objeto erros armazena o array de erros retornado pelo backend ao tentar cadastrar um produto com dados inválidos nos atributos.
  const [errors, setErrors] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    category: "",
  });
  // controla a situação da requisição HTTP que está sendo realizada ao servidor ao cadastrar um novo produto.
  const [pendingApiCall, setPendingApiCall] = useState(false);
  // apiError controla a exibição das mensagem de erro que ocorrem ao realizar uma requisição HTTP para o servidor.
  const [apiError, setApiError] = useState("");
  // lista de categorias utilizada para carregar o select
  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Executa ao carregar o componente
  useEffect(() => {
    // loadData();
  }, []);

  //Função utilizada para controlar as alterações nos Inputs e TextArea
  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  //Função utilizada para controlar as alterações no Select (para enviar a categoria ao servidor é necessário enviar o json no formato= categoria: {id: valor} )
  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: { id: value },
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
    const product: IProduct = {
      id: form.id,
      name: form.name,
      price: form.price!,
      description: form.description,
      category: form.category,
    };
    setPendingApiCall(true);

    ProductService.save(product)
      .then((response) => {
        setPendingApiCall(false);
        navigate("/products");
      })
      .catch((error) => {
        if (error.response.data && error.response.data.validationErrors) {
          setErrors(error.response.data.validationErrors);
        }
        setApiError("Falha ao salvar o produto.");
        setPendingApiCall(false);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center">Cadastro de Produtos</h1>
      <div className="col-12 mb-3">
        <Input
          name="name"
          label="Name"
          type="text"
          className="form-control"
          placeholder="Informe o nome"
          value={form.name}
          onChange={onChange}
          hasError={errors.name ? true : false}
          error={errors.name}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          name="price"
          label="Preço"
          type="text"
          className="form-control"
          placeholder="Informe o preço"
          value={form.price.toString()}
          onChange={onChange}
          hasError={errors.price ? true : false}
          error={errors.price}
        />
      </div>
      <div className="col-12 mb-3">
        <label>Descrição</label>
        <textarea
          className="form-control"
          name="description"
          placeholder="Informe a descrição"
          value={form.description}
          onChange={onChange}
        ></textarea>
        {errors.description && (
          <div className="invalid-feedback d-block">{errors.description}</div>
        )}
      </div>
      <div className="col-12 mb-3">
        <label>Categoria</label>
        
        
        {errors.category && (
          <div className="invalid-feedback d-block">{errors.category}</div>
        )}
      </div>
      {apiError && <div className="alert alert-danger">{apiError}</div>}
      <div className="text-center mb-3">
        <ButtonWithProgress
          className="btn btn-primary"
          onClick={onSubmit}
          disabled={pendingApiCall ? true : false}
          pendingApiCall={pendingApiCall}
          text="Salvar"
        />
      </div>
      <div className="text-center">
        <Link to="/products" className="nav nav-link">
          Voltar
        </Link>
      </div>
    </div>
  );
}
