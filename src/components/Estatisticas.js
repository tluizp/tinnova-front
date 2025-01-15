import React, { useEffect, useState } from 'react';
import api from '../api';

function Estatisticas() {
  const [estatisticas, setEstatisticas] = useState({});

  useEffect(() => {
    api.get('/veiculos/estatisticas').then((response) => setEstatisticas(response.data));
  }, []);

  return (
    <div>
      <h1>Estatísticas</h1>
      <h2>Por Década</h2>
      <ul>
        {estatisticas.decadas?.map((decada) => (
          <li key={decada.decada}>
            {decada.decada}: {decada.quantidade} veículos
          </li>
        ))}
      </ul>
      <h2>Por Fabricante</h2>
      <ul>
        {estatisticas.fabricantes?.map((fabricante) => (
          <li key={fabricante.marca}>
            {fabricante.marca}: {fabricante.quantidade} veículos
          </li>
        ))}
      </ul>
      <h2>Registrados na ultima semana</h2>
      <ul>
        {estatisticas.ultimos7Dias?.map((lastWeek) => (
          <li key={lastWeek.id}>
            {lastWeek.veiculo} -- {lastWeek.ano} -- {lastWeek.created}
          </li>
        ))}
      </ul>
      <h2>Quatidade de veiculos nao vendidos</h2>
      <ul>
        {estatisticas.naoVendidos?.map((naoVendidos) => (
          <li key={naoVendidos.id}>
            {naoVendidos.veiculo} -- {naoVendidos.ano} -- {naoVendidos.created}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Estatisticas;
