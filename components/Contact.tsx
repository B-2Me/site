'use client'
import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honey, setHoney] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: { email, message, honey }
      })

      if (error) throw error
      setStatus('success')
      setEmail('')
      setMessage('')
      setHoney('')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl mx-auto border border-blue-900/30 bg-slate-900/40 p-8 rounded-sm">
      
      {/* Removed // OPEN_CHANNEL header */}

      {status === 'success' ? (
        <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h4 className="text-xl text-white font-mono">TRANSMISSION_RECEIVED</h4>
          <p className="text-slate-400">We will establish a secure handshake shortly.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-6 text-xs font-mono text-cyan-500 hover:text-cyan-400 border-b border-cyan-500/30 hover:border-cyan-500 pb-1"
          >
            [ SEND_ANOTHER ]
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="text" 
            name="phone_number" 
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
            className="hidden" 
            autoComplete="off"
            tabIndex={-1}
          />

          <div>
            <label className="block text-xs font-mono text-cyan-500 mb-2 uppercase">Return Address (Email)</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-300 p-3 font-mono focus:border-cyan-500 focus:outline-none transition-colors rounded-sm"
              placeholder="operator@example.com"
            />
          </div>
          
          <div>
            <label className="block text-xs font-mono text-cyan-500 mb-2 uppercase">Payload (Message)</label>
            <textarea 
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-slate-950 border border-slate-700 text-slate-300 p-3 font-mono focus:border-cyan-500 focus:outline-none transition-colors rounded-sm"
              placeholder="Requesting schematic access..."
            />
          </div>

          <button 
            type="submit" 
            disabled={status === 'sending'}
            className="w-full bg-blue-700 hover:bg-blue-600 disabled:bg-slate-800 disabled:text-slate-500 text-white font-mono py-3 px-6 rounded-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                ENCRYPTING...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                [ INITIATE_UPLINK ]
              </>
            )}
          </button>

          {status === 'error' && (
            <div className="text-red-400 text-xs font-mono flex items-center gap-2 mt-4 bg-red-950/20 p-3 border border-red-900/50">
              <AlertCircle className="w-4 h-4" />
              ERROR: UPLINK_FAILED. PLEASE RETRY.
            </div>
          )}
        </form>
      )}
    </div>
  )
}
