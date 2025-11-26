import { useState, useEffect } from "react";
import axios from 'axios'; // Add this import
import CardGroup from "../../components/Admin/Dashboard/CardGroup";
import LineGraph from "../../components/Admin/Dashboard/LineGraph";
import BarChart from "../../components/Admin/Dashboard/BarChart";

const DashboardPage = () => {
  // Get current date for default values
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString(); // getMonth() returns 0-11
  const currentYear = currentDate.getFullYear().toString();
  
  const [selectedBranch, setSelectedBranch] = useState("Hồ Chí Minh");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const branches = ["Hồ Chí Minh", "Đà Nẵng", "Hà Nội"];
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from(
    { length: new Date().getFullYear() - 2023 },
    (_, i) => (2024 + i).toString()
  ).reverse(); // Sort years in descending order

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'http://localhost:8000/api/dashboard',
          {
            params: {
              branch_name: selectedBranch,
              month: selectedMonth,
              year: selectedYear
            }
          }
        );
        
        if (response.data.status === "success") {
          const responseData = response.data.data;
          
          // Deep clone and normalize the order_status_overview data
          const normalizedData = {
            ...responseData,
            order_status_overview: Object.keys(responseData.order_status_overview)
              .reduce((acc, day) => {
                const dayData = responseData.order_status_overview[day];
                acc[day] = {
                  delivered_orders: parseInt(dayData.delivered_orders) || 0,
                  processed_orders: parseInt(dayData.processed_orders) || 0,
                  cancelled_orders: parseInt(dayData.cancelled_orders) || 0
                };
                return acc;
              }, {})
          };

          console.log('Normalized dashboard data:', normalizedData);
          setDashboardData(normalizedData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setDashboardData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedBranch, selectedMonth, selectedYear]);

  return (
    <div className="bg-white p-6 rounded-md mt-10">
      <div className="flex justify-end gap-4 mb-6">
        <div className="flex flex-col gap-2 w-[150px]">
          <label className="text-[rgba(85,213,210,1)] font-bold text-center">Branch</label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-[rgba(239,249,249,1)] p-2 rounded-[20px] border-2 border-[rgba(85,213,210,1)] text-[rgba(85,213,210,1)] w-full focus:outline-none text-left pl-3 group"
          >
            {branches.map((branch) => (
              <option key={branch} value={branch} className="text-left hover:bg-[rgba(85,213,210,1)] hover:text-white">
                {branch}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-[90px]">
          <label className="text-[rgba(85,213,210,1)] font-bold text-center">Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-[rgba(239,249,249,1)] p-2 rounded-[20px] border-2 border-[rgba(85,213,210,1)] text-[rgba(85,213,210,1)] w-full focus:outline-none text-left pl-3 group"
          >
            {months.map((month) => (
              <option key={month} value={month} className="text-left hover:bg-[rgba(85,213,210,1)] hover:text-white">
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-[90px]">
          <label className="text-[rgba(85,213,210,1)] font-bold text-center">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-[rgba(239,249,249,1)] p-2 rounded-[20px] border-2 border-[rgba(85,213,210,1)] text-[rgba(85,213,210,1)] w-full focus:outline-none text-left pl-3 group"
          >
            {years.map((year) => (
              <option key={year} value={year} className="text-left hover:bg-[rgba(85,213,210,1)] hover:text-white">
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8 h-[400px]">
        <LineGraph 
          data={dashboardData?.order_status_overview}
          loading={loading}
          selectedBranch={selectedBranch}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
        <BarChart 
          data={dashboardData?.daily_revenue}
          loading={loading}
          selectedBranch={selectedBranch}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>
      <CardGroup 
        data={dashboardData}
        loading={loading}
        selectedBranch={selectedBranch}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default DashboardPage;