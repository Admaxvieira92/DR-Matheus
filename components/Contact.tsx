
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
      setError('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou use o WhatsApp.');
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
    <section id="contato" className="py-24 bg-[#0a0a0a]">
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

            <div className="h-[350px] rounded-3xl overflow-hidden border border-white/5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.8570535306634!2d-48.9564619!3d-16.3312967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ea39665a50787%3A0x6374a49c25f54378!2sR.%20Quintino%20Bocai%C3%BAva%2C%20246%20-%20Setor%20Central%2C%20An%C3%A1polis%20-%20GO%2C%2075023-057!5e0!3m2!1sen!2sbr!4v1715000000000!5m2!1sen!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>
          </div>

          <div className="bg-[#111] p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
            {success && (
              <div className="absolute inset-0 bg-[#111]/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6 animate-fade-in">
                <CheckCircle2 size={64} className="text-green-500 mb-4 animate-bounce" />
                <h4 className="text-2xl font-bold text-white mb-2">Recebemos seu pedido!</h4>
                <p className="text-gray-400 max-w-xs">Em breve nossa equipe entrará em contato com você via WhatsApp.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-yellow-500 font-bold hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Nome Completo</label>
                  <input 
                    required
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-600 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">WhatsApp</label>
                  <input 
                    required
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-600 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">E-mail (Opcional)</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="exemplo@email.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-600 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Tratamento de Interesse</label>
                <select 
                  required
                  name="servico"
                  value={formData.servico}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-600 transition-colors appearance-none"
                >
                  <option value="" disabled>Selecione um serviço</option>
                  {serviceOptions.map(s => (
                    <option key={s.id} value={s.titulo}>{s.titulo}</option>
                  ))}
                  <option value="Outros">Outros / Avaliação Geral</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Como podemos ajudar?</label>
                <textarea 
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Descreva brevemente sua necessidade..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-600 transition-colors resize-none"
                ></textarea>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <button 
                disabled={loading}
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-yellow-600/10"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send size={18} />
                    SOLICITAR AGENDAMENTO AGORA
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
