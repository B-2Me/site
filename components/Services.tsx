'use client'
import { useEffect } from 'react'
import { Calendar, Video, Cpu, Server, Users } from 'lucide-react'
import { getCalApi } from "@calcom/embed-react"

export default function Services() {
  
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
      calLink: "nathan-qm7zbq/30min", 
      config: { layout: 'month_view' }
    });
  };

  const pillars = [
    {
      id: 'eng',
      title: 'ENGINEERING',
      icon: <Cpu className="w-6 h-6 text-cyan-500" />,
      tagline: '// DEEP_SYSTEMS_WORK',
      description: 'We handle the layers most developers avoid. Our expertise is forged in the constraints of embedded devices and the complexity of real-time operating systems.'
    },
    {
      id: 'arch',
      title: 'ARCHITECTURE',
      icon: <Server className="w-6 h-6 text-cyan-500" />,
      tagline: '// SOVEREIGN_STACK',
      description: 'We reject the default of renting every layer of your stack. We leverage open-source tools to build novel, resilient infrastructure that belongs to you.'
    },
    {
      id: 'adv',
      title: 'ADVISORY',
      icon: <Users className="w-6 h-6 text-cyan-500" />,
      tagline: '// TECHNICAL_ALLIANCE',
      description: 'Rooted in a history of automating Windows message loops since Visual Basic 3.0. We bring decades of experience to advise, mentor, and build without gatekeeping knowledge.'
    }
  ]

  return (
    <div className='flex flex-col items-center max-w-7xl mx-auto px-4'>
      
      {/* HEADER SECTION */}
      <div className="text-center mb-16 space-y-6">
        <div className="max-w-2xl mx-auto bg-slate-900/50 border border-slate-800 p-6 rounded-sm">
           <p className="text-slate-400 leading-relaxed flex gap-4 text-left text-sm md:text-base">
             <Video className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
             <span>
               Complex architectures are easier to discuss in real-time. 
               Review our pillars below, then{' '}
               <button 
                 onClick={handleBook}
                 className="text-cyan-400 font-bold hover:text-cyan-300 underline underline-offset-4 decoration-cyan-500/50 hover:decoration-cyan-400 transition-all cursor-pointer"
               >
                 initialize a secure video uplink
               </button>
               {' '}to discuss your specific requirements.
             </span>
           </p>
        </div>
      </div>

      {/* SERVICE PILLARS GRID */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl'>
        {pillars.map((plan) => (
          <div 
            key={plan.id} 
            className='relative group flex flex-col w-full border border-slate-800 bg-slate-900/20 p-8 rounded-sm hover:border-cyan-500/50 transition-all duration-300'
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>

            {/* Icon & Title */}
            <div className="mb-6">
              <div className="mb-4 p-3 bg-slate-900 w-fit rounded-sm border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                {plan.icon}
              </div>
              <h4 className='text-xl font-bold text-white font-mono tracking-tight mb-2'>{plan.title}</h4>
              <p className="text-xs font-mono text-cyan-500 tracking-widest">{plan.tagline}</p>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
              {plan.description}
            </p>

            {/* CTA Button */}
            <button 
              onClick={handleBook}
              className='mt-auto w-full py-3 border border-slate-700 text-slate-300 hover:bg-cyan-950/30 hover:text-cyan-400 hover:border-cyan-500 transition-all rounded-sm font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]'
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
