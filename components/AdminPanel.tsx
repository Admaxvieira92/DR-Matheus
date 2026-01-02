
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
      setError(`Erro ao carregar dados de ${activeTab}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir este registro permanentemente?')) return;
    try {
      const { error: delError } = await supabase.from(activeTab).delete().eq('id', id);
      if (delError) throw delError;
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
        const { error: saveError } = await supabase.from(activeTab).update(formData).eq('id', editingItem.id);
        if (saveError) throw saveError;
      } else {
        const { error: saveError } = await supabase.from(activeTab).insert([formData]);
        if (saveError) throw saveError;
      }
      setShowForm(false);
      fetchData();
    } catch (err: any) {
      alert('Erro ao salvar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex overflow-hidden animate-fade-in">
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full shadow-[0_0_10px_rgba(202,138,4,0.5)]"></div>
            <h1 className="text-sm font-bold tracking-[0.2em] text-white uppercase">Painel CMS</h1>
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Matheus Fernandes</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-6">
          <NavItem active={activeTab === 'agendamentos'} onClick={() => setActiveTab('agendamentos')} icon={<Users size={18}/>} label="Agendamentos" />
          <NavItem active={activeTab === 'servicos'} onClick={() => setActiveTab('servicos')} icon={<Stethoscope size={18}/>} label="Serviços" />
          <NavItem active={activeTab === 'galeria'} onClick={() => setActiveTab('galeria')} icon={<ImageIcon size={18}/>} label="Galeria" />
          <NavItem active={activeTab === 'depoimentos'} onClick={() => setActiveTab('depoimentos')} icon={<Star size={18}/>} label="Depoimentos" />
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <button onClick={onClose} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <ExternalLink size={16} /> Ver Site
          </button>
          <button onClick={onClose} className="w-full mt-2 flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </aside>

      {/* Área de Conteúdo */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#050505]">
        <header className="h-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white capitalize">{activeTab}</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Gestão do Banco de Dados</p>
          </div>

          {activeTab !== 'agendamentos' && (
            <button 
              onClick={() => handleOpenForm()}
              className="bg-yellow-600 hover:bg-yellow-700 text-black px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg"
            >
              <Plus size={18} /> Novo Registro
            </button>
          )}
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400">
              <AlertTriangle size={20} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {loading && data.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 text-sm">Carregando...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2rem] text-gray-700">
              <LayoutDashboard size={48} className="mb-4 opacity-10" />
              <p>Nenhum registro encontrado nesta seção.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {data.map((item) => (
                <div key={item.id} className="bg-[#0d0d0d] border border-white/5 p-6 rounded-3xl flex items-center gap-6 group hover:border-white/10 transition-all">
                  {(activeTab === 'galeria' || activeTab === 'servicos') && item.imagem_url && (
                    <img src={item.imagem_url} className="w-16 h-16 object-cover rounded-xl border border-white/5" alt="" />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h4 className="text-white font-bold text-lg truncate">{item.titulo || item.nome}</h4>
                      {item.ordem !== undefined && <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-gray-500 font-bold">ORDEM: {item.ordem}</span>}
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-1">{item.descricao || item.texto || item.mensagem}</p>
                    {activeTab === 'agendamentos' && (
                      <div className="flex gap-4 mt-2 text-[10px] text-yellow-600 font-bold uppercase tracking-widest">
                        <span><Phone size={10} className="inline mr-1"/> {item.whatsapp}</span>
                        <span><Calendar size={10} className="inline mr-1"/> {new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {activeTab !== 'agendamentos' && (
                      <button onClick={() => handleOpenForm(item)} className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-all">
                        <Edit3 size={18} />
                      </button>
                    )}
                    <button onClick={() => handleDelete(item.id)} className="p-3 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal Formulário */}
      {showForm && (
        <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl my-auto">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#111]/50">
              <h3 className="text-xl font-bold text-white">{editingItem ? 'Editar' : 'Novo'} em {activeTab}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white p-2">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-10 space-y-6">
              {activeTab === 'servicos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-gray-500 tracking-widest">Título</label>
                    <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-600 outline-none" value={formData.titulo || ''} onChange={e => setFormData({...formData, titulo: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-gray-500 tracking-widest">Ícone (Nome Lucide)</label>
                    <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.icone || ''} onChange={e => setFormData({...formData, icone: e.target.value})} placeholder="Ex: Sparkles, Stethoscope" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs uppercase font-bold text-gray-500 tracking-widest">URL da Imagem</label>
                    <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.imagem_url || ''} onChange={e => setFormData({...formData, imagem_url: e.target.value})} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs uppercase font-bold text-gray-500 tracking-widest">Descrição</label>
                    <textarea className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white h-24 resize-none" value={formData.descricao || ''} onChange={e => setFormData({...formData, descricao: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-gray-500 tracking-widest">Ordem</label>
                    <input type="number" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.ordem || 0} onChange={e => setFormData({...formData, ordem: parseInt(e.target.value)})} />
                  </div>
                </div>
              )}

              {activeTab === 'galeria' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-gray-500 tracking-widest">Título</label>
                    <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.titulo || ''} onChange={e => setFormData({...formData, titulo: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-gray-500 tracking-widest">Categoria</label>
                    <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.categoria || ''} onChange={e => setFormData({...formData, categoria: e.target.value})} required placeholder="Ex: Estética, Implante" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs uppercase font-bold text-gray-500 tracking-widest">URL da Imagem</label>
                    <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.imagem_url || ''} onChange={e => setFormData({...formData, imagem_url: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-gray-500 tracking-widest">Ordem</label>
                    <input type="number" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.ordem || 0} onChange={e => setFormData({...formData, ordem: parseInt(e.target.value)})} />
                  </div>
                </div>
              )}

              {activeTab === 'depoimentos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-gray-500 tracking-widest">Nome do Paciente</label>
                    <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.nome || ''} onChange={e => setFormData({...formData, nome: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-gray-500 tracking-widest">Estrelas</label>
                    <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.estrelas || 5} onChange={e => setFormData({...formData, estrelas: parseInt(e.target.value)})}>
                      <option value="5">5 Estrelas</option>
                      <option value="4">4 Estrelas</option>
                      <option value="3">3 Estrelas</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs uppercase font-bold text-gray-500 tracking-widest">Texto</label>
                    <textarea className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white h-32 resize-none" value={formData.texto || ''} onChange={e => setFormData({...formData, texto: e.target.value})} required />
                  </div>
                </div>
              )}

              <div className="pt-8 flex justify-end gap-4 border-t border-white/5">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 text-xs font-bold text-gray-500 hover:text-white transition-colors">CANCELAR</button>
                <button type="submit" className="bg-yellow-600 hover:bg-yellow-700 text-black px-8 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all">
                  <Save size={16} /> SALVAR ALTERAÇÕES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ca8a04; }
      `}</style>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 ${active ? 'bg-yellow-600 text-black font-bold shadow-lg shadow-yellow-600/20 translate-x-1' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
    {icon} <span className="text-sm">{label}</span>
    {active && <ChevronRight size={14} className="ml-auto opacity-50" />}
  </button>
);

export default AdminPanel;
