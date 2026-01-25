'use client'
import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Shield, RefreshCw, Terminal, Lock, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Navbar from '@/components/Navbar' // Ensure this path matches your file structure
import Footer from '@/components/Footer' // Ensure this path matches your file structure

export default function Console() {
  const [accessKey, setAccessKey] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  
  const queryClient = useQueryClient()

  useEffect(() => {
    const sessionKey = sessionStorage.getItem('b2me_access_key')
    if (sessionKey === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      setIsUnlocked(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (accessKey === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      setIsUnlocked(true)
      sessionStorage.setItem('b2me_access_key', accessKey)
      addLog('ACCESS_GRANTED: Session initialized.')
    } else {
      addLog('ACCESS_DENIED: Invalid Key credential.')
      setAccessKey('')
    }
  }

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev])
  }

  const syncMutation = useMutation({
    mutationFn: async () => {
      addLog('INITIATING_UPLINK: Connecting to GitHub Edge Node...')
      const { data, error } = await supabase.functions.invoke('sync-projects')
      if (error) throw error
      return data
    },
    onSuccess: (data) => {
      addLog(`SYNC_COMPLETE: Processed ${data.count} repositories.`)
      addLog('CACHE_UPDATE: Database refreshed successfully.')
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
    onError: (error) => {
      addLog(`CRITICAL_FAILURE: ${error.message}`)
    }
  })

  // --- LOCKED STATE CONTENT ---
  const LockedView = () => (
    <div className="max-w-md w-full border border-slate-800 bg-slate-900/50 p-8 rounded-sm shadow-2xl relative overflow-hidden mx-auto my-12 md:my-24">
      {/* Decorative scanner line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50 animate-pulse"></div>
      
      <div className="flex flex-col items-center mb-8">
        <div className="p-4 bg-red-950/30 rounded-full border border-red-900/50 mb-4">
          <Lock className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-xl font-mono text-white tracking-widest">RESTRICTED_ACCESS</h1>
        <p className="text-slate-500 text-xs mt-2 font-mono">AUTH_PROTOCOL_REQUIRED</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input 
            type="password" 
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
            placeholder="ENTER_ACCESS_KEY"
            className="w-full bg-black/50 border border-slate-700 text-center text-white font-mono p-3 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all rounded-sm placeholder:text-slate-700"
            autoFocus
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-slate-800 hover:bg-red-900/50 hover:text-red-200 text-slate-400 border border-slate-700 hover:border-red-500/50 py-3 font-mono text-sm uppercase tracking-wider transition-all rounded-sm"
        >
          Authenticate
        </button>
      </form>

      {/* Back to Safety */}
      <div className="mt-6 text-center">
        <Link href="/" className="text-xs font-mono text-slate-600 hover:text-cyan-500 flex items-center justify-center gap-2">
          <ArrowLeft className="w-3 h-3" />
          RETURN_TO_HOME
        </Link>
      </div>

      {/* Login Logs */}
      <div className="mt-6 h-24 overflow-y-auto font-mono text-[10px] text-slate-600 border-t border-slate-800 pt-4">
          {logs.map((log, i) => <div key={i}>{log}</div>)}
          <div className="animate-pulse">_</div>
      </div>
    </div>
  )

  // --- UNLOCKED STATE CONTENT ---
  const DashboardView = () => (
    <div className="max-w-5xl mx-auto space-y-8 py-8">
      {/* Navbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-blue-900/30 pb-6 gap-4">
        <div>
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-cyan-400 mb-4 transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            [ RETURN_TO_SITE ]
          </Link>
          
          <h1 className="text-3xl font-mono text-white mb-2 flex items-center gap-3">
            <Terminal className="w-8 h-8 text-cyan-500" />
            COMMAND_CONSOLE
          </h1>
          <p className="text-slate-500 font-mono text-xs">ROOT_ACCESS :: SESSION_ACTIVE</p>
        </div>
        <button 
          onClick={() => {
            sessionStorage.removeItem('b2me_access_key')
            setIsUnlocked(false)
          }}
          className="text-xs font-mono text-red-400 hover:text-red-300 border border-red-900/30 px-3 py-1 rounded hover:bg-red-950/30 transition-colors"
        >
          [ TERMINATE_SESSION ]
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Controls */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Sync Control */}
          <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-sm">
            <h3 className="text-cyan-400 font-mono text-sm mb-4 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              SYNC_CONTROLS
            </h3>
            <p className="text-slate-500 text-xs mb-6 leading-relaxed">
              Manually trigger the GitHub crawler. This will refresh the database cache with the latest repository data.
            </p>
            
            <button
              onClick={() => syncMutation.mutate()}
              disabled={syncMutation.isPending}
              className={`w-full py-4 border font-mono text-sm uppercase tracking-wider transition-all rounded-sm flex items-center justify-center gap-2
                ${syncMutation.isPending 
                  ? 'border-cyan-900/50 text-cyan-700 cursor-not-allowed bg-cyan-950/10' 
                  : 'border-cyan-500/50 text-cyan-400 hover:bg-cyan-950/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                }`}
            >
                {syncMutation.isPending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    EXECUTING...
                  </>
                ) : (
                  <>
                    [ EXECUTE_SYNC ]
                  </>
                )}
            </button>
          </div>

          {/* Status Panel */}
          <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-sm">
              <h3 className="text-green-400 font-mono text-sm mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              SYSTEM_STATUS
            </h3>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>EDGE_NODE</span>
                <span className="text-green-500">ONLINE</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>DB_CONNECTION</span>
                <span className="text-green-500">STABLE</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>LAST_BUILD</span>
                <span className="text-slate-500">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Terminal Output */}
        <div className="lg:col-span-2">
          <div className="border border-slate-800 bg-black p-6 rounded-sm h-[500px] flex flex-col font-mono text-xs overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-6 bg-slate-900 border-b border-slate-800 flex items-center px-4 text-slate-500">
              OUTPUT_LOG
            </div>
            
            <div className="mt-6 flex-grow overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {logs.length === 0 && (
                <span className="text-slate-700 opacity-50">Waiting for commands...</span>
              )}
              {logs.map((log, i) => (
                <div key={i} className="text-slate-300 border-l-2 border-slate-800 pl-3 py-1 hover:bg-white/5 transition-colors">
                  {log}
                </div>
              ))}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  )

  // --- MAIN LAYOUT RENDER ---
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow p-4 md:p-12 flex flex-col justify-center">
        {isUnlocked ? <DashboardView /> : <LockedView />}
      </main>

      <Footer />
    </div>
  )
}
