'use client'

export default function Hero() {
  return (
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
      
      <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-8 sm:px-0">
         <a href="#services" className="px-8 py-3 border border-cyan-500 text-cyan-400 font-mono hover:bg-cyan-950/50 transition-all rounded-sm text-center whitespace-nowrap">
          [ SERVICES ]
        </a>
        <a href="#contact" className="px-8 py-3 bg-blue-700 hover:bg-blue-600 text-white font-mono rounded-sm transition-all shadow-[0_0_15px_rgba(0,71,171,0.5)] text-center whitespace-nowrap">
          [ CONTACT ]
        </a>
      </div>
    </div>
  )
}
