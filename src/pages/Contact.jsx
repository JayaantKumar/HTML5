import { useState } from "react";
import emailjs from "@emailjs/browser";
import * as FM from "framer-motion"; 

const { motion } = FM;

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

    emailjs.sendForm(serviceId, templateId, e.target, publicKey)
      .then(() => {
        setStatus("success");
        e.target.reset(); 
      })
      .catch((error) => {
        console.error("Email Error:", error);
        setStatus("error");
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => setStatus(null), 5000);
      });
  };

  return (
    <div className="min-h-screen bg-[#FEFAE0] pt-10 pb-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl border border-secondary/20 grid md:grid-cols-2"
      >
        
        {/* Left Side: Info (Green Background) */}
        <div className="bg-contrast p-10 md:p-12 text-[#FEFAE0] flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
          
          <div>
            <h1 className="text-4xl font-black mb-6">Let's Talk</h1>
            <p className="opacity-90 text-lg leading-relaxed mb-8">
              Have a project in mind? Looking for a developer? 
              Fill out the form and I'll get back to you within 24 hours.
            </p>
          </div>

          <div className="space-y-6 z-10">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                ✉️
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase opacity-70">Email</h3>
                <p className="font-medium">contact@arcadehub.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                📍
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase opacity-70">Location</h3>
                <p className="font-medium">Remote / Worldwide</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form (White Background) */}
        <div className="p-10 md:p-12 bg-white">
          <form onSubmit={sendEmail} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-contrast mb-2">Name</label>
              <input 
                type="text" 
                name="user_name" 
                required
                className="w-full bg-[#FEFAE0]/50 border border-secondary/30 rounded-xl p-3 text-contrast focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-contrast mb-2">Email</label>
              <input 
                type="email" 
                name="user_email" 
                required
                className="w-full bg-[#FEFAE0]/50 border border-secondary/30 rounded-xl p-3 text-contrast focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-contrast mb-2">Message</label>
              <textarea 
                name="message" 
                required
                rows="4"
                className="w-full bg-[#FEFAE0]/50 border border-secondary/30 rounded-xl p-3 text-contrast focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 shadow-lg ${
                loading ? "bg-secondary cursor-not-allowed" : "bg-primary hover:bg-contrast shadow-primary/20"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <div className="p-3 bg-green-50 text-green-700 text-center rounded-lg text-sm font-bold border border-green-100">
                ✅ Message sent successfully!
              </div>
            )}
            {status === "error" && (
              <div className="p-3 bg-red-50 text-red-700 text-center rounded-lg text-sm font-bold border border-red-100">
                ❌ Something went wrong.
              </div>
            )}
          </form>
        </div>

      </motion.div>
    </div>
  );
};

export default Contact;