
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
      setError(`Erro ao carregar: ${err.message || JSON.stringify(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir?')) return;
    try {
      const { error } = await supabase.from(activeTab).delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err: any) {
      alert('Erro ao excluir: ' + (err.message || JSON.stringify(err)));
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
      // Sanitização: Remove campos protegidos que o Supabase não aceita em novos registros ou updates manuais de sistema
      const { id, created_at, ...payload } = formData;

      let result;
      if (editingItem) {
        result = await supabase.from(activeTab).update(payload).eq('id', editingItem.id);
      } else {
        result = await supabase.from(activeTab).insert([payload]);
      }
      
      if (result.error) throw result.error;
      
      setShowForm(false);
      fetchData();
    } catch (err: any) {
      // Evita o erro [object Object] convertendo o objeto de erro para string legível
      const errorMessage = err.message || err.details || (typeof err === 'object' ? JSON.stringify(err) : String(err));
      alert('Erro ao salvar: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex overflow-hidden text-white font-sans">
      <aside className="w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-10 border-b border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-yellow-600 rounded-full shadow-[0_0_10px_rgba(202,138,4,0.5)]"></div>
            <h1 className="text-sm font-bold tracking-[0.3em] uppercase">Admin Painel</h1>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 mt-4">
          <NavItem active={activeTab === 'agendamentos'} onClick={() => setActiveTab('agendamentos')} icon={<Users size={20}/>} label="Agendamentos" />
          <NavItem active={activeTab === 'servicos'} onClick={() => setActiveTab('servicos')} icon={<Stethoscope size={20}/>} label="Serviços" />
          <NavItem active={activeTab === 'galeria'} onClick={() => setActiveTab('galeria')} icon={<ImageIcon size={20}/>} label="Galeria" />
          <NavItem active={activeTab === 'depoimentos'} onClick={() => setActiveTab('depoimentos')} icon={<Star size={20}/>} label="Depoimentos" />
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={onClose} className="w-full flex items-center gap-3 px-5 py-4 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-2xl transition-all">
            <LogOut size={18} /> Sair do Sistema
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-[#050505]">
        <header className="h-24 bg-[#0a0a0a]/50 border-b border-white/5 flex items-center justify-between px-12">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-yellow-500">{activeTab}</h2>
          {activeTab !== 'agendamentos' && (
            <button onClick={() => handleOpenForm()} className="bg-yellow-600 hover:bg-yellow-700 text-black px-8 py-3 rounded-2xl font-bold text-xs uppercase shadow-xl">
              + Adicionar Novo
            </button>
          )}
        </header>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          {error && <div className="mb-8 bg-red-500/10 border border-red-500/20 p-5 rounded-2xl text-red-500 text-xs font-bold">{error}</div>}
          
          <div className="grid grid-cols-1 gap-6">
            {data.map((item) => (
              <div key={item.id} className="bg-[#0d0d0d] border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between group hover:border-yellow-600/30 transition-all">
                <div className="flex-1">
                  <h4 className="text-white font-bold text-xl mb-1">{item.titulo || item.nome}</h4>
                  <p className="text-gray-500 text-sm line-clamp-1">{item.descricao || item.texto || item.whatsapp}</p>
                </div>
                <div className="flex gap-3">
                  {activeTab !== 'agendamentos' && (
                    <button onClick={() => handleOpenForm(item)} className="p-4 bg-white/5 hover:bg-yellow-600 text-gray-400 hover:text-black rounded-2xl transition-all">
                      <Edit3 size={20} />
                    </button>
                  )}
                  <button onClick={() => handleDelete(item.id)} className="p-4 bg-white/5 hover:bg-red-600 text-gray-400 hover:text-white rounded-2xl transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showForm && (
        <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex items-center justify-center p-8 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-[3rem] p-10 shadow-2xl my-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white uppercase tracking-widest">{editingItem ? 'Editar' : 'Novo'} {activeTab}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white"><X size={32} /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {activeTab === 'servicos' && (
                <>
                  <input className="form-input" placeholder="Título" value={formData.titulo || ''} onChange={e => setFormData({...formData, titulo: e.target.value})} required />
                  <textarea className="form-input h-32" placeholder="Descrição" value={formData.descricao || ''} onChange={e => setFormData({...formData, descricao: e.target.value})} required />
                  <div className="grid grid-cols-2 gap-4">
                    <input className="form-input" placeholder="Ícone (Ex: Smile)" value={formData.icone || ''} onChange={e => setFormData({...formData, icone: e.target.value})} />
                    <input type="number" className="form-input" placeholder="Ordem" value={formData.ordem || 0} onChange={e => setFormData({...formData, ordem: parseInt(e.target.value)})} />
                  </div>
                  <input className="form-input" placeholder="URL da Imagem" value={formData.imagem_url || ''} onChange={e => setFormData({...formData, imagem_url: e.target.value})} />
                </>
              )}
              {activeTab === 'galeria' && (
                <>
                  <input className="form-input" placeholder="Título" value={formData.titulo || ''} onChange={e => setFormData({...formData, titulo: e.target.value})} required />
                  <input className="form-input" placeholder="Categoria" value={formData.categoria || ''} onChange={e => setFormData({...formData, categoria: e.target.value})} required />
                  <input className="form-input" placeholder="URL da Imagem" value={formData.imagem_url || ''} onChange={e => setFormData({...formData, imagem_url: e.target.value})} required />
                  <input type="number" className="form-input" placeholder="Ordem" value={formData.ordem || 0} onChange={e => setFormData({...formData, ordem: parseInt(e.target.value)})} />
                </>
              )}
              {activeTab === 'depoimentos' && (
                <>
                  <input className="form-input" placeholder="Nome" value={formData.nome || ''} onChange={e => setFormData({...formData, nome: e.target.value})} required />
                  <textarea className="form-input h-32" placeholder="Texto do depoimento" value={formData.texto || ''} onChange={e => setFormData({...formData, texto: e.target.value})} required />
                </>
              )}

              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Cancelar</button>
                <button type="submit" className="bg-yellow-600 text-black px-12 py-4 rounded-2xl font-bold text-xs uppercase flex items-center gap-2">
                  <Save size={18} /> Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        .form-input { 
          width: 100%; 
          background-color: #000; 
          border: 1px solid rgba(255,255,255,0.2); 
          border-radius: 1rem; 
          padding: 1rem 1.5rem; 
          color: #ffffff; 
          outline: none; 
          transition: border-color 0.2s; 
        }
        .form-input::placeholder {
          color: #666;
        }
        .form-input:focus { border-color: #ca8a04; }
      `}</style>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${active ? 'bg-yellow-600 text-black font-bold shadow-xl' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
    {icon} <span className="text-sm uppercase tracking-widest">{label}</span>
  </button>
);

export default AdminPanel;
