import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts/AuthContext";
import "./style.css";

interface Produto {
  nome: string;
  descricao: string;
  categoria: string;
  preco: number;
  url: string;
}

function Atualizar() {
  const { authenticatedUser } = useAuthContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [produto, setProduto] = useState<Produto>({
    nome: "",
    descricao: "",
    categoria: "",
    preco: 0,
    url: "",
  });
  const [validated, setValidated] = useState(false);

  const fetchProduto = async () => {
    try {
      const response = await axios.get<Produto>(
        `https://6483c3aaee799e3216261968.mockapi.io/produtos/${id}`
      );
      setProduto(response.data);
    } catch (error) {
      console.error("Erro ao buscar o produto:", error);
    }
  };

  useEffect(() => {
    if (authenticatedUser) {
      fetchProduto();
    } else {
      navigate("/");
    }
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setProduto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (
      !produto.nome ||
      !produto.descricao ||
      !produto.categoria ||
      !produto.preco ||
      !produto.url
    ) {
      alert("Por favor, preencha todos os campos");
    } else if (produto.preco === 0) {
      alert("O valor do preço não pode ser 0.00");
    } else {
      try {
        await axios.put(
          `https://6483c3aaee799e3216261968.mockapi.io/produtos/${id}`,
          produto
        );
        alert("Produto atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar o produto:", error);
      }
    }

    setValidated(true);
  };

  return (
    <div id="d1">
      <h2>Atualizar Produto</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label style={{ color: "black" }}>Nome</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="descricao">
          <Form.Label style={{ color: "black" }}>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <p>Categoria</p>
        <Form.Select
          aria-label="Default select example"
          name="categoria"
          value={produto.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma categoria</option>
          <option value="Eletrônicos">Eletrônicos</option>
          <option value="Instrumentos Musicais">Instrumentos Musicais</option>
          <option value="Casa">Casa</option>
          <option value="Vestuário">Vestuário</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Ferramentas">Ferramentas</option>
          <option value="Esportes">Esportes</option>
          <option value="Veiculo">Veiculo</option>
        </Form.Select>

        <p>Preço</p>
        <InputGroup className="mb-3">
          <InputGroup.Text>R$</InputGroup.Text>
          <Form.Control
            type="number"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            required
            step="0.01"
            min="0.01"
          />
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>

        <Form.Group className="mb-3" controlId="url">
          <Form.Label style={{ color: "black" }}>URL da imagem</Form.Label>
          <Form.Control
            type="text"
            name="url"
            value={produto.url}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button id="b7" type="submit">
          Inserir
        </Button>
        <Link to={`/home`}>
          <Button>Voltar</Button>
        </Link>
      </Form>
    </div>
  );
}

export default Atualizar;
