import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import "./index.css";
import Home from "./pages/Home";
import Domestic from "./pages/Domestic";
import About from "./pages/About";
import Blog from "./pages/Blog";
import International from "./pages/International";
import BlogDetails1 from "./pages/blogDetails/BlogDetails1";
import BlogDetails2 from "./pages/blogDetails/BlogDetails2";
import Contact from "./pages/Contact";
import DestinationDetail from "./Components/DestinationDetail";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import HomeStickyFormPage from "./pages/HomeStickyFormPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import UserAgreement from "./pages/UserAgreement";
import MyBooking from "./pages/MyBooking";
import PackageDetail from "./Components/packageCardDetails/PackageDetail";
import ExploreNow from "./pages/ExploreNow";
// import ResortDetail from "./Components/ResortDetail";
import ResortDetails from "./Components/ResortDetail";
import PlanMyTripForm from "./forms/PlanMyTripForm";
import LearnMore from "./pages/LearnMore";



function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorenow" element={<ExploreNow />} />
        <Route path="/learnmore" element={<LearnMore />} />


        <Route path="/domestic" element={<Domestic />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/how-to-customize-your-dream-vacation-package-without-overpaying" element={<BlogDetails1 />} />
        <Route path="/destination/:slug" element={
          <Navigate to={`/destinations/${useParams().slug}`} replace />
        } />
        <Route path="/blog/top-10-hidden-gems-to-visit-in-india" element={<BlogDetails2 />} />
        <Route path="/international" element={<International />} />
        <Route path="/destinations/:slug" element={<DestinationDetail />} />


         <Route path="/HomeStickyFormPage" element={<HomeStickyFormPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/user-agreement" element={<UserAgreement />} />


        <Route path="/destinations/:slug" element={<DestinationDetail />} />


        <Route path="/signin" element={<Login />} />

        <Route path="/signup" element={<Registration />} />
        <Route path="/my-profile/*" element={<MyBooking />} />


        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/destinations/:slug/packages/:packageId" element={<PackageDetail />} />

        <Route path="/resort-detail/:id" element={<ResortDetails />} />
        <Route path="/get-a-quote" element={<PlanMyTripForm />} />

        
        

      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;