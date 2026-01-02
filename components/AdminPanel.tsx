
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  Users, 
  Image as ImageIcon, 
  LogOut, 
  Trash2, 
  Plus, 
  Edit3,
  Star,
  Stethoscope,
  X,
  AlertTriangle,
  Save,
  LayoutDashboard,
  ExternalLink,
  Phone,
  Calendar,
  Layers,
  Info,
  ChevronRight
} from 'lucide-react';

type Tab = 'servicos' | 'depoimentos' | 'galeria' | 'agendamentos';

const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('agendamentos');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // State for form fields mapping Supabase tables
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from(activeTab).select('*');
      
      if (activeTab === 'servicos' || activeTab === 'galeria') {
        query = query.order('ordem', { ascending: true });
      } else {
        query = query.order('created_at', { ascending: false });
      }
      
      const { data: result, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setData(result || []);
    } catch (err: any) {
      setError(`Erro ao carregar ${activeTab}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este registro permanentemente?')) return;
    try {
      const { error } = await supabase.from(activeTab).delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err: any) {
      alert('Erro ao excluir: ' + err.message);
    }
  };

  const handleOpenForm = (item: any = null) => {
    setEditingItem(item);
    if (item) {
      setFormData({ ...item });
    } else {
      // Initialize with empty fields based on tab
      if (activeTab === 'servicos') {
        setFormData({ titulo: '', descricao: '', icone: 'Sparkles', imagem_url: '', ordem: data.length });
      } else if (activeTab === 'galeria') {
        setFormData({ titulo: '', imagem_url: '', categoria: '', ordem: data.length });
      } else if (activeTab === 'depoimentos') {
        setFormData({ nome: '', texto: '', estrelas: 5 });
      }
    }
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        const { error } = await supabase.from(activeTab).update(formData).eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(activeTab).insert([formData]);
        if (error) throw error;
      }
      
      setShowForm(false);
      fetchData();
    } catch (err: any) {
      alert('Erro ao salvar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col shrink-0 shadow-2xl">
        <div className="p-10 border-b border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-yellow-600 rounded-full shadow-[0_0_10px_rgba(202,138,4,0.5)]"></div>
            <h1 className="text-sm font-bold tracking-[0.3em] text-white uppercase">Dentista CMS</h1>
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Painel Administrativo</p>
        </div>

        <nav className="flex-1 p-6 space-y-2 mt-4">
          <NavItem 
            active={activeTab === 'agendamentos'} 
            onClick={() => setActiveTab('agendamentos')} 
            icon={<Users size={20}/>} 
            label="Agendamentos" 
          />
          <NavItem 
            active={activeTab === 'servicos'} 
            onClick={() => setActiveTab('servicos')} 
            icon={<Stethoscope size={20}/>} 
            label="Serviços" 
          />
          <NavItem 
            active={activeTab === 'galeria'} 
            onClick={() => setActiveTab('galeria')} 
            icon={<ImageIcon size={20}/>} 
            label="Galeria" 
          />
          <NavItem 
            active={activeTab === 'depoimentos'} 
            onClick={() => setActiveTab('depoimentos')} 
            icon={<Star size={20}/>} 
            label="Depoimentos" 
          />
        </nav>

        <div className="p-6 border-t border-white/5 bg-[#080808]">
          <button onClick={onClose} className="w-full flex items-center gap-3 px-5 py-4 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all mb-2">
            <ExternalLink size={18} /> Ver Site Público
          </button>
          <button onClick={logout} className="w-full flex items-center gap-3 px-5 py-4 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-2xl transition-all">
            <LogOut size={18} /> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#050505]">
        <header className="h-24 bg-[#0a0a0a]/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-12 shrink-0">
          <div>
            <h2 className="text-2xl font-serif font-bold text-white capitalize">{activeTab}</h2>
            <p className="text-[10px] text-yellow-600 uppercase tracking-widest font-bold mt-1">Gestão de Conteúdo Digital</p>
          </div>

          {activeTab !== 'agendamentos' && (
            <button 
              onClick={() => handleOpenForm()}
              className="bg-yellow-600 hover:bg-yellow-700 text-black px-8 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-xl shadow-yellow-600/10"
            >
              <Plus size={18} /> Adicionar Novo
            </button>
          )}
        </header>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          {error && (
            <div className="mb-8 bg-red-500/10 border border-red-500/20 p-5 rounded-[2rem] flex items-center gap-4 text-red-400">
              <AlertTriangle size={24} />
              <span className="text-sm font-bold uppercase tracking-wider">{error}</span>
            </div>
          )}

          {loading && data.length === 0 ? (
            <div className="h-96 flex flex-col items-center justify-center gap-6">
              <div className="w-16 h-16 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 text-sm font-bold tracking-widest animate-pulse">Sincronizando com o Banco...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem] text-gray-700">
              <LayoutDashboard size={64} strokeWidth={1} className="mb-4 opacity-10" />
              <p className="text-lg font-serif">Esta seção está vazia.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {data.map((item) => (
                <div key={item.id} className="bg-[#0d0d0d] border border-white/5 p-8 rounded-[2.5rem] flex items-center gap-8 group hover:border-white/10 hover:bg-[#111] transition-all duration-500">
                  {/* Preview Image for certain tabs */}
                  {(activeTab === 'galeria' || activeTab === 'servicos') && item.imagem_url && (
                    <div className="w-24 h-24 rounded-3xl overflow-hidden border border-white/5 flex-shrink-0 bg-black">
                      <img src={item.imagem_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    {activeTab === 'agendamentos' ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <h4 className="text-white font-serif font-bold text-xl">{item.nome}</h4>
                          <span className="bg-yellow-600/10 text-yellow-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-yellow-600/20">{item.servico}</span>
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-medium">
                          <span className="flex items-center gap-2"><Phone size={14} className="text-yellow-600"/> {item.whatsapp}</span>
                          <span className="flex items-center gap-2"><Calendar size={14} className="text-yellow-600"/> {new Date(item.created_at).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="mt-4 bg-black/40 p-5 rounded-2xl border border-white/5 max-w-2xl">
                           <p className="text-gray-400 text-sm italic leading-relaxed">"{item.mensagem}"</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <h4 className="text-white font-serif font-bold text-xl">{item.titulo || item.nome}</h4>
                          {item.ordem !== undefined && (
                            <span className="text-[10px] bg-white/5 px-3 py-1 rounded-lg text-gray-500 font-bold uppercase">Ordem: {item.ordem}</span>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed max-w-2xl">{item.descricao || item.texto}</p>
                        {item.categoria && (
                          <span className="inline-block mt-2 px-3 py-1 bg-yellow-600/5 text-yellow-600 text-[10px] font-bold uppercase tracking-widest rounded border border-yellow-600/10">
                            {item.categoria}
                          </span>
                        )}
                        {item.estrelas && (
                          <div className="flex gap-1 mt-2">
                            {[...Array(item.estrelas)].map((_, i) => <Star key={i} size={12} className="fill-yellow-600 text-yellow-600" />)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {activeTab !== 'agendamentos' && (
                      <button 
                        onClick={() => handleOpenForm(item)} 
                        className="p-4 bg-white/5 hover:bg-yellow-600 text-gray-400 hover:text-black rounded-2xl transition-all shadow-lg"
                        title="Editar"
                      >
                        <Edit3 size={20} />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="p-4 bg-white/5 hover:bg-red-600 text-gray-400 hover:text-white rounded-2xl transition-all shadow-lg"
                      title="Excluir"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Form Modal Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-[120] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-8 animate-fade-in overflow-y-auto">
          <div className="w-full max-w-3xl bg-[#0d0d0d] border border-white/10 rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] my-auto">
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-[#111]/50">
              <div>
                <h3 className="text-2xl font-serif font-bold text-white">{editingItem ? 'Editando Dados' : 'Novo Registro'}</h3>
                <p className="text-[10px] text-yellow-600 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                   <Layers size={14} /> Seção: {activeTab}
                </p>
              </div>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white p-3 hover:bg-white/5 rounded-full transition-all">
                <X size={32} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-12 space-y-8">
              {activeTab === 'servicos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Título do Serviço</label>
                    <input 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-600 outline-none transition-all font-medium" 
                      value={formData.titulo || ''} 
                      onChange={e => setFormData({...formData, titulo: e.target.value})} 
                      required 
                      placeholder="Ex: Implantes Dentários" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Posição / Ordem</label>
                    <input 
                      type="number" 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-600 outline-none transition-all" 
                      value={formData.ordem || 0} 
                      onChange={e => setFormData({...formData, ordem: parseInt(e.target.value)})} 
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1 flex items-center gap-2">Ícone (Nome Lucide) <Info size={12}/></label>
                    <input 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-600 outline-none transition-all" 
                      value={formData.icone || ''} 
                      onChange={e => setFormData({...formData, icone: e.target.value})} 
                      placeholder="Ex: Sparkles, ShieldCheck, Smile..." 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">URL da Imagem</label>
                    <input 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-600 outline-none transition-all" 
                      value={formData.imagem_url || ''} 
                      onChange={e => setFormData({...formData, imagem_url: e.target.value})} 
                      placeholder="https://exemplo.com/imagem.jpg" 
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-3">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Descrição do Serviço</label>
                    <textarea 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white h-32 resize-none focus:border-yellow-600 outline-none transition-all font-medium" 
                      value={formData.descricao || ''} 
                      onChange={e => setFormData({...formData, descricao: e.target.value})} 
                      required 
                      placeholder="Explique o tratamento para o paciente..." 
                    />
                  </div>
                </div>
              )}

              {activeTab === 'galeria' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Título da Foto</label>
                    <input 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-600 outline-none transition-all" 
                      value={formData.titulo || ''} 
                      onChange={e => setFormData({...formData, titulo: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Categoria (Filtro)</label>
                    <input 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-600 outline-none transition-all" 
                      value={formData.categoria || ''} 
                      onChange={e => setFormData({...formData, categoria: e.target.value})} 
                      required 
                      placeholder="Ex: Estética, Implantes..." 
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-3">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Link da Imagem (URL)</label>
                    <input 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-600 outline-none transition-all" 
                      value={formData.imagem_url || ''} 
                      onChange={e => setFormData({...formData, imagem_url: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Ordem de Exibição</label>
                    <input 
                      type="number" 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-600 outline-none transition-all" 
                      value={formData.ordem || 0} 
                      onChange={e => setFormData({...formData, ordem: parseInt(e.target.value)})} 
                    />
                  </div>
                </div>
              )}

              {activeTab === 'depoimentos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Nome do Paciente</label>
                    <input 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-600 outline-none transition-all" 
                      value={formData.nome || ''} 
                      onChange={e => setFormData({...formData, nome: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Avaliação</label>
                    <select 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-600 outline-none appearance-none cursor-pointer" 
                      value={formData.estrelas || 5} 
                      onChange={e => setFormData({...formData, estrelas: parseInt(e.target.value)})}
                    >
                      <option value="5">5 Estrelas</option>
                      <option value="4">4 Estrelas</option>
                      <option value="3">3 Estrelas</option>
                    </select>
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-3">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Texto do Depoimento</label>
                    <textarea 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white h-40 resize-none focus:border-yellow-600 outline-none transition-all font-medium" 
                      value={formData.texto || ''} 
                      onChange={e => setFormData({...formData, texto: e.target.value})} 
                      required 
                    />
                  </div>
                </div>
              )}

              <div className="pt-8 flex justify-end gap-6 border-t border-white/5">
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)} 
                  className="px-10 py-4 text-xs font-bold text-gray-500 hover:text-white transition-colors tracking-widest"
                >
                  CANCELAR
                </button>
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="bg-yellow-600 hover:bg-yellow-700 text-black px-12 py-4 rounded-2xl font-bold text-xs flex items-center gap-3 transition-all shadow-2xl shadow-yellow-600/20 active:scale-95"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save size={18} />
                      SALVAR ALTERAÇÕES
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; border: 1px solid #222; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ca8a04; }
        
        @keyframes fade-in {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(24px); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all duration-500 group ${
      active 
        ? 'bg-yellow-600 text-black font-bold shadow-2xl shadow-yellow-600/20 translate-x-2' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <span className={`transition-transform duration-500 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
      {icon}
    </span>
    <span className="text-sm tracking-wide">{label}</span>
    {active && <ChevronRight size={16} className="ml-auto opacity-50" />}
  </button>
);

export default AdminPanel;
