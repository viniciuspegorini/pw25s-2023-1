import { ChangeEvent, useState } from "react";
import AuthService from "../service/AuthService";
import { IUserSignup } from "../commons/interfaces";
import { ButtonWithProgress } from "../components/ButtonWithProgress";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";

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
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const navigate = useNavigate();


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
    setPendingApiCall(true);
    const user: IUserSignup = {
      displayName: form.displayName,
      username: form.username,
      password: form.password,
    };
    console.log(user);
    AuthService.signup(user)
      .then((response) => {
        console.log(response);

        setUserSaved(true);
        setApiError(false);
        navigate("/");
      })
      .catch((responseError) => {
        setUserSaved(false);
        setApiError(true);
        console.log(responseError.response);
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
    console.log("DEPOIS DO POST DO AXIOS");
  };

  return (
    <div className="container">
      <h1 className="text-center">User Signup</h1>

      <div className="col-12 mb-3">
        <Input
          label="Informe seu nome"
          className="form-control"
          type="text"
          placeholder="Informe o seu nome"
          name="displayName"
          onChange={onChange}
          value={form.displayName}
          hasError={errors.displayName ? true : false}
          error={errors.displayName}
        />
      </div>

      <div className="col-12 mb-3">
        <Input
          label="Informe seu username"
          className="form-control"
          type="text"
          placeholder="Informe o seu username"
          name="username"
          onChange={onChange}
          value={form.username}
          hasError={errors.username ? true : false}
          error={errors.username}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          label="Informe a sua senha"
          className="form-control"
          type="password"
          placeholder="Informe a sua senha"
          name="password"
          onChange={onChange}
          value={form.password}
          hasError={errors.password ? true : false}
          error={errors.password}
        />
      </div>
      <div className="text-center">
        <ButtonWithProgress
          onClick={onClickSignup}
          className="btn btn-primary"
          disabled={pendingApiCall}
          pendingApiCall={pendingApiCall}
          text="Cadastrar"
        />
        {userSaved && (
          <div className="alert alert-success">
            Usuário cadastrado com sucesso!
          </div>
        )}
        {apiError && (
          <div className="alert alert-danger">
            Falha ao cadastrar o usuário.
          </div>
        )}
      </div>
      <div className="text-center">
        <span>já possui cadastro? </span>
        <Link to="/">Autenticar-se</Link>
      </div>
    </div>
  );
}
