'use client'
import { Terminal, Anchor, Zap, HandHeart } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-24 items-center px-4">
      
      {/* Section 1: The Core Philosophy */}
      <div className="max-w-3xl text-center flex flex-col items-center">
        <h3 className="text-2xl md:text-3xl font-mono text-white mb-12 flex items-center justify-center gap-3">
          // CORE_IDENTITY
          <Terminal className="w-6 h-6 text-cyan-500" />
        </h3>
        
        <div className="space-y-12 text-slate-400 font-sans leading-relaxed text-lg text-left">
          
          {/* Part 1: The Alliance */}
          <div>
            <span className="text-cyan-400 font-mono text-sm block mb-3 tracking-widest flex items-center gap-2">
              <HandHeart className="w-4 h-4" /> [ ALLIANCE: SOFTWARE FOR PURPOSE ]
            </span>
            <p>
              We partner with those who see digital tools as a path to serving humanity.
            </p>
            <p className="mt-4">
              Our purpose is to serve people with a purpose. We architect systems that amplify your intent. While that usually means invisible infrastructure running silently in the background, we also love to build systems meant to be heard.
            </p>
          </div>

          {/* Part 2: The Craft */}
          <div>
            <span className="text-cyan-400 font-mono text-sm block mb-3 tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4" /> [ DISCIPLINE: FROM THE METAL UP ]
            </span>
            <p>
              Our expertise spans from ultra-low power firmware to high-performance cloud deployments. We bridge the gap between embedded devices and the global web.
            </p>
            <p className="mt-4">
               We build for resilience. From microcontrollers to cloud instances, we strip away the hype to create systems designed to endure real-world conditions.
            </p>
          </div>

          {/* Part 3: The Roots */}
          <div>
            <span className="text-cyan-400 font-mono text-sm block mb-3 tracking-widest flex items-center gap-2">
              <Anchor className="w-4 h-4" /> [ PURPOSE: EMPOWERMENT ]
            </span>
            <p>
              We reject the individualization of modern society while championing individual empowerment. We do not need to be independent islands; we rely on our communities for everything.
            </p>
            <p className="mt-4">
              That is why we advocate for open source. We avoid the trap of renting your infrastructure from extracting platforms. Instead, we repurpose and leverage the open tools that already exist to build solutions that empower you without isolating you.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
