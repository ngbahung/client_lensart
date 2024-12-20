import React, { useState, useEffect } from 'react';
import BlogCard from '../../components/EndUser/BlogCard/BlogCard';
import BlogLoadingSkeleton from '../../components/EndUser/Blog/BlogLoadingSkeleton';
import { getActiveBlogs } from '../../api/blogsAPI';

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await getActiveBlogs();
                if (response.status === 200) {
                    const blogsData = response.data.map(blog => ({
                        id: blog.id,
                        title: blog.title,
                        image_url: blog.image_url,
                        created_time: blog.created_time
                    }));
                    setBlogs(blogsData);
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
    }, []);

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
            
            {loading ? (
                <BlogLoadingSkeleton />
            ) : (
                <>
                    {blogs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.map(blog => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center mt-8 text-gray-500">
                            Chưa có bài viết nào
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default BlogsPage;
