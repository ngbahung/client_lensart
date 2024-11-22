import { useState } from "react";
import CardGroup from "../../components/Admin/Dashboard/CardGroup";
import LineGraph from "../../components/Admin/Dashboard/LineGraph";
import BarChart from "../../components/Admin/Dashboard/BarChart";

const DashboardPage = () => {
  const [selectedBranch, setSelectedBranch] = useState("Hồ Chí Minh");
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedYear, setSelectedYear] = useState("2010");

  const branches = ["Hồ Chí Minh", "Đà Nẵng", "Hà Nội"];
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from(
    { length: new Date().getFullYear() - 2009 },
    (_, i) => (2010 + i).toString()
  );

  return (
    <div className="bg-white p-6 rounded-md">
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
        <div className="flex flex-col gap-2 w-[130px]">
          <label className="text-[rgba(85,213,210,1)] font-bold text-center">Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-[rgba(239,249,249,1)] p-2 rounded-[20px] border-2 border-[rgba(85,213,210,1)] text-[rgba(85,213,210,1)] w-full focus:outline-none text-left pl-3 group"
          >
            {months.map((month) => (
              <option key={month} value={month} className="text-left hover:bg-[rgba(85,213,210,1)] hover:text-white">
                Tháng {month}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-[130px]">
          <label className="text-[rgba(85,213,210,1)] font-bold text-center">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-[rgba(239,249,249,1)] p-2 rounded-[20px] border-2 border-[rgba(85,213,210,1)] text-[rgba(85,213,210,1)] w-full focus:outline-none text-left pl-3 group"
          >
            {years.map((year) => (
              <option key={year} value={year} className="text-left hover:bg-[rgba(85,213,210,1)] hover:text-white">
                Năm {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8 h-[400px]">
        <LineGraph 
          selectedBranch={selectedBranch}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
        <BarChart 
          selectedBranch={selectedBranch}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>
      <CardGroup 
        selectedBranch={selectedBranch}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default DashboardPage;