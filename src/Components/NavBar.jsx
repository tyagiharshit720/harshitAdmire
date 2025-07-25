import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronUp, faChevronDown, faSignInAlt, faUserPlus, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import logo from "../assets/images/admire-logo.webp";
import PlanMyTripForm from "../forms/PlanMyTripForm";
 
function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [animateUnderline, setAnimateUnderline] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);

  const [showPlanTripForm, setShowPlanTripForm] = useState(false);
 
  const mobileMenuRef = useRef(null);
  const authDropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
 
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
 
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  useEffect(() => {
    setAnimateUnderline(false);
    const timeout = setTimeout(() => {
      setAnimateUnderline(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, [location.pathname]);
 
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (authDropdownRef.current && !authDropdownRef.current.contains(event.target)) {
        setAuthDropdownOpen(false);
      }
    };
 
    if (isOpen || authDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, authDropdownOpen]);
 
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
   
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
 
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };
 
  const searchSuggestions = [
    { id: 1, text: "Goa Beach Package", type: "destination", icon: "faMapMarkerAlt" },
    { id: 2, text: "Kashmir Honeymoon", type: "destination", icon: "faMapMarkerAlt" },
    { id: 3, text: "Kerala Backwaters", type: "destination", icon: "faMapMarkerAlt" },
    { id: 4, text: "Rajasthan Tour", type: "destination", icon: "faMapMarkerAlt" },
    { id: 5, text: "International Packages", type: "category", icon: "faGlobe" },
    { id: 6, text: "Domestic Tours", type: "category", icon: "faGlobe" },
    { id: 7, text: "Adventure Tours", type: "category", icon: "faGlobe" },
    { id: 8, text: "Family Packages", type: "category", icon: "faGlobe" },
  ];
 
  const links = [
    { to: "/", label: "Home" },
    { to: "/domestic", label: "Domestic" },
    { to: "/international", label: "International" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];
 
  return (
    <>
      {/* Top Bar with Search */}
      <div className="bg-blue-800 text-white text-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-2 lg:space-y-0 py-1">
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="tel:011-23261775" className="hover:text-orange-400 transition-colors">
                <i className="fas fa-phone-alt mr-1"></i> 1800-121-4252
              </a>
              <a href="mailto:info@admireholidays.com" className="hover:text-orange-400 transition-colors">
                <i className="fas fa-envelope mr-1"></i> info@admireholidays.com
              </a>
            </div>
 
            {/* Search Bar Component - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-md mx-4 order-last lg:order-none relative z-[60]">
              <SearchBar
                placeholder="Search destinations, packages..."
                onSearch={handleSearch}
                className="w-full"
                size="default"
                showSuggestions={true}
                suggestions={searchSuggestions}
              />
            </div>
 
            {/* Social Media Links */}
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="hover:text-orange-400 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-orange-400 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-orange-400 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-orange-400 transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
 
      {/* Main Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center z-50">
              <img
                src={logo}
                alt="Admire Holidays Logo"
                className="h-10"
              />
            </NavLink>
 
            {/* Mobile Search Bar - Only visible on mobile */}
            {isMobile && (
              <div className="md:hidden flex-1 mx-4 relative z-[45]">
                <SearchBar
                  placeholder="Search..."
                  onSearch={handleSearch}
                  className="w-full"
                  size="small"
                  showSuggestions={false}
                />
              </div>
            )}
 
            {/* Hamburger menu for mobile */}
            <button
              className="md:hidden focus:outline-none z-[60] relative p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 top-1 w-6 h-0.5 bg-gray-800 transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`absolute left-0 top-3 w-6 h-0.5 bg-gray-800 transform transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute left-0 top-5 w-6 h-0.5 bg-gray-800 transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
 
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <ul className="flex items-center space-x-6">
                {links.map(({ to, label }) => {
                  const isActive = location.pathname === to || (to === "/" && location.pathname === "/");
                  return (
                    <li key={to} className="relative">
                      <NavLink
                        to={to}
                        className={({ isActive }) =>
                          `relative px-3 py-2 font-medium text-gray-800 hover:text-blue-800 transition-colors ${
                            isActive ? "text-blue-800" : ""
                          }`
                        }
                        end={to === "/"}
                      >
                        {label}
                        <span
                          className={`absolute left-0 bottom-0 h-[2px] bg-[#da3939] origin-left transform transition-transform duration-[1000ms] ease-in-out`}
                          style={{
                            width: "100%",
                            transformOrigin: "left",
                            transform: isActive && animateUnderline ? "scaleX(1)" : "scaleX(0)",
                          }}
                        />
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
 
              {/* Enhanced Auth Dropdown */}
              <div className="relative ml-4" ref={authDropdownRef}>
                <button
                  onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-full transition-all duration-200 focus:outline-none border border-blue-100"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white">
                    <FontAwesomeIcon icon={faUser} className="text-sm" />
                  </div>
                  <span className="font-medium text-gray-800">Account</span>
                  <FontAwesomeIcon
                    icon={authDropdownOpen ? faChevronUp : faChevronDown}
                    className="text-gray-500 text-xs transition-transform"
                  />
                </button>
               
                {authDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-[55]">
                    <div className="px-4 py-3 border-b border-gray-100 bg-blue-50">
                      <p className="text-sm font-medium text-gray-600">Welcome to Admire</p>
                      <p className="text-xs text-gray-500">Sign in or create account</p>
                    </div>
                   
                    <NavLink
                      to="/signin"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                      onClick={() => setAuthDropdownOpen(false)}
                    >
                      <FontAwesomeIcon icon={faSignInAlt} className="mr-3 text-blue-600 w-5 text-center" />
                      <div>
                        <p className="font-medium">Sign In</p>
                        <p className="text-xs text-gray-500">Access your account</p>
                      </div>
                    </NavLink>
                   
                    {/* <NavLink
                      to="/signup"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors border-t border-gray-100"
                      onClick={() => setAuthDropdownOpen(false)}
                    >
                      <FontAwesomeIcon icon={faUserPlus} className="mr-3 text-green-600 w-5 text-center" />
                      <div>
                        <p className="font-medium">Sign Up</p>
                        <p className="text-xs text-gray-500">Create new account</p>
                      </div>
                    </NavLink> */}
                   
                    <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                      <NavLink
                        to="/my-profile"
                        className="flex items-center text-sm text-gray-600 hover:text-blue-800"
                        onClick={() => setAuthDropdownOpen(false)}
                      >
                        <FontAwesomeIcon icon={faSuitcase} className="mr-2" />
                        My Bookings
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
 
              <button
                onClick={() => setShowPlanTripForm(true)}
                className="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded transition-colors"
              >
                Get a Quote
              </button>
            </div>
          </div>
 
          {/* Mobile Navigation Overlay */}
          {isOpen && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[55]" onClick={() => setIsOpen(false)} />
          )}
 
          {/* Mobile Navigation */}
          <div
            ref={mobileMenuRef}
            className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <i className="fas fa-times text-gray-600 text-xl"></i>
                </button>
              </div>
 
              {/* Mobile Menu Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                  {links.map(({ to, label }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                            isActive
                              ? "bg-blue-800 text-white"
                              : "text-gray-700 hover:bg-blue-50 hover:text-blue-800"
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                        end={to === "/"}
                      >
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
 
                {/* Mobile Auth Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Account</h3>
                  <div className="space-y-2">
                    <NavLink
                      to="/signin"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <FontAwesomeIcon icon={faSignInAlt} className="mr-3 text-blue-600 w-5" />
                      <div>
                        <p className="font-medium">Sign In</p>
                        <p className="text-xs text-gray-500">Access your account</p>
                      </div>
                    </NavLink>
                   
                    {/* <NavLink
                      to="/signup"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <FontAwesomeIcon icon={faUserPlus} className="mr-3 text-green-600 w-5" />
                      <div>
                        <p className="font-medium">Sign Up</p>
                        <p className="text-xs text-gray-500">Create new account</p>
                      </div>
                    </NavLink> */}
                   
                    <NavLink
                      to="/my-profile"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <FontAwesomeIcon icon={faSuitcase} className="mr-3 text-gray-600 w-5" />
                      My Bookings
                    </NavLink>
                  </div>
                </div>
              </div>
 
              {/* Mobile Menu Footer */}
              <div className="p-4 border-t border-gray-200">
                <NavLink
                  to="/contact"
                  className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-3 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Get a Quote
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        {showPlanTripForm && <PlanMyTripForm onClose={() => setShowPlanTripForm(false)} />}
      </nav>
    </>
  );
}
 
export default NavBar;
 