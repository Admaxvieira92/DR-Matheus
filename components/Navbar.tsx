import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS, CONTACT_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-xl border-b border-yellow-900/30' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 bg-clip-text text-transparent">
              DR. MATHEUS FERNANDES
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm uppercase tracking-widest hover:text-yellow-500 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-600 hover:bg-yellow-700 text-black px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 transform hover:scale-105"
            >
              <Phone size={18} />
              AGENDAR AGORA
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-yellow-500">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-yellow-900/30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center py-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-4 text-lg font-medium hover:text-yellow-500 transition-colors"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-yellow-600 text-black px-8 py-3 rounded-full font-bold w-full text-center"
            >
              AGENDAR CONSULTA
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;