import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

interface ExperienceChartProps {
  timestamps: string[];
  data: number[];
}

export default function ExperienceChart({ timestamps, data }: ExperienceChartProps) {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const graphData = {
    labels: timestamps,
    datasets: [
      {
        label: "EXP",
        data: data,
        borderColor: "#646cff",
        backgroundColor: "rgba(69, 76, 225, 0.5)"
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  return (
    <Line
      data={graphData}
      options={options}
    />
  );
}
