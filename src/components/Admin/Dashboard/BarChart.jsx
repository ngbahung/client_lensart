import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, loading, selectedBranch, selectedMonth, selectedYear }) => {
  if (loading || !data) {
    return (
      <div className="bg-[rgba(239,249,249,1)] p-4 rounded-[8px] h-full w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const sortedDays = Object.keys(data).sort((a, b) => parseInt(a) - parseInt(b));

  const chartData = {
    labels: sortedDays.map(day => `Day ${day}`),
    datasets: [
      {
        label: 'Daily Revenue (VND)',
        data: sortedDays.map(day => Number(data[day])),
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

  return (
    <div className="bg-[rgba(239,249,249,1)] p-4 rounded-[8px] h-full w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;