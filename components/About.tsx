'use client'
import { Cpu, Database, Server, Globe, ChevronRight, Terminal, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function About() {
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
      
      {/* Section 1: The Narrative */}
      <div className="max-w-2xl text-center flex flex-col items-center">
        <h3 className="text-3xl font-mono text-white mb-8 flex items-center justify-center gap-3">
          // OPERATOR_BIO
          <Terminal className="w-6 h-6 text-cyan-500" />
        </h3>
        
        <div className="space-y-8 text-slate-400 font-sans leading-relaxed text-lg mb-10">
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

      {/* Section 2: System Specs */}
      <div className="w-full flex flex-col items-center">
        <h3 className="text-3xl font-mono text-white mb-4 flex items-center justify-center gap-3">
          // SYSTEM_SPECS
          <Cpu className="w-6 h-6 text-cyan-500" />
        </h3>

        {/* Uptime Line - Centered & Sleek */}
        <div className="mb-12 inline-flex items-center gap-3 bg-black/50 px-6 py-2 rounded-full border border-slate-800 shadow-inner">
             <Clock className="w-3 h-3 text-cyan-500" />
             <span className="font-mono text-xs text-slate-500">SINCE_LAST_DEPLOY :: </span>
             <span className="font-mono text-xs text-cyan-400">{uptime}</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
          {skills.map((group) => (
            <div key={group.category} className="border border-slate-800 bg-slate-900/50 p-6 rounded-sm hover:border-cyan-500/30 transition-colors group text-left">
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
      </div>

    </div>
  )
}
