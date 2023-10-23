import { ChangeEvent, useState } from "react";
import { IUserLogin } from "@/commons/interfaces";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import AuthService from "@/service/AuthService";
import { Input } from "@/components/Input";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiError, setApiError] = useState(false);
  const navigate = useNavigate();
  
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
  };

  const onClickLogin = () => {
    setPendingApiCall(true);

    const userLogin: IUserLogin = {
      username: form.username,
      password: form.password,
    };
    AuthService.login(userLogin)
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setPendingApiCall(false);
        navigate("/home");
      })
      .catch((errorResponse) => {
        setApiError(true);
        setPendingApiCall(false);
        console.log(errorResponse);
      });
  };
  return (
    <>
      <main className="container">
        <form>
          <div className="text-center">
            <h1 className="h3 mb-3 fw-normal">Login</h1>
          </div>

          <div className="form-floating mb-3">
            <Input
              label="Informe seu usuário"
              type="text"
              className="form-control"
              placeholder="Informe o seu usuário"
              onChange={onChange}
              value={form.username}
              name="username"
              error={""}
              hasError={false}
            />
          </div>

          <div className="form-floating mb-3">
            <Input
              label="Informe sua senha"
              type="password"
              className="form-control"
              placeholder="Informe a sua senha"
              onChange={onChange}
              value={form.password}
              name="password"
              error={""}
              hasError={false}
            />
          </div>

          {apiError && (
            <div className="alert alert-danger">Falha ao efetuar login</div>
          )}

          <ButtonWithProgress
            disabled={pendingApiCall}
            className="w-100 btn btn-lg btn-primary mb-3"
            onClick={onClickLogin}
            pendingApiCall={pendingApiCall}
            text="Entrar"
          />

          <div className="text-center">
            <span>Não possui cadastro? </span>
            <Link className="btn btn-outline-secondary" to="/signup">
              Cadastrar-se
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
