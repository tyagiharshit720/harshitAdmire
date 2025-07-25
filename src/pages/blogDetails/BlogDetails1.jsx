// BlogDetails1.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';
import { Link } from 'react-router-dom';

const BlogDetails1 = () => {
  const navigate = useNavigate();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
 

  // Blog data - you could also get this from props or context
  const blogData = {
    title: "The Art of Crafting Your Perfect Vacation Package Without Overspending",
    url: window.location.href,
    description: "Creating your dream vacation shouldn't mean emptying your savings. With strategic planning and insider knowledge...",
    imageUrl: "https://admiredashboard.theholistay.in/blog_images/1743490383_67eb8d4f8aaa5GvpeDsEy.jpg",
    hashtags: "TravelTips,VacationHacks,BudgetTravel"
  };

  // Set meta tags dynamically
  useEffect(() => {
    document.title = blogData.title;
    
    const updateMetaTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateMetaTag('og:title', blogData.title);
    updateMetaTag('og:description', blogData.description);
    updateMetaTag('og:image', blogData.imageUrl);
    updateMetaTag('og:url', blogData.url);
    updateMetaTag('twitter:card', 'summary_large_image');
  }, [blogData]);

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blogData.title,
          text: blogData.description,
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
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodeURIComponent(blogData.description)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(blogData.description)}%0A%0ARead more: ${blogData.url}`;
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

  

  return (
    <div className="bg-gray-50">
      <NavBar/>
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/blog')}
            className="flex items-center text-yellow-600 hover:text-yellow-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to All Articles
          </button>
          
          <div className="relative">
            <button 
              onClick={handleNativeShare}
              className="flex items-center text-yellow-600 hover:text-yellow-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" clipRule="evenodd" />
              </svg>
              Share
            </button>

            {showShareDialog && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
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
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
              </div>
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

        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative w-full h-96">
            <img 
              alt="Family enjoying customized vacation package at beach resort" 
              className="w-full h-full object-cover" 
              src="https://admiredashboard.theholistay.in/blog_images/1743490383_67eb8d4f8aaa5GvpeDsEy.jpg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-32 flex items-end p-6">
              <span className="text-white text-sm bg-yellow-600 px-3 py-1 rounded-full">Travel Tips</span>
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-12">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>Published: June 15, 2023</span>
              <span className="mx-2">•</span>
              <span>8 min read</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Art of Crafting Your Perfect Vacation Package Without Overspending
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6 text-lg leading-relaxed">
                Creating your dream vacation shouldn't mean emptying your savings. With strategic planning and insider knowledge, you can design a personalized travel experience that fits both your desires and your budget. This guide will walk you through every step of building your ideal getaway while avoiding common financial pitfalls.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-r">
                <p className="font-semibold text-blue-700">Key Takeaway:</p>
                <p>The average traveler overspends by 22% on unnecessary package inclusions. By customizing strategically, you can redirect those funds toward experiences that truly matter to you.</p>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">Step 1: Define Your Travel Personality</h2>
              <p className="mb-4">Understanding your travel style is crucial for budget allocation:</p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="border p-4 rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-2">The Cultural Explorer</h3>
                  <p className="text-sm">Prioritize city locations, museum passes, and local guides</p>
                </div>
                <div className="border p-4 rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-2">The Relaxation Seeker</h3>
                  <p className="text-sm">Invest in premium accommodations and spa services</p>
                </div>
                <div className="border p-4 rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-2">The Adventure Enthusiast</h3>
                  <p className="text-sm">Allocate funds for equipment rentals and expert guides</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">Step 2: Master the Package Breakdown</h2>
              <p className="mb-4">Deconstruct pre-made packages to identify savings:</p>
              <ol className="list-decimal pl-6 mb-6 space-y-3">
                <li><strong>Flight Analysis:</strong> Compare package airfare with budget airlines</li>
                <li><strong>Hotel Assessment:</strong> Check if the included hotels match your preferred locations</li>
                <li><strong>Transfer Evaluation:</strong> Determine if shuttle services are necessary or if rideshares would be cheaper</li>
                <li><strong>Activity Audit:</strong> Remove prepaid tours you wouldn't choose independently</li>
              </ol>
              
              <div className="bg-yellow-50 p-4 rounded-lg mb-8 border border-yellow-200">
                <h3 className="font-bold text-yellow-800 mb-2">Case Study: Bali Vacation</h3>
                <p className="mb-2">Pre-packaged deal: $2,800 per person</p>
                <p className="mb-2">Customized version: $1,950 per person (30% savings)</p>
                <p className="text-sm">Achieved by booking flights separately, choosing a locally-owned villa, and selecting only desired activities.</p>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">Step 3: Timing is Everything</h2>
              <p className="mb-4">Strategic scheduling can dramatically affect costs:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Shoulder Seasons:</strong> Travel just before/after peak times for better rates and smaller crowds</li>
                <li><strong>Midweek Magic:</strong> Flying Tuesday-Thursday often saves 15-25% on airfare</li>
                <li><strong>Last-Minute Luxury:</strong> Some high-end resorts discount unsold rooms 7-14 days out</li>
                <li><strong>Advance Advantage:</strong> Book popular activities 3-6 months early to secure availability</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">Step 4: Accommodation Alternatives</h2>
              <p className="mb-4">Think beyond traditional hotels:</p>
              <table className="min-w-full divide-y divide-gray-200 mb-6">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Option</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best For</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Savings Potential</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3">Vacation Rentals</td>
                    <td className="px-4 py-3">Families, groups, long stays</td>
                    <td className="px-4 py-3">25-40%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Boutique B&Bs</td>
                    <td className="px-4 py-3">Couples, cultural experiences</td>
                    <td className="px-4 py-3">15-30%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Hostels (Private Rooms)</td>
                    <td className="px-4 py-3">Solo travelers, budget-conscious</td>
                    <td className="px-4 py-3">50-70%</td>
                  </tr>
                </tbody>
              </table>
              
              <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">Step 5: Dining Without Overspending</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Breakfast Strategies</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Book accommodations with kitchenettes</li>
                    <li>Visit local markets for fresh produce</li>
                    <li>Look for hotels offering free breakfast</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Dinner Savings</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Eat your main meal at lunch when prices are lower</li>
                    <li>Research restaurant week promotions</li>
                    <li>Take advantage of happy hour specials</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8 rounded-r">
                <p className="font-semibold text-green-700">Pro Tip:</p>
                <p>Many cities offer discount cards that include free public transportation plus museum/attraction discounts. These often pay for themselves in 2-3 uses.</p>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">Finalizing Your Custom Package</h2>
              <p className="mb-4">Before booking, ask yourself:</p>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Have I accounted for all time zones and jet lag recovery?</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>Are there any local holidays or events that might affect availability?</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Have I compared total costs including all taxes and fees?</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-purple-800">Ready to Design Your Dream Trip?</h3>
                <p className="mb-4">Our travel specialists can help you create a completely customized package that matches your unique travel style and budget.</p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition" >
                  Get Personalized Recommendations
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer/>
    </div>
  );
};

export default BlogDetails1;