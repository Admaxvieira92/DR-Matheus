import React from 'react';
import { CONTACT_INFO } from '../constants';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-[#111] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-yellow-600/20 rounded-full blur-[80px]" />
            <div className="relative border-4 border-yellow-600/30 rounded-3xl p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src={CONTACT_INFO.profileImage} 
                alt={CONTACT_INFO.name}
                className="w-full aspect-square object-cover rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-yellow-600 text-black p-6 rounded-2xl font-bold shadow-xl">
              <p className="text-3xl">Anápolis</p>
              <p className="text-xs uppercase tracking-widest opacity-80">Referência Local</p>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Sobre o Profissional – {CONTACT_INFO.name}
            </h3>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Dedicado a oferecer o que há de mais moderno na odontologia estética, o Dr. Matheus Fernandes une técnica apurada e um olhar artístico para proporcionar resultados que vão além de um sorriso bonito – buscamos a harmonia facial completa.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="text-yellow-500 font-bold text-2xl mb-2">+ de 1000</h4>
                <p className="text-gray-500 uppercase text-xs tracking-widest">Sorrisos Renovados</p>
              </div>
              <div>
                <h4 className="text-yellow-500 font-bold text-2xl mb-2">Ponta</h4>
                <p className="text-gray-500 uppercase text-xs tracking-widest">Tecnologia Digital</p>
              </div>
            </div>

            <a 
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-600 hover:bg-yellow-700 text-black px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105"
            >
              AGENDAR AVALIAÇÃO
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;