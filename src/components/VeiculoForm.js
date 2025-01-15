import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Cadastrar Veículo</h1>
      <input
        type="text"
        placeholder="Veículo"
        value={veiculo.veiculo}
        onChange={(e) => setVeiculo({ ...veiculo, veiculo: e.target.value })}
      />
      <input
        type="text"
        placeholder="Marca"
        value={veiculo.marca}
        onChange={(e) => setVeiculo({ ...veiculo, marca: e.target.value })}
      />
      <input
        type="number"
        placeholder="Ano"
        value={veiculo.ano}
        onChange={(e) => setVeiculo({ ...veiculo, ano: e.target.value })}
      />
      <textarea
        placeholder="Descrição"
        value={veiculo.descricao}
        onChange={(e) => setVeiculo({ ...veiculo, descricao: e.target.value })}
      />
      <label>
        Vendido:
        <input
          type="checkbox"
          checked={veiculo.vendido}
          onChange={(e) => setVeiculo({ ...veiculo, vendido: e.target.checked })}
        />
      </label>
      <button type="submit">Salvar</button>
    </form>
  );
}

export default VeiculoForm;
