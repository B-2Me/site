'use client'
import { useState } from 'react'
import { clsx } from 'clsx'

// Mock data - will replace with Supabase data later
const PLANS = [
  { id: '1', name: 'Consultation', price: 250, interval: 'hour', features: ['Architecture Review', 'Stack Selection', 'Security Audit'] },
  { id: '2', name: 'MVP Build', price: 5000, interval: 'fixed', features: ['Next.js + Supabase', 'Auth & Database', 'Deployment Pipeline'] },
  { id: '3', name: 'Scale', price: 15000, interval: 'fixed', features: ['High Performance', 'Custom Edge Functions', 'Audit Logs'] }
]

export default function Pricing() {
  const [billingInterval, setBillingInterval] = useState('month')

  return (
    <div className='flex flex-col items-center max-w-7xl mx-auto'>
      <div className="text-center mb-16">
        <h3 className="text-3xl font-mono text-white mb-4">// SERVICE_PACKAGES</h3>
        <p className="text-slate-400 max-w-xl mx-auto">Select a blueprint to begin construction.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
        {PLANS.map((plan) => (
          <div key={plan.id} className='relative group border border-blue-900/50 bg-slate-900/40 p-8 rounded-sm hover:border-cyan-500/50 transition-all duration-300'>
            {/* Holographic corner effect */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 opacity-50 group-hover:opacity-100"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 opacity-50 group-hover:opacity-100"></div>

            <h4 className='text-xl font-bold text-cyan-400 font-mono'>{plan.name}</h4>
            <div className='mt-4 flex items-baseline'>
              <span className='text-4xl font-bold text-white tracking-tight'>${plan.price}</span>
              <span className='ml-2 text-sm text-slate-500 font-mono'>/ {plan.interval}</span>
            </div>

            <ul className='mt-8 space-y-4 mb-8'>
              {plan.features.map((feature) => (
                <li key={feature} className='flex items-center text-slate-300 text-sm'>
                  <span className='w-1.5 h-1.5 bg-blue-500 mr-3 rounded-full'></span>
                  {feature}
                </li>
              ))}
            </ul>

            <button className='w-full py-3 border border-blue-800 text-blue-100 hover:bg-blue-900/30 hover:text-white hover:border-blue-500 transition-all rounded-sm font-mono text-sm uppercase tracking-wider'>
              Select_Blueprint
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
