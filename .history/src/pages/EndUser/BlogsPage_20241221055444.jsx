import React, { useState, useEffect } from 'react';
import BlogCard from '../../components/EndUser/BlogCard/BlogCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getAllBlogs } from '../../api/blogsAPI';

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await getAllBlogs(page);
                if (response.data.length === 0) {
                    setHasMore(false);
                } else {
                    setBlogs(prev => page === 1 ? response.data : [...prev, ...response.data]);
                }
            } catch (err) {
                setError('Failed to load blogs');
                console.error('Error fetching blogs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [page]);

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 pt-24 pb-12">
            <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Blog LensArt</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>

            {loading && (
                <div className="flex justify-center mt-8">
                    <LoadingSpinner />
                </div>
            )}

            {!loading && hasMore && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={loadMore}
                        className="px-6 py-2 bg-[#55d5d2] text-white rounded-lg hover:bg-[#4cc4c1] transition-colors"
                    >
                        Xem thêm
                    </button>
                </div>
            )}

            {!hasMore && blogs.length > 0 && (
                <p className="text-center mt-8 text-gray-500">
                    Đã hiển thị tất cả bài viết
                </p>
            )}
        </div>
    );
};

export default BlogsPage;
