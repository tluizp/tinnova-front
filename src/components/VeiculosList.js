import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Button, Container, Row, Col, Form, ListGroup, Modal } from 'react-bootstrap';

function VeiculosList() {
  const [veiculos, setVeiculos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editVeiculo, setEditVeiculo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/veiculos')
      .then((response) => setVeiculos(response.data))
      .catch((error) => console.error('Erro ao buscar veículos:', error));
  }, []);

  // Navegar para a página de estatísticas
  const acessarEstatisticas = () => {
    navigate('/estatisticas');
  };

  // Navegar para o formulário de criação de novo veículo
  const novoVeiculo = () => {
    navigate('/novo');
  };

  // Abrir o formulário de edição
  const iniciarEdicao = (veiculo) => {
    setEditVeiculo(veiculo);
    setIsEditing(true);
  };

  // Cancelar a edição
  const cancelarEdicao = () => {
    setEditVeiculo(null);
    setIsEditing(false);
  };

  // Salvar as alterações
  const salvarEdicao = () => {
    if (editVeiculo) {
      api.put(`/veiculos/${editVeiculo.id}`, editVeiculo)
        .then(() => {
          alert('Veículo atualizado com sucesso!');
          setVeiculos((prev) =>
            prev.map((v) => (v.id === editVeiculo.id ? editVeiculo : v))
          );
          cancelarEdicao();
        })
        .catch((error) => console.error('Erro ao editar veículo:', error));
    }
  };

  return (
    <Container className="mt-4">
      <h1>Lista de Veículos</h1>
      <div className="mb-3">
        <Button variant="primary" onClick={acessarEstatisticas} className="me-2">
          Ver Estatísticas
        </Button>
        <Button variant="success" onClick={novoVeiculo}>
          Criar Novo Veículo
        </Button>
      </div>

      <ListGroup>
        {veiculos.map((veiculo) => (
          <ListGroup.Item key={veiculo.id} className="d-flex justify-content-between align-items-center">
            <div>
              {veiculo.veiculo} - {veiculo.marca} ({veiculo.ano})
            </div>
            <div>
              <Button variant="warning" onClick={() => iniciarEdicao(veiculo)} className="me-2">
                Editar
              </Button>
              <Button variant="danger" onClick={() => api.delete(`/veiculos/${veiculo.id}`)
                .then(() => setVeiculos((prev) => prev.filter((v) => v.id !== veiculo.id)))
                .catch((error) => console.error('Erro ao excluir veículo:', error))}>
                Deletar
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={isEditing} onHide={cancelarEdicao}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Veículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId="formVeiculo">
              <Form.Label>Veículo</Form.Label>
              <Form.Control
                type="text"
                value={editVeiculo?.veiculo || ''}
                onChange={(e) =>
                  setEditVeiculo({ ...editVeiculo, veiculo: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formMarca" className="mt-3">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                value={editVeiculo?.marca || ''}
                onChange={(e) =>
                  setEditVeiculo({ ...editVeiculo, marca: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formAno" className="mt-3">
              <Form.Label>Ano</Form.Label>
              <Form.Control
                type="number"
                value={editVeiculo?.ano || ''}
                onChange={(e) =>
                  setEditVeiculo({ ...editVeiculo, ano: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDescricao" className="mt-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                value={editVeiculo?.descricao || ''}
                onChange={(e) =>
                  setEditVeiculo({ ...editVeiculo, descricao: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formVendido" className="mt-3">
              <Form.Check
                type="checkbox"
                label="Vendido"
                checked={editVeiculo?.vendido || false}
                onChange={(e) =>
                  setEditVeiculo({ ...editVeiculo, vendido: e.target.checked })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarEdicao}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={salvarEdicao}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default VeiculosList;
