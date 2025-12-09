
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Megaphone, 
  Plus, 
  Calendar, 
  MousePointer, 
  Eye, 
  ShoppingBag, 
  PauseCircle, 
  PlayCircle, 
  CheckCircle2,
  TrendingUp,
  Target,
  Rocket,
  Wallet,
  QrCode
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
    status: 'paused',
    startDate: '01/11/2023',
    endDate: '30/11/2023',
    budget: 57.00,
    metrics: { impressions: 5600, clicks: 120, ctr: 2.1, orders: 8, cpa: 7.12 },
    history: [10, 15, 12, 18, 20, 15, 30]
  }
];

// Mock Store Balance
const STORE_BALANCE = 45.00; 

export const StoreAdsModule: React.FC<StoreAdsModuleProps> = ({ onBack }) => {
  const [view, setView] = useState<ViewState>('list');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  
  // Creation Form State
  const [createStep, setCreateStep] = useState(1);
  const [newCampaignType, setNewCampaignType] = useState<AdType>('local');
  
  // New Fields
  const [campaignName, setCampaignName] = useState('');
  const [campaignDesc, setCampaignDesc] = useState('');
  const [duration, setDuration] = useState(7); // Slider value 7-180

  const getPricePerDay = (type: AdType) => type === 'local' ? 1.90 : 3.90;
  const totalCost = getPricePerDay(newCampaignType) * duration;
  const hasSufficientBalance = STORE_BALANCE >= totalCost;

  const handleCreateClick = () => {
    setCreateStep(1);
    setCampaignName('');
    setCampaignDesc('');
    setDuration(7);
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
    <div className="p-5 pb-32">
      <div className="bg-gradient-to-br from-purple-700 to-indigo-800 rounded-3xl p-6 text-white mb-8 shadow-xl shadow-purple-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                <Rocket className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            </div>
            <h2 className="text-xl font-bold mb-2 font-display">Apareça para quem quer comprar</h2>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
              Lojas que anunciam recebem até <strong>3x mais visitas</strong>. Seus anúncios aparecem no topo das listas, na busca e em áreas de destaque do app.
            </p>
            <button 
              onClick={handleCreateClick}
              className="w-full bg-white text-purple-700 font-bold py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Megaphone className="w-4 h-4" />
              Criar campanha a partir de R$ 1,90/dia
            </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-bold text-gray-900 dark:text-white">Minhas Campanhas</h3>
        <span className="text-xs text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded-md">
            Saldo: R$ {STORE_BALANCE.toFixed(2).replace('.', ',')}
        </span>
      </div>
      
      <div className="space-y-4">
        {MOCK_CAMPAIGNS.map((campaign) => (
          <div 
            key={campaign.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{campaign.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {campaign.type === 'premium' ? 'Alcance Máximo' : 'Visibilidade Local'}
                </p>
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
    <div className="p-5 pb-40">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8 px-4 relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -z-10 mx-8"></div>
        {[1, 2, 3].map(step => (
          <div key={step} className="flex flex-col items-center gap-2 bg-gray-50 dark:bg-gray-900 px-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors shadow-sm ${
              createStep >= step ? 'bg-purple-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-400 border border-gray-200 dark:border-gray-700'
            }`}>
              {step}
            </div>
            <span className={`text-[10px] font-bold ${createStep >= step ? 'text-purple-600' : 'text-gray-400'}`}>
              {step === 1 ? 'Plano' : step === 2 ? 'Configurar' : 'Pagamento'}
            </span>
          </div>
        ))}
      </div>

      {createStep === 1 && (
        <div className="space-y-4 animate-in slide-in-from-right duration-300">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">Escolha seu plano</h3>
          
          <button 
            onClick={() => setNewCampaignType('local')}
            className={`w-full p-5 rounded-3xl border-2 text-left transition-all ${
              newCampaignType === 'local' 
                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-600/20 ring-offset-2 dark:ring-offset-gray-900' 
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-gray-900 dark:text-white text-lg">ADS Local</span>
              <span className="text-purple-700 dark:text-purple-300 font-bold bg-purple-100 dark:bg-purple-900/40 px-3 py-1 rounded-lg text-xs">
                R$ 1,90/dia
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
              Perfeito para visibilidade constante. Sua loja aparece com destaque na lista da categoria e buscas locais.
            </p>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-500" /> Topo da Categoria</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-500" /> Borda colorida no card</li>
            </ul>
          </button>

          <button 
            onClick={() => setNewCampaignType('premium')}
            className={`w-full p-5 rounded-3xl border-2 text-left transition-all relative overflow-hidden ${
              newCampaignType === 'premium' 
                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-600/20 ring-offset-2 dark:ring-offset-gray-900' 
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
          >
            {newCampaignType === 'premium' && (
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-purple-600 to-indigo-600 text-white text-[9px] font-bold px-3 py-1.5 rounded-bl-xl shadow-sm uppercase tracking-wide">
                Mais Popular
              </div>
            )}
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-gray-900 dark:text-white text-lg">ADS Premium</span>
              <span className="text-purple-700 dark:text-purple-300 font-bold bg-purple-100 dark:bg-purple-900/40 px-3 py-1 rounded-lg text-xs">
                R$ 3,90/dia
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
              Máxima exposição. Sua marca no banner rotativo da Home e prioridade absoluta nas buscas.
            </p>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-500" /> Banner na Home</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-500" /> 1º lugar na busca</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-500" /> Badge "Patrocinado"</li>
            </ul>
          </button>
        </div>
      )}

      {createStep === 2 && (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 ml-1">Nome da Campanha</label>
            <input 
                type="text"
                placeholder="Ex: Promoção de Verão"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 ml-1">Descrição Curta</label>
            <input 
                type="text"
                placeholder="Ex: Descontos de até 20% em toda a loja"
                value={campaignDesc}
                onChange={(e) => setCampaignDesc(e.target.value)}
                maxLength={50}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
            <p className="text-[10px] text-gray-400 text-right mt-1">{campaignDesc.length}/50</p>
          </div>

          <div>
            <div className="flex justify-between items-end mb-4">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Duração</label>
                <span className="text-xl font-black text-purple-600">{duration} dias</span>
            </div>
            
            <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 touch-none">
                <div 
                    className="absolute top-0 left-0 h-full bg-purple-600 rounded-full"
                    style={{ width: `${((duration - 7) / (180 - 7)) * 100}%` }}
                ></div>
                <input 
                    type="range"
                    min="7"
                    max="180"
                    step="1"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="absolute top-[-8px] left-0 w-full h-8 opacity-0 cursor-pointer"
                />
                <div 
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-purple-600 rounded-full shadow-md pointer-events-none transition-all"
                    style={{ left: `calc(${((duration - 7) / (180 - 7)) * 100}% - 12px)` }}
                ></div>
            </div>
            
            <div className="flex justify-between text-[10px] text-gray-400 font-bold px-1">
                <span>7 dias</span>
                <span>180 dias</span>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl flex justify-between items-center border border-purple-100 dark:border-purple-800/50">
             <span className="text-sm font-bold text-gray-600 dark:text-purple-200">Investimento Total</span>
             <span className="text-2xl font-black text-purple-700 dark:text-purple-300">R$ {totalCost.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      )}

      {createStep === 3 && (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-400" /> Resumo do Pedido
            </h3>
            
            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Campanha</span>
                    <span className="font-bold text-gray-900 dark:text-white text-right">{campaignName}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Plano</span>
                    <span className="font-bold text-gray-900 dark:text-white">{newCampaignType === 'local' ? 'ADS Local' : 'Premium'}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duração</span>
                    <span className="font-bold text-gray-900 dark:text-white">{duration} dias</span>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
                <div className="flex justify-between text-base">
                    <span className="font-bold text-gray-900 dark:text-white">Valor Final</span>
                    <span className="font-black text-purple-600 text-lg">R$ {totalCost.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>

            {/* Payment Method Logic */}
            <div className={`p-4 rounded-xl border ${hasSufficientBalance ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800' : 'bg-orange-50 border-orange-200 dark:bg-orange-900/10 dark:border-orange-800'}`}>
                {hasSufficientBalance ? (
                    <>
                        <div className="flex items-center gap-2 mb-2 text-green-700 dark:text-green-400 font-bold text-sm">
                            <Wallet className="w-4 h-4" /> Pagamento com Saldo
                        </div>
                        <p className="text-xs text-green-600 dark:text-green-500 leading-tight">
                            O valor será descontado do seu saldo de loja (Disponível: R$ {STORE_BALANCE.toFixed(2).replace('.', ',')}).
                        </p>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2 mb-2 text-orange-700 dark:text-orange-400 font-bold text-sm">
                            <QrCode className="w-4 h-4" /> Pagamento via Pix
                        </div>
                        <p className="text-xs text-orange-600 dark:text-orange-500 leading-tight mb-3">
                            Saldo insuficiente. Gere um código Pix para ativar sua campanha instantaneamente.
                        </p>
                        <button className="w-full bg-white dark:bg-gray-800 text-orange-600 font-bold text-xs py-2 rounded-lg border border-orange-200 dark:border-orange-800 shadow-sm">
                            Gerar Código Pix
                        </button>
                    </>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-5 pt-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-30 flex gap-3 max-w-md mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {createStep > 1 && (
          <button 
            onClick={() => setCreateStep(prev => prev - 1)}
            className="w-1/3 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Voltar
          </button>
        )}
        <button 
          onClick={() => {
            if (createStep === 2 && !campaignName) {
                alert("Por favor, dê um nome para sua campanha.");
                return;
            }
            if (createStep < 3) setCreateStep(prev => prev + 1);
            else setView('list'); // Finish
          }}
          className={`flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm py-3.5 rounded-2xl shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${createStep === 1 ? 'w-full' : ''}`}
        >
          {createStep === 3 ? (hasSufficientBalance ? 'Confirmar e Ativar' : 'Confirmar Pix') : 'Próximo'}
          {createStep < 3 && <ChevronLeft className="w-4 h-4 rotate-180" />}
        </button>
      </div>
    </div>
  );

  const DetailsView = () => {
    if (!selectedCampaign) return null;
    const { metrics, history } = selectedCampaign;
    const maxVal = Math.max(...history);

    return (
      <div className="p-5 pb-32 animate-in slide-in-from-right duration-300">
        
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
      </div>
    );
  };

  function FileText(props: any) {
      return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <line x1="10" x2="8" y1="9" y2="9" />
        </svg>
      );
  }

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