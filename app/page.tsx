import Pricing from '@/components/Pricing'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProjectGrid from '@/components/ProjectGrid'
import About from '@/components/About'

// 1. Helper for the Grid Background
const bgStyle = {
  backgroundImage: `url('${process.env.NODE_ENV === 'production' ? '/grid.svg' : '/grid.svg'}')`
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      <Navbar />

      {/* HERO FIX:
         - Removed 'justify-center' (Stops vertical floating)
         - Added 'pt-32 md:pt-48' (Anchors content to the top visual third)
         - Changed h-[90vh] to min-h-[85vh] (Ensures it covers screen but allows scrolling)
      */}
      <section 
        id="hero" 
        style={bgStyle} 
        className="flex flex-col items-center pt-32 md:pt-48 min-h-[85vh] border-b border-blue-900/30 relative"
      >
        <div className="text-center space-y-6 max-w-2xl px-4 z-10">
          <p className="font-mono text-cyan-500 text-sm tracking-widest uppercase animate-pulse">
            SOFTWARE FOR PURPOSE
          </p>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            BTWO.ME
          </h1>
          <p className="text-xl text-slate-400 font-mono border-l-2 border-cyan-500 pl-4 text-left ml-8 md:ml-16">
            Orchestrating technical solutions<br/>
            Embedded  ✱  AI  ✱  Cloud<br/>
          </p>
          
          <div className="pt-8 flex gap-4 justify-center">
             <a href="#projects" className="px-8 py-3 border border-cyan-500 text-cyan-400 font-mono hover:bg-cyan-950/50 transition-all rounded-sm">
              [ VIEW_PROJECTS ]
            </a>
            <a href="#services" className="px-8 py-3 bg-blue-700 hover:bg-blue-600 text-white font-mono rounded-sm transition-all shadow-[0_0_15px_rgba(0,71,171,0.5)]">
              [ VIEW_SERVICES ]
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-4 bg-slate-950 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-mono text-white mb-2">// PROJECTS</h3>
            <p className="text-slate-400 font-mono text-sm">Synchronized from GitHub (Cached)</p>
          </div>
          <ProjectGrid /> 
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-slate-950 relative border-b border-blue-900/30">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-900 to-transparent opacity-50"></div>
        <Pricing />
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-slate-950 relative">
        <About />
      </section>

      <Footer />
    </main>
  )
}
