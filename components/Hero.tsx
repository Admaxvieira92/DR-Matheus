import React from 'react';
import { CONTACT_INFO } from '../constants';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const handleInternalLink = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="topo" className="relative h-screen min-h-[700px] flex items-center overflow-hidden scroll-mt-24">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      
      {/* Background Image */}
      <img 
        src="https://lh3.googleusercontent.com/p/AF1QipN-FG14IJ-lw83cr7fgjNK3IVL6GImHFDsG88G4=s680-w680-h510-rw" 
        alt="Clínica Dr. Matheus Fernandes" 
        className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 transition-transform duration-[20000ms] hover:scale-100"
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <h2 className="text-yellow-500 font-medium tracking-[0.3em] uppercase mb-4 animate-fade-in">
            Especialista em Reabilitação Oral
          </h2>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Arte em <br />
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 bg-clip-text text-transparent">
              transformar sorrisos
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
            Combinando tecnologia avançada e sensibilidade estética para transformar vidas através de um sorriso impecável e saudável.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#tratamentos"
              onClick={(e) => handleInternalLink(e, 'tratamentos')}
              className="group bg-yellow-600 hover:bg-yellow-700 text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-yellow-600/20"
            >
              NOSSOS SERVIÇOS
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-yellow-600/50 hover:border-yellow-600 text-yellow-500 px-8 py-4 rounded-full font-bold text-center transition-all hover:bg-yellow-600/10"
            >
              FALAR NO WHATSAPP
            </a>
          </div>
        </div>
      </div>

      {/* Vertical text or accent */}
      <div className="absolute right-10 bottom-10 hidden lg:block z-20">
        <p className="text-yellow-600/30 font-serif text-8xl rotate-90 origin-right select-none pointer-events-none">
          ODONTOLOGIA
        </p>
      </div>
    </section>
  );
};

export default Hero;