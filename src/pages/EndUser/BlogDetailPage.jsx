import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById } from '../../api/blogsAPI';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogDetailPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(blogId);
        setBlog(data);
        // Update page title
        if (data?.title) {
          document.title = `${data.title} | LensArt Blog`;
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  // Cleanup: Reset title when component unmounts
  useEffect(() => {
    return () => {
      document.title = 'LensArt';
    };
  }, []);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-[#55d5d2] border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-6 text-gray-600 font-medium">Đang tải bài viết...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <p className="text-red-500 text-lg font-medium mb-4">Lỗi: {error}</p>
          <button 
            onClick={() => navigate('/blogs')}
            className="px-6 py-3 bg-[#55d5d2] text-white rounded-lg hover:bg-[#3fb8b5] transition-colors"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <p className="text-gray-700 text-lg font-medium mb-4">Không tìm thấy bài viết</p>
          <button 
            onClick={() => navigate('/blogs')}
            className="px-6 py-3 bg-[#55d5d2] text-white rounded-lg hover:bg-[#3fb8b5] transition-colors"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Custom renderers for markdown components
  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');
      
      return !inline && match ? (
        <div className="relative group my-6">
          <div className="absolute right-2 top-2 z-10">
            <button
              onClick={() => copyToClipboard(codeString)}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Copy
            </button>
          </div>
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            className="rounded-lg shadow-lg"
            showLineNumbers={true}
            {...props}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-gray-100 text-[#55d5d2] px-2 py-1 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    },
    img({ node, ...props }) {
      return (
        <div className="my-8">
          <img
            {...props}
            className="rounded-xl shadow-2xl w-full hover:shadow-3xl transition-shadow duration-300 cursor-zoom-in"
            loading="lazy"
            alt={props.alt || 'Blog image'}
          />
          {props.alt && (
            <p className="text-center text-sm text-gray-500 mt-2 italic">{props.alt}</p>
          )}
        </div>
      );
    },
    a({ node, ...props }) {
      return (
        <a
          {...props}
          className="text-[#55d5d2] hover:text-[#3fb8b5] underline decoration-2 underline-offset-2 transition-colors font-medium"
          target={props.href?.startsWith('http') ? '_blank' : undefined}
          rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        />
      );
    },
    blockquote({ node, ...props }) {
      return (
        <blockquote
          {...props}
          className="border-l-4 border-[#55d5d2] bg-[#55d5d2]/5 pl-6 pr-4 py-4 my-6 italic text-gray-700 rounded-r-lg"
        />
      );
    },
    table({ node, ...props }) {
      return (
        <div className="overflow-x-auto my-8 rounded-lg border border-gray-200 shadow-md">
          <table {...props} className="min-w-full divide-y divide-gray-200" />
        </div>
      );
    },
    thead({ node, ...props }) {
      return <thead {...props} className="bg-gradient-to-r from-[#55d5d2] to-[#3fb8b5] text-white" />;
    },
    th({ node, ...props }) {
      return <th {...props} className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider" />;
    },
    td({ node, ...props }) {
      return <td {...props} className="px-6 py-4 text-sm text-gray-700 border-b border-gray-200" />;
    },
    h1({ node, ...props }) {
      return <h1 {...props} className="text-4xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b-2 border-gray-200" />;
    },
    h2({ node, ...props }) {
      return <h2 {...props} className="text-3xl font-bold text-gray-900 mt-10 mb-5 pb-2 border-b border-gray-200" />;
    },
    h3({ node, ...props }) {
      return <h3 {...props} className="text-2xl font-bold text-gray-900 mt-8 mb-4" />;
    },
    h4({ node, ...props }) {
      return <h4 {...props} className="text-xl font-bold text-gray-900 mt-6 mb-3" />;
    },
    ul({ node, ...props }) {
      return <ul {...props} className="space-y-2 my-6 ml-6" />;
    },
    ol({ node, ...props }) {
      return <ol {...props} className="space-y-2 my-6 ml-6" />;
    },
    li({ node, ...props }) {
      return <li {...props} className="text-gray-700 leading-relaxed" />;
    },
    p({ node, ...props }) {
      return <p {...props} className="text-gray-700 leading-relaxed my-4 text-lg" />;
    },
    hr({ node, ...props }) {
      return <hr {...props} className="my-8 border-t-2 border-gray-200" />;
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#55d5d2] to-[#3fb8b5] transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#55d5d2] to-[#3fb8b5] text-white py-8">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate('/blogs')}
            className="mb-4 flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Quay lại</span>
          </button>
        </div>
      </div>

      {/* Article Container */}
      <article className="container mx-auto px-4 -mt-8 mb-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Featured Image */}
          {blog.image_url && (
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b-2 border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-[#55d5d2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{formatDate(blog.created_time)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-[#55d5d2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{Math.ceil((blog.content?.length || 0) / 1000)} phút đọc</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-[#55d5d2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="font-medium">Kính mắt</span>
              </div>
            </div>

            {/* Description/Excerpt */}
            {blog.description && (
              <div className="mb-10 p-6 bg-gradient-to-r from-[#55d5d2]/10 to-[#3fb8b5]/10 border-l-4 border-[#55d5d2] rounded-r-lg">
                <p className="text-xl text-gray-700 italic leading-relaxed font-light">
                  {blog.description}
                </p>
              </div>
            )}

            {/* Markdown Content */}
            {blog.content ? (
              <div className="markdown-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={MarkdownComponents}
                >
                  {blog.content}
                </ReactMarkdown>
              </div>
            ) : (
              // Fallback to HTML content if no markdown
              blog.description && (
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                />
              )
            )}

            {/* Divider */}
            <div className="mt-12 mb-8">
              <div className="flex items-center">
                <div className="flex-1 border-t-2 border-gray-200"></div>
                <div className="px-4 text-gray-400">***</div>
                <div className="flex-1 border-t-2 border-gray-200"></div>
              </div>
            </div>

            {/* Tags Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Thẻ liên quan</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-[#55d5d2]/10 text-[#55d5d2] rounded-full text-sm font-medium hover:bg-[#55d5d2]/20 transition-colors cursor-pointer">
                  #KínhMắt
                </span>
                <span className="px-4 py-2 bg-[#55d5d2]/10 text-[#55d5d2] rounded-full text-sm font-medium hover:bg-[#55d5d2]/20 transition-colors cursor-pointer">
                  #LensArt
                </span>
                <span className="px-4 py-2 bg-[#55d5d2]/10 text-[#55d5d2] rounded-full text-sm font-medium hover:bg-[#55d5d2]/20 transition-colors cursor-pointer">
                  #ThờiTrang
                </span>
              </div>
            </div>

            {/* Share Section */}
            <div className="pt-8 border-t-2 border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Chia sẻ bài viết</h3>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog.title}`, '_blank')}
                  className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-md"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Đã sao chép link!');
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Link
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Back to Blog List Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/blogs')}
            className="px-8 py-4 bg-gradient-to-r from-[#55d5d2] to-[#3fb8b5] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Xem thêm bài viết khác
          </button>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;
