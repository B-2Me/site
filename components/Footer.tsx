'use client'
import Link from 'next/link'
import { Github, Linkedin, Mail, Radio, Lock } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-blue-900/30 bg-slate-950 text-slate-400 py-16 font-mono text-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Column 1: Identity */}
        <div className="space-y-6">
          <span className="text-cyan-400 font-bold text-lg tracking-tighter block">[ BTWO.ME ]</span>
          <div className="text-slate-500 space-y-2 text-xs leading-relaxed">
            <p className="flex items-center gap-2">
               // System Status: 
               <span className="text-green-500 flex items-center gap-1.5">
                 <Radio className="w-3 h-3 animate-pulse" />
                 OPERATIONAL
               </span>
            </p>
             {/* Admin Console Link - Accessible on all devices */}
             <Link href="/console" className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors mt-4">
               <Lock className="w-3 h-3" />
               // ACCESS_CONSOLE
             </Link>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2 w-fit">// NAVIGATION</h4>
          <ul className="space-y-3 text-xs">
            <li><Link href="#about" className="hover:text-cyan-400 transition-colors flex items-center gap-2">› ABOUT</Link></li>
            <li><Link href="#services" className="hover:text-cyan-400 transition-colors flex items-center gap-2">› SERVICES</Link></li>
            <li><Link href="#experience" className="hover:text-cyan-400 transition-colors flex items-center gap-2">› EXPERIENCE</Link></li>
            <li><Link href="#projects" className="hover:text-cyan-400 transition-colors flex items-center gap-2">› PROJECTS</Link></li>
            <li><Link href="#contact" className="hover:text-cyan-400 transition-colors flex items-center gap-2">› CONTACT</Link></li>
          </ul>
        </div>

        {/* Column 3: Connect */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2 w-fit">// EXTERNAL_LINKS</h4>
          <div className="flex gap-4">
            <a href="https://github.com/nater0000" target="_blank" rel="noopener noreferrer" className="p-2 border border-slate-800 rounded bg-slate-900/50 hover:bg-slate-800 hover:text-white hover:border-cyan-500/50 transition-all group">
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-slate-800 rounded bg-slate-900/50 hover:bg-slate-800 hover:text-white hover:border-cyan-500/50 transition-all group">
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a href="mailto:support@btwo.me" className="p-2 border border-slate-800 rounded bg-slate-900/50 hover:bg-slate-800 hover:text-white hover:border-cyan-500/50 transition-all group">
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
          <p className="text-xs text-slate-600">Communications open 24/7</p>
        </div>
      </div>

      <div className="mt-16 border-t border-blue-900/20 pt-8 text-center text-slate-500 text-xs tracking-wider uppercase">
        <p>&copy; {currentYear} BTWO.ME ALL RIGHTS RESERVED.</p>
        <p className="mt-2 text-slate-600">RENDERED_BY: NEXT_JS_16 :: HOST: GITHUB_PAGES :: BACKEND: SUPABASE</p>
      </div>
    </footer>
  )
}
