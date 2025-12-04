
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Megaphone, 
  Plus, 
  BarChart3, 
  Calendar, 
  MousePointer, 
  Eye, 
  ShoppingBag, 
  PauseCircle, 
  PlayCircle, 
  Image as ImageIcon,
  CheckCircle2,
  TrendingUp,
  Target,
  Layout
} from 'lucide-react';

interface StoreAdsModuleProps {
  onBack: () => void;
}

type ViewState = 'list' | 'create' | 'details';
type AdType = 'local' | 'premium';

interface Campaign {
  id: string;
  name: string;
  type: AdType;
  position: string;
  status: 'active' | 'paused' | 'ended';
  startDate: string;
  endDate: string;
  budget: number;
  metrics: {
    impressions: number;
    clicks: number;
    ctr: number;
    orders: number;
    cpa: number;
  };
  history: number[]; // Mock daily clicks
}

// Mock Data
const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'Promoção Fim de Semana',
    type: 'premium',
    position: 'Home (Topo)',
    status: 'active',
    startDate: '10/11/2023',
    endDate: '17/11/2023',
    budget: 58.50,
    metrics: { impressions: 12500, clicks: 450, ctr: 3.6, orders: 42, cpa: 1.39 },
    history: [45, 60, 55, 80, 70, 90, 50]
  },
  {
    id: '2',
    name: 'Oferta de Almoço',
    type: 'local',
    position: 'Categoria Alimentação',
    status: 'paused',
    startDate: '01/11/2023',
    endDate: '30/11/2023',
    budget: 57.00,
    metrics: { impressions: 5600, clicks: 120, ctr: 2.1, orders: 8, cpa: 7.12 },
    history: [10, 15, 12, 18, 20, 15, 30]
  },
  {
    id: '3',
    name: 'Dia dos Pais',
    type: 'premium',
    position: 'Busca',
    status: 'ended',
    startDate: '01/08/2023',
    endDate: '15/08/2023',
    budget: 120.00,
    metrics: { impressions: 25000, clicks: 900, ctr: 3.6, orders: 95, cpa: 1.26 },
    history: [0,0,0,0,0,0,0]
  }
];

export const StoreAdsModule: React.FC<StoreAdsModuleProps> = ({ onBack }) => {
  const [view, setView] = useState<ViewState>('list');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  
  // Creation Form State
  const [createStep, setCreateStep] = useState(1);
  const [newCampaignType, setNewCampaignType] = useState<AdType>('local');
  const [duration, setDuration] = useState(7);
  const [position, setPosition] = useState('Categoria');

  const getPricePerDay = (type: AdType) => type === 'local' ? 1.90 : 3.90;
  const totalCost = getPricePerDay(newCampaignType) * duration;

  const handleCreateClick = () => {
    setCreateStep(1);
    setView('create');
  };

  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setView('details');
  };

  const renderStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 border-green-200',
      paused: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      ended: 'bg-gray-100 text-gray-600 border-gray-200'
    };
    const labels = { active: 'Ativa', paused: 'Pausada', ended: 'Encerrada' };
    
    return (
      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  // --- VIEWS ---

  const ListView = () => (
    <div className="p-5 pb-20">
      <div className="bg-purple-600 rounded-3xl p-6 text-white mb-6 shadow-lg shadow-purple-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <h2 className="text-2xl font-bold mb-2 relative z-10">Alcance mais clientes</h2>
        <p className="text-purple-100 text-sm mb-6 max-w-[240px] relative z-10">
          Crie anúncios destacados e apareça no topo das buscas da Freguesia.
        </p>
        <button 
          onClick={handleCreateClick}
          className="w-full bg-white text-purple-700 font-bold py-3 rounded-xl shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-transform relative z-10"
        >
          <Plus className="w-5 h-5" />
          Criar nova campanha
        </button>
      </div>

      <h3 className="font-bold text-gray-900 dark:text-white mb-4 px-1">Minhas Campanhas</h3>
      
      <div className="space-y-4">
        {MOCK_CAMPAIGNS.map((campaign) => (
          <div 
            key={campaign.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{campaign.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{campaign.position}</p>
              </div>
              {renderStatusBadge(campaign.status)}
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-700/30 p-2 rounded-lg">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{campaign.startDate} - {campaign.endDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>{campaign.type === 'local' ? 'ADS Local' : 'ADS Premium'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Investimento</p>
                <p className="font-bold text-gray-900 dark:text-white">R$ {campaign.budget.toFixed(2).replace('.', ',')}</p>
              </div>
              <button 
                onClick={() => handleCampaignClick(campaign)}
                className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-bold hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
              >
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CreateView = () => (
    <div className="p-5 pb-24">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8 px-2">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              createStep >= step ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              {step}
            </div>
            <span className="text-[10px] font-medium text-gray-500">
              {step === 1 ? 'Plano' : step === 2 ? 'Config' : 'Revisão'}
            </span>
          </div>
        ))}
      </div>

      {createStep === 1 && (
        <div className="space-y-4 animate-in slide-in-from-right duration-300">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Escolha o tipo de destaque</h3>
          
          <button 
            onClick={() => setNewCampaignType('local')}
            className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
              newCampaignType === 'local' 
                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20' 
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-gray-900 dark:text-white text-lg">ADS Local</span>
              <span className="text-purple-600 font-bold bg-white dark:bg-gray-900 px-2 py-1 rounded-md text-xs border border-purple-200 dark:border-purple-800">
                R$ 1,90/dia
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Ideal para manter sua marca visível. Exibição na listagem da categoria e em buscas relacionadas.
            </p>
          </button>

          <button 
            onClick={() => setNewCampaignType('premium')}
            className={`w-full p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
              newCampaignType === 'premium' 
                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20' 
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
          >
            {newCampaignType === 'premium' && (
              <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                RECOMENDADO
              </div>
            )}
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-gray-900 dark:text-white text-lg">ADS Premium</span>
              <span className="text-purple-600 font-bold bg-white dark:bg-gray-900 px-2 py-1 rounded-md text-xs border border-purple-200 dark:border-purple-800">
                R$ 3,90/dia
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Máxima visibilidade. Destaque no topo da Home, banner rotativo e prioridade máxima nas buscas.
            </p>
          </button>
        </div>
      )}

      {createStep === 2 && (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Onde exibir?</label>
            <div className="grid grid-cols-2 gap-3">
              {['Home (Destaque)', 'Categoria', 'Busca', 'Notificações'].map(pos => (
                <button 
                  key={pos}
                  onClick={() => setPosition(pos)}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    position === pos 
                      ? 'bg-purple-600 text-white border-purple-600' 
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Duração</label>
            <div className="flex gap-3">
              {[7, 15, 30].map(days => (
                <button 
                  key={days}
                  onClick={() => setDuration(days)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${
                    duration === days 
                      ? 'bg-purple-600 text-white border-purple-600' 
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {days} dias
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Criativo (Imagem)</label>
            <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-xs text-gray-500 font-medium">Toque para enviar imagem</p>
              <p className="text-[10px] text-gray-400 mt-1">Recomendado: 800x400px</p>
            </div>
          </div>
        </div>
      )}

      {createStep === 3 && (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Quase lá!</h3>
            <p className="text-sm text-gray-500 mb-6">Revise sua campanha antes de ativar.</p>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-left space-y-3 shadow-sm">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tipo</span>
                <span className="font-bold text-gray-900 dark:text-white">{newCampaignType === 'local' ? 'ADS Local' : 'Premium'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Duração</span>
                <span className="font-bold text-gray-900 dark:text-white">{duration} dias</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Posição</span>
                <span className="font-bold text-gray-900 dark:text-white">{position}</span>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 my-2"></div>
              <div className="flex justify-between text-base">
                <span className="font-bold text-gray-900 dark:text-white">Total</span>
                <span className="font-bold text-purple-600">R$ {totalCost.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wizard Footer Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-20 flex gap-3 max-w-md mx-auto">
        {createStep > 1 && (
          <button 
            onClick={() => setCreateStep(prev => prev - 1)}
            className="flex-1 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold"
          >
            Voltar
          </button>
        )}
        <button 
          onClick={() => {
            if (createStep < 3) setCreateStep(prev => prev + 1);
            else setView('list');
          }}
          className="flex-[2] bg-purple-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all"
        >
          {createStep === 3 ? 'Confirmar e Ativar' : 'Próximo'}
        </button>
      </div>
    </div>
  );

  const DetailsView = () => {
    if (!selectedCampaign) return null;
    const { metrics, history } = selectedCampaign;
    const maxVal = Math.max(...history);

    return (
      <div className="p-5 pb-24 animate-in slide-in-from-right duration-300">
        
        {/* Summary Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{selectedCampaign.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                {renderStatusBadge(selectedCampaign.status)}
                <span className="text-xs text-gray-400">• {selectedCampaign.type === 'premium' ? 'ADS Premium' : 'ADS Local'}</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-purple-600 transition-colors">
              {selectedCampaign.status === 'active' 
                ? <PauseCircle className="w-8 h-8" /> 
                : <PlayCircle className="w-8 h-8" />
              }
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Orçamento</p>
              <p className="font-bold text-gray-900 dark:text-white">R$ {selectedCampaign.budget.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Período</p>
              <p className="font-bold text-gray-900 dark:text-white text-xs">{selectedCampaign.startDate} - {selectedCampaign.endDate}</p>
            </div>
          </div>
        </div>

        {/* Funnel Metrics */}
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 px-1">Desempenho</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2 text-purple-600">
              <Eye className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Impressões</span>
            </div>
            <p className="text-xl font-black text-gray-900 dark:text-white">{metrics.impressions.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2 text-blue-500">
              <MousePointer className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Cliques</span>
            </div>
            <p className="text-xl font-black text-gray-900 dark:text-white">{metrics.clicks}</p>
            <p className="text-[10px] text-gray-400 mt-1">CTR {metrics.ctr}%</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2 text-green-600">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Pedidos</span>
            </div>
            <p className="text-xl font-black text-gray-900 dark:text-white">{metrics.orders}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2 text-orange-500">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">CPA Médio</span>
            </div>
            <p className="text-xl font-black text-gray-900 dark:text-white">R$ {metrics.cpa.toFixed(2)}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 mb-6">
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-4">Evolução de Cliques (7 dias)</h4>
          <div className="flex items-end justify-between h-32 gap-2">
            {history.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 group">
                <div 
                  className="w-full bg-purple-100 dark:bg-purple-900/30 rounded-t-md relative overflow-hidden transition-all duration-500 group-hover:bg-purple-200 dark:group-hover:bg-purple-800"
                  style={{ height: `${(val / maxVal) * 100}%`, minHeight: '4px' }}
                >
                  <div className="absolute bottom-0 left-0 right-0 top-0 bg-purple-500 opacity-80 rounded-t-md"></div>
                </div>
                <span className="text-[9px] text-gray-400 font-bold">{['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white font-bold rounded-2xl shadow-sm">
          Editar Criativo
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-5 h-16 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={view === 'list' ? onBack : () => setView('list')} 
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="font-bold text-lg text-gray-900 dark:text-white">
          {view === 'list' ? 'Anúncios e Destaques' : view === 'create' ? 'Nova Campanha' : 'Detalhes'}
        </h1>
      </div>

      {view === 'list' && <ListView />}
      {view === 'create' && <CreateView />}
      {view === 'details' && <DetailsView />}

    </div>
  );
};
