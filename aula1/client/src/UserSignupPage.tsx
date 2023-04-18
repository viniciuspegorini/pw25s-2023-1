import { ChangeEvent, useState } from "react"

export function UserSignupPage() {
  const [form, setForm] = useState({
    displayName: "",
    username: "",
    password: "",
  })

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target
    setForm( (previousForm) => {
        return {
            ...previousForm,
            [name]: value
        }
    })
  }

  const onClickSignup = () => {
    const user = {
        displayName: form.displayName,
        username: form.username,
        password: form.password,
    }
    console.log( user );
  }


  return (
    <div className="container">
      <h1 className="text-center">User Signup</h1>
      <div className="col-12 mb-3">
        <label>Informe seu nome</label>
        <input
          className="form-control"
          type="text"
          placeholder="Informe o seu nome"
          name="displayName"
          onChange={onChange}
          value={form.displayName}
        />
      </div>
      <div className="col-12 mb-3">
        <label>Informe seu username</label>
        <input
          className="form-control"
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
          className="form-control"
          type="password"
          placeholder="Informe a sua senha"
          name="password"
          onChange={onChange}
          value={form.password}
        />
      </div>
      <div className="text-center">
        <button 
            onClick={onClickSignup}
            className="btn btn-primary">
        Cadastrar</button>
      </div>
    </div>
  )
}
