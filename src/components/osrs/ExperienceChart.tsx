import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

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

// Rest of the code remains the same
function formatLabels(timestamps: string[]) {
  const formattedDates = timestamps.map((dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);

    return `${month} ${day}`;
  });

  return formattedDates;
}
