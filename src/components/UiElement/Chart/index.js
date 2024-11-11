/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import {
  Chart as ChartJS,
  // CategoryScale,
  // LinearScale,
  // PointElement,
  // LineElement,
  // BarElement,
  // ArcElement,
  // Title,
  // Tooltip,
  // Legend,
  registerables,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  // CategoryScale,
  // LinearScale,
  // PointElement,
  // LineElement,
  // BarElement,
  // ArcElement,
  // Title,
  // Tooltip,
  // Legend
  ...registerables
);

function Charts({ options, data, type }) {
  return <Chart type={type} options={options} data={data} />;
}

export default React.memo(Charts);
