import React, { useState } from "react";
import Swal from "sweetalert2";
 
const PlanMyTripForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    fromDate: "",
    toDate: "",
    days: "",
    adults: "",
    kids: "",
    budget: "",
    purpose: "",
    consultant: false,
  });
 
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9+\-\s]{7,15}$/.test(phone);
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (!formData.name.trim()) {
      return Swal.fire("Oops!", "Please enter your name.", "error");
    }
    if (!validateEmail(formData.email.trim())) {
      return Swal.fire("Oops!", "Please enter a valid email address.", "error");
    }
    if (!validatePhone(formData.phone.trim())) {
      return Swal.fire("Oops!", "Please enter a valid phone number.", "error");
    }
    if (formData.days && (isNaN(formData.days) || Number(formData.days) < 1)) {
      return Swal.fire("Oops!", "Number of days must be a positive number.", "error");
    }
    if (formData.adults && (isNaN(formData.adults) || Number(formData.adults) < 0)) {
      return Swal.fire("Oops!", "Number of adults must be zero or more.", "error");
    }
    if (formData.kids && (isNaN(formData.kids) || Number(formData.kids) < 0)) {
      return Swal.fire("Oops!", "Number of kids must be zero or more.", "error");
    }
 
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Admire Holidays will contact you soon.",
        timer: 1800,
        showConfirmButton: false,
      }).then(() => onClose());
    }, 1500);
  };
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
 
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2"
      onClick={onClose}
      style={{ overflowY: "auto" }}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-2 sm:p-8 shadow-lg relative w-full max-w-[600px]"
        style={{ maxHeight: "85vh", overflowY: "auto", boxSizing: "border-box" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-teal-600 hover:text-red-600 text-2xl font-bold"
          aria-label="Close form"
        >
          &times;
        </button>
 
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-4 text-[#0D9488]">
          Plan My Trip
        </h2>
 
        {/* Row 1: Name, Email, Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InputField label="Name*" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" />
          <InputField label="Email*" name="email" value={formData.email} onChange={handleChange} type="email" required placeholder="Your Email" />
          <InputField label="Phone Number*" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone Number" />
        </div>
 
        {/* Row 2: From, To */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <InputField label="From (e.g., Delhi)" name="from" value={formData.from} onChange={handleChange} placeholder="From" />
          <InputField label="To (e.g., Manali)" name="to" value={formData.to} onChange={handleChange} placeholder="To" />
        </div>
 
        {/* Row 3: From Date, To Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <InputField label="From Date" name="fromDate" value={formData.fromDate} onChange={handleChange} type="date" />
          <InputField label="To Date" name="toDate" value={formData.toDate} onChange={handleChange} type="date" />
        </div>
 
        {/* Row 4: Days, Adults, Kids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <InputField label="Number of Days" name="days" value={formData.days} onChange={handleChange} type="number" placeholder="Days" min="1" />
          <InputField label="Adults" name="adults" value={formData.adults} onChange={handleChange} type="number" placeholder="Adults" min="0" />
          <InputField label="Kids" name="kids" value={formData.kids} onChange={handleChange} type="number" placeholder="Kids" min="0" />
        </div>
 
        {/* Row 5: Budget, Purpose */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <InputField label="Budget" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g., ₹20,000" />
          <InputField label="Purpose" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="Vacation, Honeymoon, etc." />
        </div>
 
        {/* Consultant Radio */}
        <div className="mt-3">
          <label className="block mb-2 gap-4 font-medium text-[#0D9488]">Do you need free consultant?</label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="consultant"
                value="yes"
                checked={formData.consultant === true}
                onChange={() => setFormData((prev) => ({ ...prev, consultant: true }))}
                className="form-radio text-[#0D9488]"
              />
              <span className="ml-2 text-gray-700 select-none">Yes</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="consultant"
                value="no"
                checked={formData.consultant === false}
                onChange={() => setFormData((prev) => ({ ...prev, consultant: false }))}
                className="form-radio text-[#0D9488]"
              />
              <span className="ml-2 text-gray-700 select-none">No</span>
            </label>
          </div>
        </div>
 
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg font-semibold text-white transition-colors mt-6"
          style={{
            backgroundColor: "#0D9488",
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) e.currentTarget.style.backgroundColor = "#0B7A74";
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) e.currentTarget.style.backgroundColor = "#0D9488";
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
 
export default PlanMyTripForm;
 
 
const InputField = ({ label, name, value, onChange, placeholder = "", type = "text", required = false, min }) => (
  <div>
    <label className="block mb-1 font-medium text-[#0D9488]">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      min={min}
      className="w-full border rounded px-4 py-3 text-sm focus:ring-2 focus:ring-[#0D9488] focus:outline-none"
      style={{ boxSizing: "border-box" }}
    />
  </div>
);
 