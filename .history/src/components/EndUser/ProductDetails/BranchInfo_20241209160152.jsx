
const BranchInfo = () => {
    const branches = [
      "190 Nguyễn Thị Thập (Ngã ba chợ Tân Mỹ), P. Bình Thuận, Q.7, TP. Hồ Chí Minh",
      "190 Nguyễn Thị Thập (Ngã ba chợ Tân Mỹ), P. Bình Thuận, Q.7, TP. Hồ Chí Minh",
      // Add more branches if needed
    ];
  
    return (
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2">CÓ 2 CHI NHÁNH CÒN HÀNG</h3>
        {branches.map((branch, index) => (
          <p key={index} className="text-sm text-gray-600">
            {branch}
          </p>
        ))}
      </div>
    );
  };
  
ex