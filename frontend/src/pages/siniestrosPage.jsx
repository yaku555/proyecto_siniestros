// src/pages/SiniestrosPage.js
import React, { useContext } from 'react';
import SiniestroContext from '../context/siniestroContext';
import SiniestroCard from '../components/siniestroCard';

const SiniestrosPage = () => {
  const { siniestros } = useContext(SiniestroContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Siniestros</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {siniestros.length > 0 ? (
          siniestros.map((siniestro) => (
            <SiniestroCard key={siniestro.idSiniestro} siniestro={siniestro} />
          ))
        ) : (
          <p>No se encontraron siniestros.</p>
        )}
      </div>
    </div>
  );
};

export default SiniestrosPage;
