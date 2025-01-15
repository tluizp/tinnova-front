import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Button, Form, Container } from 'react-bootstrap';

function VeiculoForm() {
  const [veiculo, setVeiculo] = useState({
    veiculo: '',
    marca: '',
    ano: '',
    descricao: '',
    vendido: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/veiculos', veiculo)
      .then(() => {
        alert('Veículo cadastrado!');
        navigate('/');
      })
      .catch((error) => {
        console.error('Erro ao cadastrar veículo:', error);
      });
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Cadastrar Veículo</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formVeiculo" className="mb-3">
          <Form.Label>Veículo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do veículo"
            value={veiculo.veiculo}
            onChange={(e) => setVeiculo({ ...veiculo, veiculo: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formMarca" className="mb-3">
          <Form.Label>Marca</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a marca do veículo"
            value={veiculo.marca}
            onChange={(e) => setVeiculo({ ...veiculo, marca: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formAno" className="mb-3">
          <Form.Label>Ano</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite o ano do veículo"
            value={veiculo.ano}
            onChange={(e) => setVeiculo({ ...veiculo, ano: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formDescricao" className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Digite uma descrição do veículo"
            value={veiculo.descricao}
            onChange={(e) => setVeiculo({ ...veiculo, descricao: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formVendido" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Vendido"
            checked={veiculo.vendido}
            onChange={(e) => setVeiculo({ ...veiculo, vendido: e.target.checked })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Form>
    </Container>
  );
}

export default VeiculoForm;
