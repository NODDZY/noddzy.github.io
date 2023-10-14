import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { formatLabels, formatNumber } from "../../services/osrs/utils";

interface ExperienceChartProps {
  timestamps: string[];
  data: number[];
  color: string;
  title: string;
  label: string;
}

export default function ExperienceChart({ timestamps, data, color, title, label }: ExperienceChartProps) {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const graphData = {
    labels: formatLabels(timestamps),
    datasets: [
      {
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: color
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: title
        },
        ticks: {
          callback: (value: string | number) => formatNumber(value, true)
        }
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
