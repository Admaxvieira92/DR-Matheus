import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { supabase } from '../supabaseClient';

interface ServiceOption {
  id: string;
  titulo: string;
}

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);

  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    servico: '',
    mensagem: ''
  });

  useEffect(() => {
    const fetchServiceOptions = async () => {
      const { data } = await supabase
        .from('servicos')
        .select('id, titulo')
        .order('ordem', { ascending: true });
      
      if (data) setServiceOptions(data);
    };
    fetchServiceOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: dbError } = await supabase
        .from('agendamentos')
        .insert([formData]);

      if (dbError) throw dbError;

      setSuccess(true);
      setFormData({
        nome: '',
        whatsapp: '',
        email: '',
        servico: '',
        mensagem: ''
      });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error('Erro ao enviar agendamento:', err);
      setError('Erro ao enviar mensagem. Use o WhatsApp para agilidade.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contato" className="py-24 bg-[#0a0a0a] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Contato / Solicite um Agendamento
          </h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="bg-[#111] p-8 rounded-3xl border border-white/5">
              <h4 className="text-2xl font-serif font-bold text-white mb-6">Informações da Clínica</h4>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-600/10 p-3 rounded-xl text-yellow-500 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold mb-1">Endereço</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{CONTACT_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-600/10 p-3 rounded-xl text-yellow-500 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold mb-1">WhatsApp</p>
                    <p className="text-gray-400 text-sm">{CONTACT_INFO.phone}</p>
                  </div>
                </div>
              </div>
              
              {/* Google Maps Embed - Utilizando URL padrão de incorporação para evitar problemas com API Key do Gemini */}
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                 <iframe 
                   title="Localização Dr. Matheus Fernandes"
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.3582485542176!2d-48.9559869!3d-16.3304565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ea47833a69327%3A0xc3f9872be9c88be2!2sR.%20Quintino%20Bocai%C3%BAva%2C%20246%20-%20Setor%20Central%2C%20An%C3%A1polis%20-%20GO%2C%2075023-057!5e0!3m2!1spt-BR!2sbr!4v1715800000000!5m2!1spt-BR!2sbr"
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen={true} 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   className="w-full h-full"
                 ></iframe>
              </div>
            </div>
          </div>

          <div className="bg-[#111] p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-5">
              <input 
                required
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-600 outline-none"
              />
              <input 
                required
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="WhatsApp"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-600 outline-none"
              />
              <button 
                disabled={loading}
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-4 rounded-xl transition-all"
              >
                {loading ? 'SOLICITANDO...' : 'SOLICITAR AGENDAMENTO'}
              </button>
            </form>
            
            {success && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-center flex items-center justify-center gap-2">
                <CheckCircle2 size={18} />
                Agendamento solicitado com sucesso!
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-center flex items-center justify-center gap-2 text-sm">
                <AlertCircle size={18} />
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;