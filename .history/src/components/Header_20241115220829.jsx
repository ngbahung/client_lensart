import { Link } from "react-router-dom";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const navItems = [
        { name: 'Gọng kính', path: '/gong-kinh' },
        { name: 'Kính mát', path: '/kinh-mat' },
        { name: 'Tròng kính', path: '/trong-kinh' },
        { name: 'Thương hiệu', path: '/thuong-hieu' },
    ];

    return (
        <div>
            <div>
                <Link to='/'>
                    <img src="" alt="Logo" />
                </Link>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 rounded-full bg-[#B2E5E5] bg-opacity-30 placeholder-gray-500 focus:outline-none"
                placeholder="Tìm gọng kính, kính mát, tròng kính..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
    );
}

export default Header;
