
import React from 'react';
import { 
  ChevronLeft, 
  Shield, 
  CheckCircle, 
  Users, 
  Star, 
  Phone, 
  MapPin, 
  Globe, 
  Building2, 
  Truck, 
  Monitor, 
  Heart, 
  Quote,
  Calendar
} from 'lucide-react';

interface PatrocinadorMasterScreenProps {
  onBack: () => void;
}

export const PatrocinadorMasterScreen: React.FC<PatrocinadorMasterScreenProps> = ({ onBack }) => {
  
  const companies = [
    "Esquematiza Serviços",
    "Esquematiza Vigilância",
    "Esquematiza Prevenção",
    "Esquematiza Patrimonial",
    "Esquematiza Treinamentos"
  ];

  const services = [
    { icon: Shield, title: "Segurança", desc: "Vigilância, escolta armada, segurança pessoal e patrimonial." },
    { icon: Building2, title: "Facilities", desc: "Portaria, controle de acesso, limpeza, jardinagem e zeladoria." },
    { icon: Monitor, title: "Soluções", desc: "Monitoramento 24h, câmeras inteligentes e alarmes." },
    { icon: Calendar, title: "Eventos", desc: "Segurança, limpeza e valet para grandes eventos." }
  ];

  const differentials = [
    { icon: Monitor, title: "Central 24h", desc: "Monitoramento e resposta rápida a incidentes." },
    { icon: Truck, title: "Frota Própria", desc: "+100 veículos personalizados para atendimento." },
    { icon: Users, title: "Equipe Expert", desc: "Profissionais treinados em centro próprio." },
    { icon: Heart, title: "Benefícios", desc: "Cuidado real com o bem-estar do colaborador." }
  ];

  const testimonials = [
    { name: "Maike Padilha", role: "CEO Arte Móveis", text: "Antes tínhamos furtos constantes. Com a segurança patrimonial da Esquematiza, vivemos com total tranquilidade." },
    { name: "Daniel Crespo", role: "Gerente Hotel Tiffany's", text: "Houve uma transformação na qualidade do atendimento. Nossos hóspedes se sentem mais seguros e acolhidos." },
    { name: "Rogéria Souza", role: "Síndica Cond. Reserva", text: "A equipe é profissional, atenciosa e garante organização impecável. Recomendo muito!" }
  ];

  const benefits = [
    "Encargos Garantidos", "Assistência Psicológica", "Gympass", "Cursos Profissionalizantes", 
    "Seguro de Vida", "Supervisão 24h", "Cesta Básica", "Premiações"
  ];

  const managers = [
    { name: "William Costa", role: "CEO" },
    { name: "Carlos Panza", role: "COO" },
    { name: "Douglas Braido", role: "Planejamento Estratégico" },
    { name: "Luisa Longo", role: "Gerente Comercial" },
    { name: "Gisele Souza", role: "Gerente Administrativa" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 pb-10">
      
      {/* Header Fixo */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-5 h-16 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-gray-900 dark:text-white text-lg">Patrocinador Master</h1>
      </header>

      {/* Hero Section */}
      <div className="bg-slate-900 text-white pt-8 pb-10 px-6 rounded-b-[40px] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center mb-6 shadow-2xl">
             <svg viewBox="0 0 24 24" className="w-12 h-12 text-yellow-400" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" fill="currentColor"/>
               <path d="M8 8H16V10H10V11H15V13H10V14H16V16H8V8Z" fill="white"/>
             </svg>
          </div>
          <h2 className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-2">Grupo Esquematiza</h2>
          <h1 className="text-3xl font-bold font-display leading-tight mb-4">
            Segurança e Serviços com Excelência
          </h1>
          <div className="flex gap-2 flex-wrap justify-center">
             <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium border border-white/10">10+ Anos de Mercado</span>
             <a 
               href="https://share.google/GwMTZXmVh92zY1hQN"
               target="_blank"
               rel="noopener noreferrer"
               className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium border border-white/10 cursor-pointer hover:bg-white/20 active:opacity-60 transition-all flex items-center justify-center"
             >
               Nota 5.0 no Google
             </a>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-6 relative z-20 space-y-8">
        
        {/* Quem Somos */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-3">Quem somos</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Com mais de 10 anos de experiência, o Grupo Esquematiza é referência em serviços gerais e segurança, oferecendo soluções personalizadas para empresas e condomínios. A equipe cuida da proteção, bem-estar e eficiência dos clientes, garantindo ambientes seguros e bem administrados.
          </p>
        </section>

        {/* Nossas Empresas */}
        <section>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 pl-1">Nossas Empresas</h3>
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 no-scrollbar">
            {companies.map((company, idx) => (
              <div key={idx} className="min-w-[200px] bg-slate-800 text-white p-4 rounded-2xl shadow-md border-l-4 border-blue-500 flex flex-col justify-center">
                <span className="text-xs text-blue-400 font-bold uppercase mb-1">Unidade</span>
                <p className="font-bold text-sm leading-tight">{company}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nossos Serviços */}
        <section>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 pl-1">Nossos Serviços</h3>
          <div className="grid grid-cols-2 gap-3">
            {services.map((srv, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <srv.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{srv.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-snug">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clientes */}
        <section className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-3xl">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 text-center">Quem confia na Esquematiza</h3>
          <div className="flex flex-wrap justify-center gap-3 opacity-60">
             {["Coca-Cola", "Firjan", "Sicredi", "Botafogo", "Cyrela", "Smart Fit", "Hortifruti", "Record", "Leader"].map((c, i) => (
               <span key={i} className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 shadow-sm">
                 {c}
               </span>
             ))}
          </div>
        </section>

        {/* Estrutura e Diferenciais */}
        <section>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 pl-1">Estrutura e Diferenciais</h3>
          <div className="space-y-3">
            {differentials.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="bg-[#EAF0FF] dark:bg-blue-900/20 p-2 rounded-xl text-[#1E5BFF] dark:text-blue-400 mt-0.5">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Depoimentos */}
        <section>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 pl-1">Depoimentos</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 no-scrollbar">
            {testimonials.map((t, idx) => (
              <div key={idx} className="min-w-[280px] bg-slate-900 text-white p-5 rounded-3xl relative">
                <Quote className="w-8 h-8 text-slate-700 absolute top-4 right-4" />
                <p className="text-sm font-medium text-gray-300 italic mb-4 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-bold text-blue-400 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefícios */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Pacote de Benefícios</h3>
          <div className="grid grid-cols-2 gap-y-3 gap-x-2">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gestores */}
        <section>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 pl-1">Conheça nossos gestores</h3>
          <div className="grid grid-cols-2 gap-3">
            {managers.map((m, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded-2xl border border-gray-100 dark:border-gray-700 text-center">
                <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-2 overflow-hidden">
                   {/* Placeholder avatar */}
                   <img src={`https://ui-avatars.com/api/?name=${m.name.replace(' ', '+')}&background=random`} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-bold text-gray-900 dark:text-white text-xs">{m.name}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">{m.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contato Comercial */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-3xl shadow-xl">
          <h3 className="font-bold text-lg mb-6">Contato Comercial</h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-200 uppercase font-bold">Falar com</p>
                <p className="font-medium">Douglas Braido</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-200 uppercase font-bold">Telefone/WhatsApp</p>
                <p className="font-medium">(21) 98555-9480</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-200 uppercase font-bold">Site</p>
                <p className="font-medium">grupoesquematiza.com.br</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-200 uppercase font-bold">Endereço</p>
                <p className="font-medium text-sm">R. Cândido de Figueiredo, 204 – Tanque</p>
              </div>
            </div>
          </div>

          <a 
            href="https://wa.me/5521985559480"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white text-blue-800 font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
          >
            <Phone className="w-5 h-5" />
            Falar com o Grupo Esquematiza
          </a>
        </section>

        {/* Rodapé */}
        <div className="text-center px-4 pt-4">
          <p className="text-xs text-gray-500 italic">
            “Cuidar e proteger com planejamento e dedicação. Esse é o nosso compromisso.”
          </p>
        </div>

      </div>
    </div>
  );
};
