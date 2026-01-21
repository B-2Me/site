'use client'
import { Cpu, Database, Server, Globe, ChevronRight, Terminal, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function About() {
  // Uptime Logic
  const [uptime, setUptime] = useState<string>("0h 0m 0s")

  useEffect(() => {
    const buildTime = new Date(process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString())
    
    const interval = setInterval(() => {
      const now = new Date()
      const diff = now.getTime() - buildTime.getTime()
      
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setUptime(`${hours}h ${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const skills = [
    { 
      category: "WEB", 
      icon: <Cpu className="w-4 h-4 text-cyan-500" />,
      items: ["Next.js", "React", "TypeScript", "Node.js"] 
    },
    { 
      category: "STORAGE", 
      icon: <Database className="w-4 h-4 text-cyan-500" />,
      items: ["Supabase", "GitHub", "Amazon S3"] 
    },
    { 
      category: "INFRASTRUCTURE", 
      icon: <Server className="w-4 h-4 text-cyan-500" />,
      items: ["Docker", "VPS", "GitHub Actions", "Custom"] 
    },
    { 
      category: "PROTOCOL", 
      icon: <Globe className="w-4 h-4 text-cyan-500" />,
      items: ["REST", "TCP/UDP", "WebSockets", "RPC"] 
    }
  ]

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-24 items-center">
      
      {/* Section 1: The Narrative (Centered) */}
      <div className="max-w-2xl text-center">
        <h3 className="text-3xl font-mono text-white mb-8 flex items-center justify-center gap-3">
          // OPERATOR_BIO
          <Terminal className="w-6 h-6 text-cyan-500" />
        </h3>
        
        <div className="space-y-8 text-slate-400 font-sans leading-relaxed text-lg">
          <div>
            <span className="text-cyan-400 font-mono text-sm block mb-2 tracking-widest">[ INTRO ]</span>
            <p>
              I am a full-stack engineer focused on decentralized architectures and high-performance web systems. 
              My philosophy is simple: build systems that are robust, transparent, and user-centric.
            </p>
          </div>
          
          <div>
            <span className="text-cyan-400 font-mono text-sm block mb-2 tracking-widest">[ MISSION ]</span>
            <p>
              Currently engineering solutions that bridge the gap between complex backend logic and intuitive frontend experiences. 
              I specialize in "Headless" architectures—decoupling content from presentation to ensure maximum scalability.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: System Specs (Stacked Below) */}
      <div className="w-full">
        <h3 className="text-3xl font-mono text-white mb-12 flex items-center justify-center gap-3">
          // SYSTEM_SPECS
          <Cpu className="w-6 h-6 text-cyan-500" />
        </h3>
        
        {/* Centered Grid for Skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {skills.map((group) => (
            <div key={group.category} className="border border-slate-800 bg-slate-900/50 p-6 rounded-sm hover:border-cyan-500/30 transition-colors group">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                {group.icon}
                <h4 className="text-cyan-100 font-mono text-xs tracking-widest group-hover:text-cyan-400 transition-colors">
                  {group.category}
                </h4>
              </div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-slate-400 font-mono text-sm flex items-center">
                    <ChevronRight className="w-3 h-3 text-cyan-900 mr-2 group-hover:text-cyan-500 transition-colors" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Live Uptime Terminal - Centered & Fitted */}
        <div className="mt-12 w-fit mx-auto font-mono text-xs text-slate-600 bg-black/50 p-6 rounded border border-slate-900 shadow-inner text-center">
           <div className="flex items-center gap-2 justify-center mb-2 text-cyan-500">
             <Clock className="w-3 h-3" />
             <span>SINCE_LAST_DEPLOY</span>
           </div>
           <p className="text-slate-300 text-lg tracking-widest">{uptime}</p>
           <p className="mt-2 text-[10px] text-slate-700">BTWO.ME</p>
        </div>
      </div>

    </div>
  )
}