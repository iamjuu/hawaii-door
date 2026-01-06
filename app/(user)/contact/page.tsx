"use client";
import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/Navbar";
import { useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function Contact() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const toggleFAQ = (index:any) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleInputChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const faqs = [
    {
      question: "What types of doors do you manufacture?",
      answer: "We specialize in custom interior and exterior doors, including solid wood doors, French doors, sliding doors, and specialty designs. Each door is crafted to your exact specifications."
    },
    {
      question: "How long does it take to complete a custom door order?",
      answer: "Typically, custom door orders take 4-6 weeks from design approval to delivery. Timeline may vary based on complexity and current order volume. Rush orders can be accommodated for an additional fee."
    },
    {
      question: "Do you offer installation services?",
      answer: "Yes, we provide professional installation services throughout Hawaii. Our experienced installers ensure perfect fit and finish. Installation can be scheduled after your door is ready."
    },
    {
      question: "What is your warranty policy?",
      answer: "We offer a 5-year warranty on all craftsmanship and materials. This covers manufacturing defects and structural issues. Normal wear and tear is not covered under warranty."
    },
    {
      question: "Can I get a quote before visiting your showroom?",
      answer: "Absolutely! Fill out our contact form with your project details, or call us directly. We can provide preliminary quotes over the phone or email, and schedule a consultation to finalize details."
    }
  ];

  return (
    <>
      {/* Contact Section */}
      <Navbar />
      <section className="bg-gray-50 py-12 lg:py-20 mt-17">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl md:text-4xl  font-roboto font-bold text-black mb-4 md:mb-6">
                  Let's Get Your Door Right
                </h1>
                <p className="text-md md:text-lg text-gray-700 mb-4">
                  Reach out for quotes, project coordination, or vendor inquiries. We review every message personally, no bots, no scripts, just people who know doors
                </p>

              </div>

              <button className="group relative mt-2 inline-flex items-center gap-2 md:gap-3 overflow-hidden rounded-3xl bg-[#FF6E4A] px-5 py-2 font-roboto text-xl text-white">

{/* WhatsApp-style black reveal */}
<span
  className="
    absolute inset-0
    bg-black
    origin-bottom
    scale-y-0
    transition-transform duration-900 ease-[cubic-bezier(0.4,0,0.2,1)]
    group-hover:scale-y-100
  "
/>

{/* Content */}
<span className="relative z-10 flex items-center gap-3 text-[15px] md:text-lg">
  Build Your Door Now

  {/* Arrow (your previous working animation) */}
  <span
    className="
      inline-flex items-center justify-center w-7 h-7
      transform
      transition-all duration-500 ease-in-out
      rotate-0 translate-x-1.5
      group-hover:rotate-45 group-hover:translate-x-0
    "
  >
    <MdOutlineArrowOutward className="text-white text-2xl" />
  </span>
</span>
</button>

              {/* Map and Visit Us */}
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold font-roboto text-gray-900">Visit Us</h2>
                
                {/* Google Map */}
                <div className="w-full h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.6!2d-157.9489!3d21.3099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDE4JzM1LjYiTiAxNTfCsDU2JzU2LjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold mb-1">Address</p>
                      <p className="text-gray-900 font-medium">99-1451 Koaha Pl</p>
                      <p className="text-gray-900 font-medium">Aiea, HI 96701</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold mb-1">Phone</p>
                      <a href="tel:+18087782351" className="text-gray-900 font-medium hover:text-orange-500">
                        +1 (808) 778-2351
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold mb-1">Email</p>
                      <a href="mailto:sales@hawaiidoors.com" className="text-gray-900 font-medium hover:text-orange-500">
                        sales@hawaiidoors.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold mb-1">Follow Us</p>
                      <a href="https://instagram.com/hawaiidoors808" target="_blank" rel="noopener noreferrer" className="text-gray-900 font-medium hover:text-orange-500">
                        @hawaiidoors808
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl h-min">
              <h2 className="text-md md:text-xl font-semibold md:font-bold text-gray-700 mb-2">
                Fill out the form below and we'll get back to you within 24 hours.
              </h2>
              
              <div className="space-y-6 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition placeholder-gray-400 text-black"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition placeholder-gray-400"
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="text-black w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition placeholder-gray-400"
                  />
                </div>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition placeholder-gray-400"
                />

                <textarea
                  name="message"
                  placeholder="Tell us about your project or inquiry..."
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className=" text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none placeholder-gray-400"
                ></textarea>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold py-4 rounded-lg transition-all text-lg"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl lg:text-4xl font-roboto font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-orange-500 flex-shrink-0 transition-transform ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}