import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = ({ data, loading, selectedBranch, selectedMonth, selectedYear }) => {
  if (loading || !data) {
    return (
      <div className="bg-[rgba(239,249,249,1)] p-4 rounded-[8px] h-full w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  console.log('LineGraph received data:', data);

  const days = Object.keys(data).sort((a, b) => parseInt(a) - parseInt(b));
  
  const getOrdersData = (day, type) => {
    const value = data[day]?.[type];
    console.log(`Day ${day} ${type}:`, value);
    return parseInt(value) || 0;
  };

  const chartData = {
    labels: days.map(day => `Day ${day}`),
    datasets: [
      {
        label: 'Delivered Orders',
        data: days.map(day => getOrdersData(day, 'delivered_orders')),
        fill: true,
        backgroundColor: 'rgba(236, 144, 92, 0.2)',
        borderColor: 'rgba(236, 144, 92, 1)',
        tension: 0.4
      },
      {
        label: 'Processed Orders',
        data: days.map(day => getOrdersData(day, 'processed_orders')),
        fill: true,
        backgroundColor: 'rgba(123, 212, 111, 0.2)',
        borderColor: 'rgba(123, 212, 111, 1)',
        tension: 0.4
      },
      {
        label: 'Cancelled Orders',
        data: days.map(day => getOrdersData(day, 'cancelled_orders')),
        fill: true,
        backgroundColor: 'rgba(143, 221, 220, 0.2)',
        borderColor: 'rgba(143, 221, 220, 1)',
        tension: 0.4
      }
    ]
  };

  console.log('Chart data:', chartData);

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

  return (
    <div className="bg-[rgba(239,249,249,1)] p-4 rounded-[8px] h-full w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineGraph;
