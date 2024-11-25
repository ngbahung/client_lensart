import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = ({ selectedBranch, selectedMonth, selectedYear }) => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to get days in month
  const getDaysInMonth = (month, year) => {
    const days = new Date(year, month, 0).getDate();
    return Array.from({ length: days }, (_, i) => (i + 1).toString());
  };

  // Function to generate mock data for days in month
  const generateMockDataForMonth = (daysCount) => {
    return {
      completedOrders: Array.from({ length: daysCount }, () => Math.floor(Math.random() * 20) + 10),
      processedOrders: Array.from({ length: daysCount }, () => Math.floor(Math.random() * 10) + 5),
      cancelledOrders: Array.from({ length: daysCount }, () => Math.floor(Math.random() * 5))
    };
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders/statistics`,
          {
            params: {
              branch: selectedBranch,
              month: selectedMonth,
              year: selectedYear
            }
          }
        );
        setOrderData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Generate mock data when API fails
        const daysInMonth = getDaysInMonth(parseInt(selectedMonth), parseInt(selectedYear));
        const mockDataForMonth = generateMockDataForMonth(daysInMonth.length);
        setOrderData({
          days: daysInMonth,
          ...mockDataForMonth
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [selectedBranch, selectedMonth, selectedYear]);

  const data = {
    labels: orderData?.days || [],
    datasets: [
      {
        label: 'Completed Orders',
        data: orderData?.completedOrders || [],
        fill: true,
        backgroundColor: 'rgba(236, 144, 92, 0.2)',
        borderColor: 'rgba(236, 144, 92, 1)',
        tension: 0.4
      },
      {
        label: 'Processed Orders',
        data: orderData?.processedOrders || [],
        fill: true,
        backgroundColor: 'rgba(123, 212, 111, 0.2)',
        borderColor: 'rgba(123, 212, 111, 1)',
        tension: 0.4
      },
      {
        label: 'Cancelled Orders',
        data: orderData?.cancelledOrders || [],
        fill: true,
        backgroundColor: 'rgba(143, 221, 220, 0.2)',
        borderColor: 'rgba(143, 221, 220, 1)',
        tension: 0.4
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Orders Status Overview - ${selectedBranch} - ${selectedMonth}/${selectedYear}`,
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

  if (loading) {
    return (
      <div className="bg-[rgba(239,249,249,1)] p-4 rounded-[8px] h-full w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[rgba(239,249,249,1)] p-4 rounded-[8px] h-full w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
