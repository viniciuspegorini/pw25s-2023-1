import { IUserLogin, IUserSignup } from "../commons/interfaces";
import { api } from "../lib/axios"

const signup = (user : IUserSignup) => {
    return api.post("/users", user);
}

const login = (user : IUserLogin) => {
    return api.post("/login", user);
}

const AuthService = {
    signup,
    login
}

export default AuthService;