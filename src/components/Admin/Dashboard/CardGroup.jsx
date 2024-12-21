import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const CardGroup = ({ data, loading }) => {
  if (loading) {
    return <div className="grid grid-cols-3 gap-4">Loading...</div>;
  }

  console.log('Card Group Data:', data); // Debug log

  const cardItems = [
    { title: "New Customers", value: data?.new_customers || 0 },
    { title: "Revenue", value: `${Number(parseFloat(data?.revenue || 0)).toLocaleString()} VND` },
    { title: "Products Sold", value: data?.products_sold || 0 },
    { title: "Delivered Orders", value: data?.delivered_orders || 0 },
    { title: "Pending Orders", value: data?.pending_orders || 0 },
    { title: "Cancelled Orders", value: data?.cancelled_orders || 0 }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {cardItems.map((card, index) => (
        <Card 
          key={index}
          title={card.title}
          value={card.value}
        />
      ))}
    </div>
  );
};

export default CardGroup;