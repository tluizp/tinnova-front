import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';

function Estatisticas() {
  const [estatisticas, setEstatisticas] = useState({});

  useEffect(() => {
    api.get('/veiculos/estatisticas')
      .then((response) => setEstatisticas(response.data))
      .catch((error) => console.error('Erro ao buscar estatísticas:', error));
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Estatísticas</h1>
      
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Por Década</Card.Title>
          <ListGroup>
            {estatisticas.decadas?.map((decada) => (
              <ListGroup.Item key={decada.decada}>
                {decada.decada}: {decada.quantidade} veículos
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Por Fabricante</Card.Title>
          <ListGroup>
            {estatisticas.fabricantes?.map((fabricante) => (
              <ListGroup.Item key={fabricante.marca}>
                {fabricante.marca}: {fabricante.quantidade} veículos
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Registrados na Última Semana</Card.Title>
          <ListGroup>
            {estatisticas.ultimos7Dias?.map((lastWeek) => (
              <ListGroup.Item key={lastWeek.id}>
                {lastWeek.veiculo} -- {lastWeek.ano} -- {new Date(lastWeek.created).toLocaleDateString()}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Quantidade de Veículos Não Vendidos</Card.Title>
          <ListGroup>
            {estatisticas.naoVendidos?.map((naoVendidos) => (
              <ListGroup.Item key={naoVendidos.id}>
                {naoVendidos.veiculo} -- {naoVendidos.ano} -- {new Date(naoVendidos.created).toLocaleDateString()}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Estatisticas;
