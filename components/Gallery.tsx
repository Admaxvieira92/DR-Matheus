import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Camera, RefreshCw } from 'lucide-react';

interface GalleryItem {
  id: string;
  titulo: string;
  imagem_url: string;
  categoria: string;
}

const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('galeria')
        .select('*')
        .order('ordem', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        setItems(data);
      } else {
        setItems([
          { id: '1', titulo: 'Reabilitação Oral', categoria: 'Estética', imagem_url: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800' },
          { id: '2', titulo: 'Lentes de Contato', categoria: 'Porcelana', imagem_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800' },
          { id: '3', titulo: 'Clareamento', categoria: 'Laser', imagem_url: 'https://sosorrisoodontologia.com.br/wp-content/uploads/2022/07/antes-e-depois-clareamento-dental-03-1024x1024.jpg' },
          { id: '4', titulo: 'Harmonização', categoria: 'Facial', imagem_url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800' },
          { id: '5', titulo: 'Implantes', categoria: 'Cirurgia', imagem_url: 'https://odontolove.com.br/wp-content/uploads/2023/02/implante-dentario-em-altamira-protese-dentaria-fixa.jpeg' },
          { id: '6', titulo: 'Estética', categoria: 'Geral', imagem_url: 'https://images.unsplash.com/photo-1445527815219-ecbfec67492e?auto=format&fit=crop&q=80&w=800' },
        ]);
      }
    } catch (err) {
      console.error('Erro ao buscar galeria:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <section id="galeria" className="py-24 bg-[#0a0a0a] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Portfólio de Resultados / A Arte de Transformar
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Cada sorriso é único. Explore nossa galeria de procedimentos realizados pelo Dr. Matheus Fernandes.
          </p>
          <div className="w-24 h-1 bg-yellow-600 mx-auto mt-8 rounded-full"></div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <RefreshCw className="text-yellow-600 animate-spin" size={40} />
            <p className="text-gray-500 animate-pulse">Carregando transformações...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#111] border border-white/5">
                <img 
                  src={item.imagem_url} 
                  alt={item.titulo}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
                   <div className="bg-yellow-600 w-10 h-1 mb-4 rounded-full"></div>
                   <span className="text-yellow-500 text-xs font-bold tracking-[0.2em] uppercase mb-2">
                     {item.categoria || 'Procedimento'}
                   </span>
                   <h4 className="text-white font-serif text-2xl mb-4">
                     {item.titulo}
                   </h4>
                   <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Camera size={14} className="text-yellow-600" />
                      <span>Caso Clínico Real</span>
                   </div>
                </div>

                <div className="absolute top-4 right-4 border border-yellow-600/30 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-1 h-1 bg-yellow-600 rounded-full animate-ping"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;