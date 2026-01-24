'use client'
import { Terminal, Globe, Network, Database, CheckCircle2 } from 'lucide-react'

export default function Deployments() {
  
  const techGroups = [
    {
      title: "SYSTEMS_CORE",
      icon: <Terminal className="w-4 h-4 text-cyan-500" />,
      items: [
        "Embedded C/C++ Firmware",
        "Real-Time OS (RTOS)",
        "Golang / High Concurrency",
        "Rust Integration",
        "Cross-Platform Drivers",
        "WHQL Certification Logic"
      ]
    },
    {
      title: "MODERN_WEB",
      icon: <Globe className="w-4 h-4 text-cyan-500" />,
      items: [
        "Next.js / React Server Components",
        "TypeScript Ecosystem",
        "React Native Mobile",
        "Tailwind CSS / UI Systems",
        "Edge Functions / Serverless",
        "Progressive Web Apps (PWA)"
      ]
    },
    {
      title: "INTELLIGENT_DATA",
      icon: <Database className="w-4 h-4 text-cyan-500" />,
      items: [
        "Local LLM Orchestration (Ollama)",
        "RAG Pipelines (Vector/Hybrid)",
        "PostgreSQL / Supabase",
        "Python / PyTorch Integration",
        "On-Device ML Inference",
        "Data Sovereignty Strategy"
      ]
    },
    {
      title: "NETWORK_&_SIGNAL",
      icon: <Network className="w-4 h-4 text-cyan-500" />,
      items: [
        "WebRTC & Real-Time Comms",
        "Secure Tunnels (OpenSSH/WireGuard)",
        "Bluetooth LE / Serial Protocols",
        "Audio/Video Stream Tuning",
        "TCP/UDP Socket Programming",
        "Legacy Protocol Bridging"
      ]
    }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {techGroups.map((group, index) => (
          <div key={index} className="bg-slate-900/30 border border-slate-800 p-6 rounded-sm hover:border-cyan-500/20 transition-colors">
            <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
              {group.icon}
              <span className="font-mono text-sm text-cyan-400 tracking-wider font-bold">
                {group.title}
              </span>
            </div>
            <ul className="space-y-2">
              {group.items.map((item, i) => (
                <li key={i} className="text-slate-400 text-sm font-mono flex items-center">
                  <CheckCircle2 className="w-3 h-3 text-cyan-900 mr-3 flex-shrink-0" />
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
