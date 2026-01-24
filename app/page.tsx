import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Deployments from '@/components/Deployments' 
import ProjectGrid from '@/components/ProjectGrid'
import SiteSpecs from '@/components/SiteSpecs' 
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { Layers, Terminal, Code2 } from 'lucide-react'

const bgStyle = {
  backgroundImage: `url('${process.env.NODE_ENV === 'production' ? '/grid.svg' : '/grid.svg'}')`
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      <Navbar />

      {/* 1. HERO */}
      <section 
        id="hero" 
        style={bgStyle} 
        className="flex flex-col items-center pt-32 md:pt-48 min-h-[85vh] border-b border-blue-900/30 relative"
      >
        <Hero /> 
      </section>

      {/* 2. ABOUT */}
      <section id="about" className="py-24 px-4 bg-slate-950 relative border-b border-blue-900/30">
        <About />
      </section>

      {/* 3. SERVICES */}
      <section id="services" className="pt-24 pb-12 px-4 bg-slate-950 relative border-b border-blue-900/30">
        <div className="max-w-4xl mx-auto text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-mono text-white flex items-center justify-center gap-3">
               // ARCHITECTURAL_SERVICES
               <Layers className="w-8 h-8 text-cyan-500" />
            </h3>
        </div>
        <Services />
      </section>

      {/* 4. EXPERIENCE (Deployments) */}
      <section id="experience" className="py-24 px-4 bg-slate-950 border-b border-blue-900/30">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-mono text-white flex items-center justify-center gap-3">
               // DEPLOYED_SOLUTIONS
               <Code2 className="w-8 h-8 text-cyan-500" />
            </h3>
            <p className="text-slate-400 mt-4 text-sm font-mono">[ PROVEN IN PRODUCTION ]</p>
        </div>
        <Deployments />
      </section>

      {/* 5. PROJECTS */}
      <section id="projects" className="py-24 px-4 bg-slate-950 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-mono text-white mb-2">// PROJECT_INDEX</h3>
            <p className="text-slate-400 font-mono text-sm">Synchronized from GitHub (Cached)</p>
          </div>
          <ProjectGrid /> 
        </div>
      </section>

      {/* 6. THIS ENVIRONMENT (Site Specs) */}
      <section id="specs" className="py-24 px-4 bg-slate-950 border-b border-blue-900/30">
         <div className="max-w-4xl mx-auto text-center mb-12">
             <h3 className="text-2xl md:text-3xl font-mono text-white flex items-center justify-center gap-3">
               // PORTAL_ARCHITECTURE
               <Terminal className="w-8 h-8 text-cyan-500" />
             </h3>
         </div>
         <SiteSpecs />
      </section>
      
      {/* 7. CONTACT */}
      <section id="contact" className="pt-24 pb-24 px-4 bg-slate-950 relative border-b border-blue-900/30">
         <div className="max-w-4xl mx-auto text-center mb-12">
            <h3 className="text-3xl font-mono text-white mb-4">// SECURE_UPLINK</h3>
            <p className="text-slate-400">Initialize handshake to request collaboration.</p>
         </div>
         <Contact />
      </section>

      <Footer />
    </main>
  )
}
