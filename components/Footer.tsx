'use client'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-blue-900/30 bg-slate-950 text-slate-400 py-12 font-mono text-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: Identity */}
        <div className="space-y-4">
          <span className="text-cyan-400 font-bold text-lg tracking-tighter">[ B2ME ]</span>
          <p className="max-w-xs text-slate-500">
            // Decentralized portfolio architecture.<br/>
            // GitHub-backed content management.<br/>
            // System Status: <span className="text-green-500">OPERATIONAL</span>
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-wider">// NAVIGATION</h4>
          <ul className="space-y-2">
            <li><Link href="#schematics" className="hover:text-cyan-400 transition-colors">Project_Schematics</Link></li>
            <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Service_Protocols</Link></li>
            <li><Link href="#about" className="hover:text-cyan-400 transition-colors">About_System</Link></li>
          </ul>
        </div>

        {/* Column 3: Connect */}
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-wider">// COMMS_UPLINK</h4>
          <ul className="space-y-2">
            <li>
              <a href="https://github.com/nater0000" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                [GITHUB]
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                [LINKEDIN]
              </a>
            </li>
            <li>
              <a href="mailto:hello@b2me.xyz" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                [ENCRYPTED_EMAIL]
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-blue-900/30 pt-8 text-center text-slate-600 text-xs">
        <p>&copy; {currentYear} B2ME SYSTEMS. ALL RIGHTS RESERVED.</p>
        <p className="mt-2">RENDERED_BY: NEXT_JS_16 :: HOST: GITHUB_PAGES</p>
      </div>
    </footer>
  )
}
