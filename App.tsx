
import React, { useState, useEffect, Suspense } from 'react';
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

const ErrorFallback = () => (
  <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 text-center">
    <div className="max-w-md">
      <h1 className="text-2xl font-serif text-yellow-500 mb-4">Dr. Matheus Fernandes</h1>
      <p className="text-gray-400 mb-6">Ops! Tivemos um pequeno problema ao carregar a página.</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-yellow-600 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-700 transition-colors"
      >
        RECARREGAR PÁGINA
      </button>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdminView, setIsAdminView] = useState(window.location.hash === '#admin');
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const checkHash = () => {
      setIsAdminView(window.location.hash === '#admin');
    };

    window.addEventListener('hashchange', checkHash);

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (e) {
        console.error("Auth init error", e);
      } finally {
        setIsAuthChecking(false);
      }
    };

    initAuth();

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
        {!user && !isAuthChecking ? (
          <Login onClose={closeAdmin} />
        ) : (
          <AdminPanel onClose={closeAdmin} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-yellow-600/30 overflow-x-hidden">
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
  );
};

const App: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("Global error caught:", error);
      setHasError(true);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return <ErrorFallback />;
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <AppContent />
    </Suspense>
  );
};

export default App;