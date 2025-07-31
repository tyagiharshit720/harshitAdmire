import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogDetailsContext } from '../../context/blogContext.jsx';
import { getBlogDetails } from "../../api/api.js";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Get the context values
  const { setBlogDetails } = useContext(BlogDetailsContext);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getBlogDetails();
        console.log(response)
        
        const simplifiedBlogs = response.data.blogData.map(blog => ({
          id: blog._id,              
          title: blog.title,         
          content: blog.content,      
          image: blog.cover_image,    
          date: new Date(blog.createdAt).toLocaleDateString() 
        }));
        
        setBlogs(simplifiedBlogs);
      } catch (error) {
        console.error("Error loading blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle clicking on a blog card
  const handleBlogClick = (blog) => {
    // Update the context with the selected blog
    setBlogDetails(blog);
    // Navigate to the blog details page
    navigate(`/blog/${blog.id}`);
  };

  // Show loading spinner while data loads
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  // Show message if no blogs found
  if (blogs.length === 0) {
    return (
      <div className="text-center py-20">
        <p>No blogs found. Check back later!</p>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Our Latest Blogs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleBlogClick(blog)}
          >
            {/* Blog Image */}
            <img 
              src={blog.image} 
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            
            {/* Blog Content */}
            <div className="p-4">
              <p className="text-gray-500 text-sm mb-2">{blog.date}</p>
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-600 line-clamp-3">
                {blog.content.replace(/<[^>]*>/g, '')} {/* Remove HTML tags */}
              </p>
              <button 
                className="mt-4 text-yellow-600 font-medium"
                onClick={(e) => { e.stopPropagation();  handleBlogClick(blog);  }}
              >
                Read More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;