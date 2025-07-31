import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';
import { BlogDetailsContext } from '../../context/blogContext.jsx';
import { getBlogDetailsPage } from "../../api/api.js";

const BlogDetails1 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);
  
  // Get blog details from context
  const { blogDetails } = useContext(BlogDetailsContext);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        
        // If we have context data for this blog, use that
        if (blogDetails && blogDetails.id === id) {
          setBlogData({
            ...blogDetails,
            url: window.location.href,
            hashtags: blogDetails.tags ? blogDetails.tags.join(',') : "Travel,Blog,Vacation"
          });
        } else {
          // Otherwise fetch from API
          const response = await getBlogDetailsPage(id);
          const blog = response.data;
          setBlogData({
            ...blog,
            url: window.location.href,
            hashtags: blog.tags ? blog.tags.join(',') : "Travel,Blog,Vacation",
            date: new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          });
        }
      } catch (error) {
        console.error("Error loading blog:", error);
        navigate('/blog', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id, blogDetails, navigate]);

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blogData.title,
          text: blogData.description || blogData.content.substring(0, 100),
          url: blogData.url,
        });
      } else {
        setShowShareDialog(true);
      }
    } catch (error) {
      console.log('Sharing cancelled', error);
    }
  };

  const shareTo = (platform) => {
    let shareUrl = '';
    const encodedUrl = encodeURIComponent(blogData.url);
    const encodedTitle = encodeURIComponent(blogData.title);
    const encodedHashtags = encodeURIComponent(blogData.hashtags);

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=${encodedHashtags}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodeURIComponent(blogData.description || '')}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(blogData.description || '')}%0A%0ARead more: ${blogData.url}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareDialog(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(blogData.url)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const calculateReadingTime = (content) => {
    if (!content) return '5 min read';
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    return `${Math.ceil(wordCount / wordsPerMinute)} min read`;
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <NavBar/>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
        <Footer/>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <NavBar/>
        <div className="text-center py-20">
          <p className="text-xl mb-4">Blog not found</p>
          <button 
            onClick={() => navigate('/blog')}
            className="mt-4 text-yellow-600 hover:text-yellow-700 transition font-medium"
          >
            ← Back to All Articles
          </button>
        </div>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <NavBar/>
      
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '95%' }}>
        <div className="flex justify-between items-center mb-8">
          <motion.button 
            onClick={() => navigate('/blog')}
            className="flex items-center text-yellow-600 hover:text-yellow-700 transition"
            whileHover={{ x: -2 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to All Articles
          </motion.button>
          
          <div className="relative">
            <motion.button 
              onClick={handleNativeShare}
              className="flex items-center text-yellow-600 hover:text-yellow-700 transition"
              whileHover={{ scale: 1.05 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" clipRule="evenodd" />
              </svg>
              Share
            </motion.button>

            {showShareDialog && (
              <motion.div 
                className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="py-1">
                  <button
                    onClick={() => shareTo('twitter')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <svg className="h-5 w-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    Twitter
                  </button>
                  <button
                    onClick={() => shareTo('facebook')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <svg className="h-5 w-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                    Facebook
                  </button>
                  <button
                    onClick={() => shareTo('linkedin')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <svg className="h-5 w-5 mr-2 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </button>
                  <button
                    onClick={() => shareTo('whatsapp')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </button>
                  <button
                    onClick={() => shareTo('email')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    {isCopied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Click outside to close share dialog */}
        {showShareDialog && (
          <div 
            className="fixed inset-0 z-0"
            onClick={() => setShowShareDialog(false)}
          />
        )}

        <motion.article 
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-full h-96">
            <img 
              alt={blogData.title} 
              className="w-full h-full object-cover" 
              src={blogData.image || "https://admiredashboard.theholistay.in/blog_images/1743490383_67eb8d4f8aaa5GvpeDsEy.jpg"}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-32 flex items-end p-6">
              {blogData.tags && blogData.tags.length > 0 && (
                <span className="text-white text-sm bg-yellow-600 px-3 py-1 rounded-full">
                  {blogData.tags[0]}
                </span>
              )}
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-12">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>Published: {blogData.date}</span>
              <span className="mx-2">•</span>
              <span>{calculateReadingTime(blogData.content)}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {blogData.title}
            </h1>
            
            <div 
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: blogData.content }} 
            />
          </div>
        </motion.article>
      </main>

      <Footer/>
    </div>
  );
};

export default BlogDetails1;