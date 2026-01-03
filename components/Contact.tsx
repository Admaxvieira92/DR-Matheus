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
          <h2 className="text-yellow-500 font-medium tracking-[0.2em] uppercase mb-2">Contato</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">Solicite um Agendamento</h3>
          <div className="w-24 h-1 bg-yellow-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="bg-[#111] p-8 rounded-3xl border border-white/5">
              <h4 className="text-2xl font-serif font-bold text-white mb-6">Informações da Clínica</h4>
              <div className="space-y-6">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;