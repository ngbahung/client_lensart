
const ProductDetails = ({ price, discount, stock }) => {
    const [quantity, setQuantity] = useState(1);
  
    const handleQuantityChange = (type) => {
      setQuantity((prev) => (type === "increment" ? prev + 1 : prev > 1 ? prev - 1 : 1));
    };
  
    return (
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">GK.M GỌNG NHỰA AN221393 (50.18.145)</h1>
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-orange-500">{price}đ</span>
          <span className="line-through text-gray-500">500.000đ</span>
          <span className="text-green-500 font-semibold">-{discount}%</span>
        </div>
        <div className="flex space-x-4 items-center">
          <label className="font-semibold">Màu sắc:</label>
          <div className="flex space-x-2">
            <button className="border px-4 py-2 rounded-lg">Nâu</button>
            <button className="border px-4 py-2 rounded-lg">Nâu</button>
            <button className="border px-4 py-2 rounded-lg">Nâu</button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label className="font-semibold">Số lượng:</label>
          <button
            className="border px-3 py-1"
            onClick={() => handleQuantityChange("decrement")}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="border px-3 py-1"
            onClick={() => handleQuantityChange("increment")}
          >
            +
          </button>
        </div>
        <p className="text-sm text-gray-500">Còn lại {stock} sản phẩm</p>
        <div className="flex space-x-4">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg">MUA NGAY</button>
          <button className="border px-6 py-2 rounded-lg">THÊM VÀO GIỎ</button>
          <button className="text-red-500">
            <FaHeart size={24} />
          </button>
        </div>
      </div>
    );
  };

export default ProductDetails;