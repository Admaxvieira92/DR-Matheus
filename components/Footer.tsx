
import React from 'react';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-16 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <span className="text-2xl font-serif font-bold text-yellow-500 block mb-2 tracking-tighter">DR. MATHEUS FERNANDES</span>
            <p className="text-gray-500 text-sm max-w-xs">Excelência em Odontologia Estética & Reabilitação Oral de Alta Performance.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#home" className="text-gray-400 hover:text-yellow-500 transition-colors text-xs uppercase tracking-widest font-bold">Início</a>
            <a href="#servicos" className="text-gray-400 hover:text-yellow-500 transition-colors text-xs uppercase tracking-widest font-bold">Serviços</a>
            <a href="#galeria" className="text-gray-400 hover:text-yellow-500 transition-colors text-xs uppercase tracking-widest font-bold">Galeria</a>
            <a href="#sobre" className="text-gray-400 hover:text-yellow-500 transition-colors text-xs uppercase tracking-widest font-bold">Sobre</a>
          </div>

          <div className="text-center md:text-right">
            <div className="flex flex-col md:items-end">
              <p className="text-gray-500 text-xs">
                © {new Date().getFullYear()} Dr. Matheus Fernandes.
              </p>
              <div className="flex items-center md:justify-end gap-2">
                <p className="text-gray-600 text-[10px] mt-1 uppercase tracking-widest">
                  CRO-GO: 12345
                </p>
                {/* Botão invisível para acesso admin */}
                <a 
                  href="#admin" 
                  className="text-[8px] text-white/5 hover:text-white/10 transition-colors"
                  aria-hidden="true"
                >
                  .
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decoration */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-900/10 rounded-full blur-[100px]" />
    </footer>
  );
};

export default Footer;
