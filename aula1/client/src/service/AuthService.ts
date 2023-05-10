import { IUserLogin, IUserSignup } from "../commons/interfaces";
import { api } from "../lib/axios"

const signup = (user : IUserSignup) => {
    return api.post("/users", user);
}

const login = (user : IUserLogin) => {
    return api.post("/login", user);
}

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`
    }
    return token ? true : false;
}

const AuthService = {
    signup,
    login,
    isAuthenticated
}

export default AuthService;