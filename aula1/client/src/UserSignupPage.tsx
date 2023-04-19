import axios from "axios";
import { ChangeEvent, useState } from "react";

export function UserSignupPage() {
  const [form, setForm] = useState({
    displayName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    displayName: "",
    username: "",
    password: "",
  });
  const [apiError, setApiError] = useState(false);
  const [userSaved, setUserSaved] = useState(false);



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

  const onClickSignup = () => {
    const user = {
      displayName: form.displayName,
      username: form.username,
      password: form.password,
    };
    console.log(user);
    axios.post("http://localhost:8025/users", user)
          .then((response)=>{
            console.log(response);

            setUserSaved(true);
            setApiError(false);

          })
          .catch((responseError) => {
            
            setUserSaved(false);
            setApiError(true);
            console.log(responseError.response);  
            if (responseError.response.data && responseError.response.data.validationErrors) {
              setErrors(responseError.response.data.validationErrors);
            }
          })
          .finally( () => {

          });
    console.log("DEPOIS DO POST DO AXIOS");
  };

  return (
    <div className="container">
      <h1 className="text-center">User Signup</h1>
      <div className="col-12 mb-3">
        <label>Informe seu nome</label>
        <input
          className={errors.displayName ? "form-control is-invalid" : "form-control"}
          type="text"
          placeholder="Informe o seu nome"
          name="displayName"
          onChange={onChange}
          value={form.displayName}
        />
        {errors.displayName && <div className="invalid-feedback">{errors.displayName}</div>}
      </div>
      <div className="col-12 mb-3">
        <label>Informe seu username</label>
        <input
          className={errors.username ? "form-control is-invalid" : "form-control"}
          type="text"
          placeholder="Informe o seu username"
          name="username"
          onChange={onChange}
          value={form.username}
        />
        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
      </div>
      <div className="col-12 mb-3">
        <label>Informe sua senha</label>
        <input
          className={errors.password ? "form-control is-invalid" : "form-control"}
          type="password"
          placeholder="Informe a sua senha"
          name="password"
          onChange={onChange}
          value={form.password}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>
      <div className="text-center">
        <button onClick={onClickSignup} className="btn btn-primary">
          Cadastrar
        </button>
        {userSaved && <div className="alert alert-success">Usuário cadastrado com sucesso!</div>}
        {apiError && <div className="alert alert-danger">Falha ao cadastrar o usuário.</div>}
      </div>
    </div>
  );
}
