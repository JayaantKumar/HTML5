import { useState } from "react";
import emailjs from "@emailjs/browser";
import * as FM from "framer-motion"; // Fix for motion error

const { motion } = FM;

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    // Get keys from .env
    const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

    // Send the form data
    emailjs.sendForm(serviceId, templateId, e.target, publicKey)
      .then(() => {
        setStatus("success");
        e.target.reset(); // Clear form
      })
      .catch((error) => {
        console.error("Email Error:", error);
        setStatus("error");
      })
      .finally(() => {
        setLoading(false);
        // Clear status message after 5 seconds
        setTimeout(() => setStatus(null), 5000);
      });
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Left Side: Info */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-6">Let's Work Together</h1>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            I'm currently available for freelance work and open to full-time opportunities.
            If you have a project that needs some creative touch, let's chat.
          </p>
          
          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h3 className="text-cyan-400 font-bold text-sm uppercase">Email</h3>
              <p className="text-white">contact@gamedev.com</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h3 className="text-cyan-400 font-bold text-sm uppercase">Socials</h3>
              <div className="flex gap-4 mt-2 text-sm text-slate-300">
                <a href="#" className="hover:text-white underline">LinkedIn</a>
                <a href="#" className="hover:text-white underline">GitHub</a>
                <a href="#" className="hover:text-white underline">Twitter</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
          <form onSubmit={sendEmail} className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Your Name</label>
              <input 
                type="text" 
                name="user_name" // Must match EmailJS template variable
                required
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">Email Address</label>
              <input 
                type="email" 
                name="user_email" // Must match EmailJS template variable
                required
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-cyan-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Message</label>
              <textarea 
                name="message" // Must match EmailJS template variable
                required
                rows="4"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-cyan-500 outline-none transition"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg font-bold text-black transition transform active:scale-95 ${
                loading ? "bg-slate-500 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {/* Status Messages */}
            {status === "success" && (
              <div className="p-3 bg-green-500/20 text-green-400 text-center rounded-lg text-sm font-medium">
                ✅ Message sent! I'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="p-3 bg-red-500/20 text-red-400 text-center rounded-lg text-sm font-medium">
                ❌ Failed to send. Please try again later.
              </div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;