import { ChangeEvent, useState } from "react";
import AuthService from "../service/AuthService";
import { IUserLogin } from "../commons/interfaces";
import { ButtonWithProgress } from "../components/ButtonWithProgress";
import { Link } from "react-router-dom";

export function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [apiError, setApiError] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
    setApiError(false);
  };

  const onClickLogin = () => {
    const user: IUserLogin = {
      username: form.username,
      password: form.password,
    };
    console.log(user);
    setPendingApiCall(true);
    AuthService.login(user)
          .then((response)=>{
            console.log(response.data);
            setUserAuthenticated(true);
            setApiError(false);
          })
          .catch((responseError) => {
            console.log(responseError.response);
            setUserAuthenticated(false);
            setApiError(true);
          })
          .finally( () => {
            setPendingApiCall(false);
          });
    console.log("DEPOIS DO POST DO AXIOS");
  };

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <div className="col-12 mb-3">
        <label>Informe seu username</label>
        <input
          className={apiError ? "form-control is-invalid" : "form-control"}
          type="text"
          placeholder="Informe o seu username"
          name="username"
          onChange={onChange}
          value={form.username}
        />
      </div>
      <div className="col-12 mb-3">
        <label>Informe sua senha</label>
        <input
          className={apiError ? "form-control is-invalid" : "form-control"}
          type="password"
          placeholder="Informe a sua senha"
          name="password"
          onChange={onChange}
          value={form.password}
        />
      </div>
      <div className="text-center">
        <ButtonWithProgress 
          onClick={onClickLogin} 
          className="btn btn-primary"
          disabled={pendingApiCall}
          pendingApiCall={pendingApiCall}
          text="Cadastrar"
        />
        {userAuthenticated && <div className="alert alert-success">Usuário autenticado com sucesso!</div>}
        {apiError && <div className="alert alert-danger">Falha ao autenticar o usuário.</div>}
      </div>
      <div className="text-center">
        <span>não possui cadastro? </span>
        <Link to="/signup">Cadastrar-se</Link>

      </div>
    </div>
  );
}
