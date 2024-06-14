// Importando las funciones necesarias desde React y el componente de gráficos de Google
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

// Importando funciones para obtener datos de pedidos por instrumento y por mes
import { getOrdersByInstrument, getOrdersByMonth } from '../servicios/FuncionesInstrumento';

// Importando estilos para el componente
import './css/Stats.css';

// Definiendo tipos de datos para los pedidos por mes y por instrumento
interface OrdersByMonth {
  monthYear: string;
  orderCount: number;
}

interface OrdersByInstrument {
  instrumentName: string;
  orderCount: number;
}

// Definiendo el componente principal
const ChartsGoogle: React.FC = () => {
  // Definiendo estados para almacenar datos de pedidos por mes, por instrumento y errores
  const [ordersByMonth, setOrdersByMonth] = useState<Array<Array<string | number>>>([]);
  const [ordersByInstrument, setOrdersByInstrument] = useState<Array<Array<string | number>>>([]);
  const [error, setError] = useState<string | null>(null);

  // Utilizando useEffect para cargar los datos cuando el componente se monta
  useEffect(() => {
    // Obtener datos de pedidos por mes
    getOrdersByMonth()
      .then((orders) => {
        // Transformando los datos en el formato requerido por el gráfico de columnas
        const chartData = [
          ['Month-Year', 'Orders'],
          ...orders.map((order: OrdersByMonth) => [order.monthYear, order.orderCount])
        ];
        // Actualizando el estado con los datos obtenidos
        setOrdersByMonth(chartData);
      })
      .catch((error) => {
        // Capturando errores en caso de fallo en la obtención de datos
        setError(`Error al obtener los datos de pedidos por mes: ${error.message}`);
      });

    // Obtener datos de pedidos por instrumento
    getOrdersByInstrument()
      .then((orders) => {
        // Transformando los datos en el formato requerido por el gráfico de pastel
        const chartData = [
          ['Instrument', 'Orders'],
          ...orders.map((order: OrdersByInstrument) => [order.instrumentName, order.orderCount])
        ];
        // Actualizando el estado con los datos obtenidos
        setOrdersByInstrument(chartData);
      })
      .catch((error) => {
        // Capturando errores en caso de fallo en la obtención de datos
        setError(`Error al obtener los datos de pedidos por instrumento: ${error.message}`);
      });
  }, []); // El segundo argumento [] indica que este efecto se ejecuta solo al montar el componente

  // Manejando errores
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Renderizando el componente con los gráficos
  return (
    <div className="stats align-items-center">
      <div style={{ marginBottom: '20px' }}>
        {/* Gráfico de columnas para mostrar la cantidad de pedidos por mes */}
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={ordersByMonth}
          options={{
            title: 'Cantidad de pedidos por mes y año',
            hAxis: { title: 'Mes-Año' },
            vAxis: { title: 'Cantidad de pedidos' },
          }}
        />
      </div>

      {/* Gráfico de pastel para mostrar la cantidad de pedidos por instrumento */}
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={ordersByInstrument}
        options={{
          title: 'Cantidad de pedidos por instrumento',
        }}
      />
    </div>
  );
};

// Exportando el componente para su uso en otras partes de la aplicación
export default ChartsGoogle;
