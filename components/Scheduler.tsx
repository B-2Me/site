'use client'
import { useEffect } from 'react'
import { getCalApi } from "@calcom/embed-react"
import { Calendar, Clock, Video, ArrowRight } from 'lucide-react'

export default function Scheduler() {
  
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

  const handleOpenCalendar = async () => {
    const cal = await getCalApi();
    // MANUAL TRIGGER: This avoids the "iframe doesn't exist" error 
    // by ensuring we only call the modal when the user clicks.
    cal("modal", {
      calLink: "nathan-qm7zbq/30min", // <--- REPLACE THIS with your actual link
      config: { layout: 'month_view' }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="border border-cyan-900/30 bg-slate-900/20 p-8 md:p-12 rounded-sm relative overflow-hidden group">
        
        {/* Background Decorator */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/10 transition-all duration-700"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          {/* Text Context */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <h3 className="text-2xl font-mono text-white flex items-center justify-center md:justify-start gap-3">
              <Video className="w-6 h-6 text-cyan-500" />
              // SYNC_COMMUNICATION
            </h3>
            <p className="text-slate-400 text-lg max-w-xl">
              Complex architectures are easier to discuss in real-time. 
              Initialize a secure video uplink to discuss your project requirements directly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-xs font-mono text-slate-500 mt-4">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-900" /> 30_MIN_SESSION
              </span>
              <span className="flex items-center gap-2">
                <Video className="w-4 h-4 text-cyan-900" /> GOOGLE_MEET
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex-shrink-0">
            <button 
              onClick={handleOpenCalendar}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-sm uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] rounded-sm"
            >
              <span>[ INITIALIZE_SYNC ]</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[10px] text-slate-600 mt-3 font-mono">
              AVAILABLE: MON-FRI // 0900-1700 EST
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
