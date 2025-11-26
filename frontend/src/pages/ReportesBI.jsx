import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useSiniestros } from "../context/SiniestroContext";  // Importamos el contexto

Chart.register(ArcElement, Tooltip, Legend);

// Función para contar ocurrencias por campo
const contar = (arr, campo) =>
  arr.reduce((acc, item) => ((acc[item[campo]] = (acc[item[campo]] || 0) + 1), acc), {});

export default function ReportesBI() {
  const { siniestros, loading, error } = useSiniestros();  // Usamos el contexto para obtener los siniestros

  // Configuración del gráfico
  const grafico = (conteo) => ({
    labels: Object.keys(conteo),
    datasets: [
      {
        data: Object.values(conteo),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A"],
      },
    ],
  });

  // Si los datos están cargando o hay un error, mostramos un mensaje
  if (loading) {
    return <p>Cargando siniestros...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="dashboard-cards">
      <div className="dashboard-card">
        <h3>Siniestros por comunas</h3>
        <div style={{ width: 200, height: 200 }}>
          <Pie data={grafico(contar(siniestros, "comunaSin"))} />
        </div>
      </div>
      <div className="dashboard-card">
        <h3>Siniestros por estado</h3>
        <div style={{ width: 200, height: 200 }}>
          <Pie data={grafico(contar(siniestros, "estadoSiniestro"))} />
        </div>
      </div>
    </div>
  );
}
