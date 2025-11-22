import React, { useState, useEffect } from 'react';
import BlogCard from '../../components/EndUser/BlogCard/BlogCard';
import BlogLoadingSkeleton from '../../components/EndUser/Blog/BlogLoadingSkeleton';
import { getActiveBlogs } from '../../api/blogsAPI';

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Set page title
        document.title = 'Blog | LensArt';

        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await getActiveBlogs();
                if (response.status === 200) {
                    setBlogs(response.blogs || []);
                } else {
                    setError('Không thể tải bài viết');
                }
            } catch (err) {
                setError('Không thể tải bài viết');
                console.error('Error fetching blogs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();

        // Cleanup: Reset title when component unmounts
        return () => {
            document.title = 'LensArt';
        };
    }, []);

    const filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                    <p className="text-red-500 text-lg font-medium">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 bg-[#55d5d2] text-white rounded-lg hover:bg-[#3fb8b5] transition-colors"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#55d5d2] to-[#3fb8b5] text-white">
                <div className="container mx-auto px-4 pt-28 pb-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                            LensArt Blog
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8">
                            Khám phá những câu chuyện thú vị về thế giới kính mắt
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm bài viết..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-xl"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                {loading ? (
                    <BlogLoadingSkeleton />
                ) : (
                    <>
                        {/* Results Info */}
                        {searchTerm && (
                            <div className="mb-6 text-center">
                                <p className="text-gray-600">
                                    Tìm thấy <span className="font-bold text-[#55d5d2]">{filteredBlogs.length}</span> bài viết
                                    {searchTerm && ` cho "${searchTerm}"`}
                                </p>
                            </div>
                        )}

                        {filteredBlogs && filteredBlogs.length > 0 ? (
                            <>
                                {/* Blog Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredBlogs.map(blog => blog && (
                                        <div 
                                            key={blog.id || Math.random()}
                                            className="transform transition-all duration-300 hover:-translate-y-2"
                                        >
                                            <BlogCard blog={blog} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-2xl font-semibold text-gray-700 mb-2">
                                    {searchTerm ? 'Không tìm thấy kết quả' : 'Chưa có bài viết nào'}
                                </p>
                                <p className="text-gray-500 mb-6">
                                    {searchTerm ? 'Thử tìm kiếm với từ khóa khác' : 'Hãy quay lại sau để đọc những bài viết mới nhất'}
                                </p>
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="px-6 py-3 bg-[#55d5d2] text-white rounded-lg hover:bg-[#3fb8b5] transition-colors shadow-md"
                                    >
                                        Xóa bộ lọc
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogsPage;
