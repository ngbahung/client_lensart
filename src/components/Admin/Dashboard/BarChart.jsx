import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ selectedBranch, selectedMonth, selectedYear }) => {
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDaysInMonth = (month, year) => {
    const days = new Date(year, month, 0).getDate();
    return Array.from({ length: days }, (_, i) => (i + 1).toString());
  };

  const generateMockRevenueData = (daysCount) => {
    return Array.from({ length: daysCount }, () => Math.floor(Math.random() * 5000) + 1000);
  };

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await fetch(`your-api-endpoint/revenue?branch=${selectedBranch}&month=${selectedMonth}&year=${selectedYear}`);
        const data = await response.json();
        setRevenueData(data);
      } catch (error) {
        console.log('Error fetching revenue data, using mock data:', error);
        const daysInMonth = getDaysInMonth(parseInt(selectedMonth), parseInt(selectedYear));
        const mockRevenue = generateMockRevenueData(daysInMonth.length);
        setRevenueData({
          days: daysInMonth,
          revenue: mockRevenue
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, [selectedBranch, selectedMonth, selectedYear]);

  const data = {
    labels: revenueData?.days || [],
    datasets: [
      {
        label: 'Daily Revenue (VND)',
        data: revenueData?.revenue || [],
        backgroundColor: 'rgba(85,213,210,0.6)',
        borderColor: 'rgba(85,213,210,1)',
        borderWidth: 1
      }
    ]
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
        text: `Daily Revenue Overview - ${selectedBranch} - ${selectedMonth}/${selectedYear}`,
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Revenue (VND)'
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;