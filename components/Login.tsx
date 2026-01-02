
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Lock, Mail, ArrowRight, X } from 'lucide-react';

const Login: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciais inválidas. Tente novamente.');
    } else {
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111] border border-yellow-600/30 rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-yellow-600/10 text-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-yellow-600/20">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-2 uppercase tracking-widest">Área do Doutor</h2>
          <p className="text-gray-400 text-sm">Acesso restrito para gestão de conteúdo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                required
                type="email"
                className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-yellow-600 transition-colors"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                required
                type="password"
                className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-yellow-600 transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-400/10 p-3 rounded-lg border border-red-400/20 text-center font-bold">
              {error}
            </p>
          )}

          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-xl shadow-yellow-600/10"
          >
            {loading ? 'VERIFICANDO...' : (
              <>
                ENTRAR NO PAINEL
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">
            Sistema de Gestão Segura v2.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
