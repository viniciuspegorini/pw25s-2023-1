import { Input } from "@/components/Input";
import { ChangeEvent, useState } from "react";

export function CategoryFormPage() {
  const [form, setForm] = useState({
    id: undefined,
    name: "",
  });
  const [errors, setErrors] = useState({
    id: undefined,
    name: "",
  });

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
      </div>
    </div>
  );
}
