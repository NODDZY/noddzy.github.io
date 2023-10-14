import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

interface ExperienceChartProps {
  timestamps: string[];
  data: number[];
}

export default function ExperienceChart({ timestamps, data }: ExperienceChartProps) {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const graphData = {
    labels: formatLabels(timestamps),
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
          text: "Experience"
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

function formatLabels(timestamps: string[]) {
  const formattedDates = timestamps.map((dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);

    return `${month} ${day}`;
  });

  return formattedDates;
}
