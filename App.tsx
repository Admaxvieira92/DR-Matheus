
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
  const [showLogin, setShowLogin] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  // Monitorar mudanças na URL (Hash routing)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Verificar no carregamento inicial

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAdminAccess = () => {
    window.location.hash = 'admin';
  };

  const closeAdmin = () => {
    window.location.hash = '';
    setIsAdminView(false);
  };

  // Se estiver na visão admin mas não tiver usuário, mostra login
  const renderContent = () => {
    if (isAdminView) {
      if (!user) {
        return <Login onClose={() => {
          if (!user) window.location.hash = '';
          setShowLogin(false);
        }} />;
      }
      return <AdminPanel onClose={closeAdmin} />;
    }

    return (
      <>
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Gallery />
          <Testimonials />
          <About />
          <Contact />
        </main>
        
        {user && !isAdminView && (
          <button 
            onClick={handleAdminAccess}
            className="fixed bottom-24 right-8 z-[90] bg-yellow-600 text-black px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 hover:scale-110 transition-all border border-black/20"
          >
            <div className="w-2 h-2 bg-black rounded-full animate-ping"></div>
            PAINEL DE CONTROLE
          </button>
        )}

        <Footer onAdminClick={handleAdminAccess} />
        
        <a 
          href="https://wa.me/5564999369549" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-[99] group flex items-center gap-3 transition-all duration-300"
          aria-label="Falar no WhatsApp"
        >
          <span className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-bold border border-yellow-600/30 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
            Agende sua Consulta
          </span>
          <div className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
        </a>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden selection:bg-yellow-600/30 selection:text-yellow-200">
      {renderContent()}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default App;
