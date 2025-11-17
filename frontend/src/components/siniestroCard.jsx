// src/components/SiniestroCard.js
import React from 'react';

const SiniestroCard = ({ siniestro }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold">ID: {siniestro.idSiniestro}</h2>
      <p><strong>Estado:</strong> {siniestro.estadoSiniestro}</p>
      <p><strong>Dirección:</strong> {siniestro.direccionSin}</p>
      <p><strong>Comuna:</strong> {siniestro.comunaSin}</p>
    </div>
  );
};

export default SiniestroCard;
