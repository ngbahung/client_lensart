import Card from "./Card";

const Dashboard = () => {
  return (
    <div className="bg-white p-6 rounded-md">
      <div className="grid grid-cols-3 gap-4">
        <Card title="Today's Orders" value="1" />
        <Card title="New Customers" value="5" />
        <Card title="Revenue" value="$500" />
        <Card title="Products Sold" value="20" />
        <Card title="Total Visits" value="300" />
        <Card title="Profit Margin" value="25%" />
        <Card title="Completed Orders" value="18" />
        <Card title="Pending Orders" value="2" />
        <Card title="Cancelled Orders" value="1" />
      </div>
    </div>
  );
};

export default Dashboard;
