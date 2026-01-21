'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-cyan-400 font-bold font-mono text-xl tracking-tighter">
              [ B2ME ]
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Schematics', 'Services', 'About'].map((item) => (
                <Link 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-mono transition-colors"
                >
                  {item}
                </Link>
              ))}
              <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-sm text-sm font-mono border border-white/10">
                ACCESS_KEY_LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
