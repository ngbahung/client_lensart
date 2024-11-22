import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = () => {
  const mockData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [2500, 3200, 2800, 4500, 3800, 5200, 4800, 6000, 5500, 7000, 6500, 8000],
    orders: [25, 30, 28, 42, 38, 52, 48, 60, 55, 70, 65, 80]
  };

  const data = {
    labels: mockData.months,
    datasets: [
      {
        label: 'Revenue ($)',
        data: mockData.revenue,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4
      },
      {
        label: 'Orders',
        data: mockData.orders,
        fill: true,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        tension: 0.4
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // Add this line
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue & Orders Overview',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="bg-[rgba(239,249,249,1)] p-4 rounded-[8px] h-full w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
