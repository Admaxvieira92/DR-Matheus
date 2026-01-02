
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  nome: string;
  texto: string;
  estrelas: number;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from('depoimentos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        // Fallback para não ficar vazio
        setTestimonials([
          { id: '1', nome: 'Mariana Silva', texto: 'O Dr. Matheus transformou não apenas meu sorriso, mas minha autoestima. O atendimento é impecável e a tecnologia da clínica impressiona.', estrelas: 5 },
          { id: '2', nome: 'Ricardo Gomes', texto: 'Melhor dentista de Anápolis. Fiz meus implantes e o processo foi super tranquilo e sem dor. Recomendo muito!', estrelas: 5 }
        ]);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-24 bg-[#0d0d0d] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-yellow-500 font-medium tracking-[0.2em] uppercase mb-4">Depoimentos</h3>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">O que dizem nossos pacientes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-[#111] border border-white/5 p-8 rounded-3xl relative">
              <Quote className="absolute top-6 right-8 text-yellow-600/20" size={40} />
              <div className="flex gap-1 mb-4">
                {[...Array(t.estrelas)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-6 leading-relaxed">"{t.texto}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center font-bold text-black uppercase">
                  {t.nome.charAt(0)}
                </div>
                <span className="text-white font-bold">{t.nome}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
