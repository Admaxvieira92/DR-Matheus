
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const closeAdmin = () => {
    window.location.hash = '';
    setIsAdminView(false);
  };

  if (isAdminView) {
    return (
      <div className="min-h-screen bg-[#050505] animate-fade-in">
        <AdminPanel onClose={closeAdmin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden selection:bg-yellow-600/30 selection:text-yellow-200">
      <div className="animate-fade-in">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Gallery />
          <Testimonials />
          <About />
          <Contact />
        </main>

        <Footer />
        
        {/* Floating WhatsApp Button - Enhanced for attention */}
        <div className="fixed bottom-8 right-8 z-[99] flex flex-col items-end gap-3">
          <a 
            href="https://wa.me/5564999369549" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center transition-all duration-300"
            aria-label="Falar no WhatsApp"
          >
            {/* Pulse Rings */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
            <span className="absolute inline-flex h-16 w-16 animate-pulse-slow rounded-full bg-[#25D366] opacity-40"></span>
            
            {/* Label that slides out */}
            <div className="absolute right-full mr-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 hidden md:block">
              <div className="bg-white text-black px-4 py-2 rounded-xl text-sm font-bold shadow-2xl border-b-2 border-yellow-600">
                Agende sua Consulta agora! 🚀
              </div>
            </div>

            {/* Main Icon Button */}
            <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.6)] hover:shadow-[0_0_40px_rgba(37,211,102,0.8)] hover:scale-110 transition-all duration-300 z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.3); opacity: 0.1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Float animation for the whole button group */
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .fixed.bottom-8.right-8 {
          animation: floating 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
