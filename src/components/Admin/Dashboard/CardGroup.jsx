import { useState, useEffect } from 'react';
import Card from './Card';

const CardGroup = ({ selectedBranch, selectedMonth, selectedYear }) => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const mockData = [
    { title: "New Customers", value: "5" },
    { title: "Revenue", value: "$500" },
    { title: "Products Sold", value: "20" },
    { title: "Completed Orders", value: "18" },
    { title: "Pending Orders", value: "2" },
    { title: "Cancelled Orders", value: "1" }
  ];

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(
          `your-api-endpoint/statistics?branch=${selectedBranch}&month=${selectedMonth}&year=${selectedYear}`
        );
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.log('Error fetching card data, using mock data:', error);
        // Generate some random variations in mock data based on selected values
        const randomFactor = Math.random() * 2 + 0.5;
        const adjustedMockData = mockData.map(card => ({
          ...card,
          value: card.title === "Revenue" 
            ? `$${Math.floor(parseInt(card.value.slice(1)) * randomFactor)}`
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