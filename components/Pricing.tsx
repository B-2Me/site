'use client'
import { useEffect } from 'react'
import { Check, Calendar, Video } from 'lucide-react'
import { getCalApi } from "@calcom/embed-react"

const PLANS = [
  { 
    id: '1', 
    name: 'AUDIT', 
    description: 'System analysis and architectural validation.',
    features: [
      'Self-Hosted Infrastructure Review',
      'Secure Tunneling (OpenSSH/TCP)', 
      'Embedded vs Cloud Feasibility',
      'Legacy Stack Assessment'
    ] 
  },
  { 
    id: '2', 
    name: 'OPTIMIZE', 
    description: 'Integration of local AI and media processing.',
    features: [
      'Local LLM Orchestration (Ollama)',
      'RAG Pipeline Integration (S3/Notion)',
      'Voice/Video Stream Tuning',
      'TTS/STT Pipelines (Kokoro/Speaches)'
    ] 
  },
  { 
    id: '3', 
    name: 'BUILD', 
    description: 'Bespoke engineering for non-existent solutions.',
    features: [
      'Custom RAG Engines (LlamaIndex/Python)',
      'Real-Time Audio Systems (Embedded)',
      'High-Perf Servers (Go/Node/Python)',
      'Custom Management Interfaces'
    ] 
  }
]

export default function Pricing() {
  
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        "theme": "dark",
        "styles": { "branding": { "brandColor": "#06b6d4" } },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);

  const handleBook = async () => {
    const cal = await getCalApi();
    cal("modal", {
      calLink: "nathan-qm7zbq/30min", // <--- Remember to update this later
      config: { layout: 'month_view' }
    });
  };

  return (
    <div className='flex flex-col items-center max-w-7xl mx-auto'>
      <div className="text-center mb-16 space-y-4">
        <h3 className="text-lg sm:text-xl md:text-3xl font-mono text-white font-bold break-words px-4">
  // ARCHITECTURAL_SERVICES
</h3>
        
        <div className="max-w-2xl mx-auto bg-blue-950/20 border border-blue-900/30 p-6 rounded-sm">
           <p className="text-slate-400 leading-relaxed flex gap-4 text-left">
             <Video className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
             <span>
               Complex architectures are easier to discuss in real-time. 
               Select a tier below to initialize a{' '}
               <button 
                 onClick={handleBook}
                 className="text-cyan-400 font-bold hover:text-cyan-300 underline underline-offset-4 decoration-cyan-500/50 hover:decoration-cyan-400 transition-all cursor-pointer"
               >
                 secure video uplink
               </button>
               {' '}and discuss your project requirements directly.
             </span>
           </p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl justify-items-center px-4'>
        {PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className='relative group flex flex-col w-full max-w-[380px] border border-blue-900/50 bg-slate-900/40 p-8 rounded-sm hover:border-cyan-500/50 transition-all duration-300'
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 opacity-50 group-hover:opacity-100"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 opacity-50 group-hover:opacity-100"></div>

            {/* CENTERED HEADER */}
            <h4 className='text-2xl font-bold text-white font-mono tracking-tight mb-2 text-center w-full'>{plan.name}</h4>
            <p className="text-slate-500 text-sm font-mono h-12 text-center">{plan.description}</p>

            <div className="my-8 border-t border-blue-900/30"></div>

            <ul className='space-y-4 flex-grow mb-8'>
              {plan.features.map((feature) => (
                <li key={feature} className='flex items-start text-slate-300 text-sm'>
                  <Check className="w-4 h-4 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="font-sans leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={handleBook}
              className='mt-auto w-full py-3 border border-blue-800 text-blue-100 hover:bg-cyan-950/30 hover:text-cyan-400 hover:border-cyan-500 transition-all rounded-sm font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]'
            >
              <Calendar className="w-4 h-4" />
              <span>[ SCHEDULE_SYNC ]</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
