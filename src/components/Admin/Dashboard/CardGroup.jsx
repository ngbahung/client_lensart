import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const CardGroup = ({ selectedBranch, selectedMonth, selectedYear }) => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const mockData = [
    { title: "New Customers", value: "5" },
    { title: "Revenue", value: "500000 VND" },
    { title: "Products Sold", value: "20" },
    { title: "Completed Orders", value: "18" },
    { title: "Processed Orders", value: "2" },
    { title: "Cancelled Orders", value: "1" }
  ];

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/dashboard/statistics`,
          {
            params: {
              branch: selectedBranch,
              month: selectedMonth,
              year: selectedYear
            }
          }
        );
        setCardData(data);
      } catch (error) {
        console.error('Error fetching card data:', error);
        // Use mock data when API fails
        const randomFactor = Math.random() * 2 + 0.5;
        const adjustedMockData = mockData.map(card => ({
          ...card,
          value: card.title === "Revenue" 
            ? `${Math.floor(parseInt(card.value) * randomFactor)} VND`
            : Math.floor(parseInt(card.value) * randomFactor).toString()
        }));
        setCardData(adjustedMockData);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [selectedBranch, selectedMonth, selectedYear]);

  if (loading) {
    return <div className="grid grid-cols-3 gap-4">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {(cardData || mockData).map((card, index) => (
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