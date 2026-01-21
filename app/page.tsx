import Pricing from '@/components/Pricing'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const bgStyle = {
  backgroundImage: `url('${process.env.NODE_ENV === 'production' ? '/site/grid.svg' : '/grid.svg'}')`
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      <Navbar />

      {/* Hero Section */}
      <section id="about" style={bgStyle} className="flex flex-col items-center justify-center h-[90vh] border-b border-blue-900/30 relative">
        <div className="text-center space-y-6 max-w-2xl px-4 z-10">
          <p className="font-mono text-cyan-500 text-sm tracking-widest uppercase animate-pulse">
            System Status: Online
          </p>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            THE ARCHITECT
          </h1>
          <p className="text-xl text-slate-400 font-mono border-l-2 border-cyan-500 pl-4 text-left ml-8 md:ml-16">
            // Designing digital infrastructures<br/>
            // for the decentralized web.
          </p>
          
          <div className="pt-8 flex gap-4 justify-center">
             <a href="#schematics" className="px-8 py-3 border border-cyan-500 text-cyan-400 font-mono hover:bg-cyan-950/50 transition-all rounded-sm">
              [ VIEW_SCHEMATICS ]
            </a>
            <a href="#services" className="px-8 py-3 bg-blue-700 hover:bg-blue-600 text-white font-mono rounded-sm transition-all shadow-[0_0_15px_rgba(0,71,171,0.5)]">
              INITIATE_PROTOCOL
            </a>
          </div>
        </div>
      </section>

      {/* Schematics (Projects) Placeholder - We will build the real grid later */}
      <section id="schematics" className="py-24 px-4 bg-slate-950 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-mono text-white mb-8">// PROJECT_SCHEMATICS</h3>
          <div className="border border-dashed border-slate-700 rounded-sm p-12 bg-slate-900/20">
            <p className="font-mono text-slate-500">
              [ AWAITING_DATABASE_CONNECTION ]<br/>
              Loading blueprints from GitHub API...
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-slate-950 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-900 to-transparent opacity-50"></div>
        <Pricing />
      </section>

      <Footer />
    </main>
  )
}
