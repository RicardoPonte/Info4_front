import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts/AuthContext";
import "./style.css";

const API_BASE_URL = "http://localhost:8080/info4/api";

const LoginForm: React.FC = () => {
  const { setAuthenticatedUser } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.get(`${API_BASE_URL}`, {
        params: { email },
      });
      const userData = response.data;

      if (userData.email === email && userData.senha === password) {
        setAuthenticatedUser(userData);
        navigate("/Home");
        alert("Login bem-sucedido!");
      } else {
        alert("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div id="login">
      <h1 className="title">Seja Bem-Vindo</h1>
      <form className="form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="actions">
          <button className="botaoEntrar" type="submit" onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
