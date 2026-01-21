'use client'
import { useState } from 'react'
import { Check } from 'lucide-react' // Import Icon

// Mock data
const PLANS = [
  { id: '1', name: 'Consultation', price: 250, interval: 'hour', features: ['Architecture Review', 'Stack Selection', 'Security Audit'] },
  { id: '2', name: 'MVP Build', price: 5000, interval: 'fixed', features: ['Next.js + Supabase', 'Auth & Database', 'Deployment Pipeline'] },
  { id: '3', name: 'Scale', price: 15000, interval: 'fixed', features: ['High Performance', 'Custom Edge Functions', 'Audit Logs'] }
]

export default function Pricing() {
  const [billingInterval, setBillingInterval] = useState('month') // Kept state if you want toggle later

  return (
    <div className='flex flex-col items-center max-w-7xl mx-auto'>
      <div className="text-center mb-16">
        <h3 className="text-3xl font-mono text-white mb-4">// SERVICE_PACKAGES</h3>
        <p className="text-slate-400 max-w-xl mx-auto">Select a blueprint to begin construction.</p>
      </div>

      {/* LAYOUT FIX:
         - Added 'max-w-6xl' to constrain the total width of the group.
         - Added 'justify-items-center' to center cards within their columns.
      */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl justify-items-center px-4'>
        {PLANS.map((plan) => (
          <div 
            key={plan.id} 
            /* CARD FIX:
               - Added 'w-full max-w-[380px]' to prevent the card from stretching too wide.
               - Added 'flex flex-col' to push button to bottom.
            */
            className='relative group flex flex-col w-full max-w-[380px] border border-blue-900/50 bg-slate-900/40 p-8 rounded-sm hover:border-cyan-500/50 transition-all duration-300'
          >
            {/* Holographic corner effect */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 opacity-50 group-hover:opacity-100"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 opacity-50 group-hover:opacity-100"></div>

            <h4 className='text-xl font-bold text-cyan-400 font-mono'>{plan.name}</h4>
            <div className='mt-4 flex items-baseline'>
              <span className='text-4xl font-bold text-white tracking-tight'>${plan.price}</span>
              <span className='ml-2 text-sm text-slate-500 font-mono'>/ {plan.interval}</span>
            </div>

            <ul className='mt-8 space-y-4 mb-8 flex-grow'>
              {plan.features.map((feature) => (
                <li key={feature} className='flex items-center text-slate-300 text-sm'>
                  {/* Replaced CSS dot with Check Icon */}
                  <Check className="w-4 h-4 text-cyan-500 mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className='mt-auto w-full py-3 border border-blue-800 text-blue-100 hover:bg-blue-900/30 hover:text-white hover:border-blue-500 transition-all rounded-sm font-mono text-sm uppercase tracking-wider shadow-[0_0_10px_rgba(0,0,0,0.5)]'>
              Select_Blueprint
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
