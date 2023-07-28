import React, { useState, useEffect } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAuthContext } from "../../Contexts/AuthContext";
import "./style.css";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  preco: number;
  url: string;
}

const HomePage: React.FC = () => {
  const { authenticatedUser } = useAuthContext();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [busca, setBusca] = useState<string>("");
  const [ordenarPorPreco, setOrdenarPorPreco] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticatedUser) {
      getProdutos();
    } else {
      navigate("/");
    }
  }, []);

  const getProdutos = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get<Produto[]>(
        "https://6483c3aaee799e3216261968.mockapi.io/produtos"
      );

      const ordemCategoria = data.sort((crescente, decrescente) => {
        const nomeCategoriaCrescente = crescente.categoria.toLowerCase();
        const nomeCategoriaDecrescente = decrescente.categoria.toLowerCase();
        return nomeCategoriaCrescente.localeCompare(nomeCategoriaDecrescente);
      });

      setProdutos(ordemCategoria);
    } catch (error) {
      console.log("Erro ao obter os produtos:", error);
    }

    setLoading(false);
  };

  const deletarProduto = async (id: number) => {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir este item?"
    );
    if (confirmacao) {
      try {
        await axios.delete(
          `https://6483c3aaee799e3216261968.mockapi.io/produtos/${id}`
        );
        setProdutos(produtos.filter((produto) => produto.id !== id));
      } catch (error) {
        console.error("Erro ao excluir o produto:", error);
      }
    }
  };

  const handleSearch = () => {
    let produtosFiltrados = produtos.filter(
      (produto) =>
        produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
        produto.categoria.toLowerCase().includes(busca.toLowerCase())
    );

    if (ordenarPorPreco) {
      produtosFiltrados = produtosFiltrados.sort(
        (menor, maior) => menor.preco - maior.preco
      );
    }

    return produtosFiltrados;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(event.target.value);
  };

  const filteredProducts = handleSearch();

  const handleOrdenarPorPreco = () => {
    setOrdenarPorPreco(!ordenarPorPreco);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="MainContainer">
      <div className="containerBusca">
        <input
          className="inputBusca"
          value={busca}
          onChange={handleInputChange}
          type="search"
          placeholder="O que você procura?"
          aria-label="Search"
          style={{ display: "flex", justifyContent: "center" }}
        />
        <button className="button" onClick={handleLogout}>
          <ExitToAppIcon className="button-icon" />
          Logout
        </button>
        <button className="botaoPreco" onClick={handleOrdenarPorPreco}>
          <FilterAltIcon /> {ordenarPorPreco} Menor Preço
        </button>
      </div>
      <div className="produtos-container">
        {filteredProducts.map((produto) => (
          <div key={produto.id} className="produto-card">
            <img src={produto.url} alt="Produto" className="produto-imagem" />
            <div className="produto-info">
              <h3 style={{ marginTop: "15px" }}>{produto.nome}</h3>
              <p>Descrição: {produto.descricao}</p>
              <p>Categoria: {produto.categoria}</p>
              <p className="h5" style={{ color: "rgb(8, 175, 30)" }}>
                Preço: R${produto.preco}
              </p>
            </div>
            <div className="produto-botoes">
              <button id="b1" onClick={() => deletarProduto(produto.id)}>
                Excluir
              </button>
              <Link to={`/atualizar/${produto.id}`} style={{ margin: 0 }}>
                <button id="b2">Atualizar</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
