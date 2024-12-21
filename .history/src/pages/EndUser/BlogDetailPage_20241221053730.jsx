import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../../api/blogsAPI';

const BlogDetailPage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(blogId);
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 rounded-full border-4 border-[#55d5d2] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">Error: {error}</div>;
  }

  if (!blog) {
    return <div className="text-center py-8">Blog not found</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{blog.title}</h1>
      <div className="text-gray-600 mb-4">
        Ngày đăng: {formatDate(blog.created_time)}
      </div>
      {blog.image_url && (
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
      )}
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
};

export default BlogDetailPage;
