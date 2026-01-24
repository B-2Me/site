'use client'
import { Cpu, Database, Server, Globe, ChevronRight } from 'lucide-react'

export default function SiteSpecs() {

  const environment = [
    { 
      category: "INTERFACE", 
      icon: <Globe className="w-4 h-4 text-cyan-500" />,
      items: ["Next.js 16 (App Router)", "TypeScript Strict", "Tailwind CSS", "Lucide Icons"] 
    },
    { 
      category: "BACKEND", 
      icon: <Server className="w-4 h-4 text-cyan-500" />,
      items: ["Supabase (Postgres)", "Edge Functions", "Row Level Security", "Real-Time Subscriptions"] 
    },
    { 
      category: "DEPLOYMENT", 
      icon: <Cpu className="w-4 h-4 text-cyan-500" />,
      items: ["GitHub Pages", "Static Export", "CI/CD Actions", "Custom DNS"] 
    },
    { 
      category: "INTEGRATIONS", 
      icon: <Database className="w-4 h-4 text-cyan-500" />,
      items: ["GitHub API (Project Sync)", "Cal.com (Scheduling)", "Resend (Email API)", "Local Storage caching"] 
    }
  ]

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Disclaimer / Context */}
      <div className="max-w-3xl text-center mb-12 px-4">
        <p className="text-slate-400 text-sm font-mono leading-relaxed bg-slate-900/30 border border-slate-800 p-4 rounded-sm">
          <span className="text-cyan-500 font-bold mr-2">[ META: THIS_SITE_STACK ]</span>
          The infrastructure powering this specific interface. Optimized for static edge delivery and distinct from our enterprise engineering capabilities.
        </p>
      </div>

      {/* Grid - Matched to Deployments style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full px-4">
        {environment.map((group) => (
          <div key={group.category} className="bg-slate-900/30 border border-slate-800 p-6 rounded-sm hover:border-cyan-500/20 transition-colors group text-left relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
              {group.icon}
              <h4 className="font-mono text-sm text-cyan-400 tracking-wider font-bold">
                {group.category}
              </h4>
            </div>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-slate-400 font-mono text-sm flex items-center">
                  <ChevronRight className="w-3 h-3 text-cyan-900 mr-3 flex-shrink-0 group-hover:text-cyan-500 transition-colors" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
