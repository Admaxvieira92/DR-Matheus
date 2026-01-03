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

    // Inicialização da sessão do Supabase
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

  if (isAdminView) {
    return (
      <div className="min-h-screen bg-[#050505]">
        {!user ? (
          <Login onClose={closeAdmin} />
        ) : (
          <AdminPanel onClose={closeAdmin} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-yellow-600/30">
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
      
      {/* Botão Flutuante WhatsApp com animação de destaque */}
      <a 
        href="https://wa.me/5564999369549" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[99] group flex items-center"
        aria-label="Falar no WhatsApp"
      >
        {/* Balão de Texto chamativo (visível em desktop) */}
        <div className="hidden md:block mr-4 bg-white text-black text-[10px] font-black uppercase tracking-tighter px-4 py-2 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none whitespace-nowrap border-2 border-[#25D366]">
          Agende sua Avaliação agora!
        </div>

        <div className="relative">
          {/* Efeito Ping para chamar atenção */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
          
          <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 transition-transform active:scale-95 border-2 border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
};

export default App;