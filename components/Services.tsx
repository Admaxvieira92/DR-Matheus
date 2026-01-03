
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import * as LucideIcons from 'lucide-react';

interface DBService {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  imagem_url: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<DBService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('servicos')
          .select('*')
          .order('ordem', { ascending: true });

        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        console.error('Erro ao carregar serviços:', err);
        // Fallback para não quebrar a UI
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const IconComponent = ({ name }: { name: string }) => {
    try {
      const AllIcons = LucideIcons as any;
      if (!AllIcons) return <LucideIcons.Stethoscope className="w-6 h-6" />;
      
      const Icon = AllIcons[name] || AllIcons.Stethoscope;
      return <Icon className="w-6 h-6" />;
    } catch (e) {
      return <LucideIcons.Stethoscope className="w-6 h-6" />;
    }
  };

  return (
    <section id="servicos" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-yellow-500 font-medium tracking-[0.2em] uppercase mb-4">Tratamentos</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Serviços Exclusivos</h3>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Especialista em Implantes e Prótese Dentária. Reabilitação Oral e Estética com os seguintes tratamentos odontológicos:
          </p>
          <div className="w-24 h-1 bg-yellow-600 mx-auto mt-8 rounded-full"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length > 0 ? services.map((service) => (
              <div 
                key={service.id}
                className="group relative bg-[#111] border border-white/5 p-8 rounded-3xl overflow-hidden transition-all duration-300 hover:border-yellow-600/30 hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-yellow-600/10 text-yellow-500 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:bg-yellow-600 group-hover:text-black shrink-0">
                  <IconComponent name={service.icone} />
                </div>
                
                <div className="flex-grow">
                  <h4 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-yellow-500 transition-colors">
                    {service.titulo}
                  </h4>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {service.descricao}
                  </p>
                </div>

                {service.imagem_url && (
                  <div className="w-full h-40 rounded-2xl overflow-hidden opacity-30 group-hover:opacity-70 transition-opacity mt-auto">
                    <img 
                      src={service.imagem_url} 
                      alt={service.titulo} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            )) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                Nenhum serviço cadastrado no momento.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
