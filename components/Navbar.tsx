'use client'
import { KeyRound } from 'lucide-react' // Import Icon

export default function Navbar() {
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    
    if (href === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
    }
    window.history.pushState({}, '', href);
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a 
              href="/" 
              onClick={(e) => handleScroll(e, '/')}
              className="text-cyan-400 font-bold font-mono text-xl tracking-tighter cursor-pointer hover:text-cyan-300 transition-colors"
            >
              [ BTWO.ME ]
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {['Projects', 'Services', 'About'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleScroll(e, `#${item.toLowerCase()}`)}
                  className="text-slate-400 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-mono transition-colors cursor-pointer uppercase tracking-wide"
                >
                  {item}
                </a>
              ))}
              
              {/* Access Key Button with Icon */}
              <button className="flex items-center gap-2 bg-cyan-950/30 hover:bg-cyan-900/50 text-cyan-400 px-4 py-2 rounded-sm text-xs font-mono border border-cyan-900/50 transition-all hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                <KeyRound className="w-3 h-3" />
                ACCESS_KEY
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
