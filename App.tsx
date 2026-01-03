
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import { supabase } from './supabaseClient';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdminView, setIsAdminView] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const checkHash = () => {
      setIsAdminView(window.location.hash === '#admin');
    };

    window.addEventListener('hashchange', checkHash);

    // Recupera sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('hashchange', checkHash);
      subscription.unsubscribe();
    };
  }, []);

  const handleAdminAccess = () => {
    window.location.hash = 'admin';
  };

  const closeAdmin = () => {
    window.location.hash = '';
    setIsAdminView(false);
  };

  // Renderização condicional simplificada para evitar falhas de ciclo de vida
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-yellow-600/30">
      {isAdminView ? (
        <div className="min-h-screen bg-[#050505]">
          {!user ? <Login onClose={closeAdmin} /> : <AdminPanel onClose={closeAdmin} />}
        </div>
      ) : (
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
          <Footer onAdminClick={handleAdminAccess} />
          
          {/* Botão Flutuante WhatsApp */}
          <a 
            href="https://wa.me/5564999369549" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[99] hover:scale-110 transition-transform active:scale-95"
            aria-label="Falar no WhatsApp"
          >
            <div className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
          </a>
        </div>
      )}

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
