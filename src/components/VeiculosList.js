import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

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
    <div>
      <h1>Lista de Veículos</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={acessarEstatisticas} style={{ marginRight: '10px' }}>
          Ver Estatísticas
        </button>
        <button onClick={novoVeiculo}>Criar Novo Veículo</button>
      </div>
      <ul>
        {veiculos.map((veiculo) => (
          <li key={veiculo.id}>
            {veiculo.veiculo} - {veiculo.marca} ({veiculo.ano}) 
            <button onClick={() => iniciarEdicao(veiculo)}>Editar</button>
            <button onClick={() => api.delete(`/veiculos/${veiculo.id}`)
              .then(() => setVeiculos((prev) => prev.filter((v) => v.id !== veiculo.id)))
              .catch((error) => console.error('Erro ao excluir veículo:', error))}>
              Deletar
            </button>
          </li>
        ))}
      </ul>

      {isEditing && (
        <div>
          <h2>Editar Veículo</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Veículo:
              <input
                type="text"
                value={editVeiculo.veiculo}
                onChange={(e) =>
                  setEditVeiculo({ ...editVeiculo, veiculo: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Marca:
              <input
                type="text"
                value={editVeiculo.marca}
                onChange={(e) =>
                  setEditVeiculo({ ...editVeiculo, marca: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Ano:
              <input
                type="number"
                value={editVeiculo.ano}
                onChange={(e) =>
                  setEditVeiculo({ ...editVeiculo, ano: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Descrição:
              <textarea
                value={editVeiculo.descricao}
                onChange={(e) =>
                  setEditVeiculo({ ...editVeiculo, descricao: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Vendido:
              <input
                type="checkbox"
                checked={editVeiculo.vendido}
                onChange={(e) =>
                  setEditVeiculo({ ...editVeiculo, vendido: e.target.checked })
                }
              />
            </label>
            <br />
            <button onClick={salvarEdicao}>Salvar</button>
            <button onClick={cancelarEdicao}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default VeiculosList;
