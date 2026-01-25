'use client'
import { useEffect, useState } from 'react'
import { Clock, ArrowUpRight, AlertCircle, Cpu, Smartphone, Monitor, Globe, PauseCircle, Construction, Map, AppWindow, Command, Box, Layers, Terminal, Sparkles } from 'lucide-react'

interface Repo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string | null
  stargazers_count: number
  topics: string[]
  language: string
  fork: boolean
  updated_at: string
  pushed_at: string
  owner: {
    login: string
  }
}

export default function ProjectGrid() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const query = encodeURIComponent('topic:showcase-b2me fork:true')
    
    fetch(`https://api.github.com/search/repositories?q=${query}&sort=updated&per_page=100`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(data => {
        if (data && Array.isArray(data.items)) {
          // --- SMART SORT LOGIC ---
          const sorted = (data.items as Repo[]).sort((a, b) => {
            const getPriority = (repo: Repo) => {
              const t = repo.topics || []
              if (t.includes('featured-b2me')) return 0 // 1. Featured
              if (t.some(x => ['status-active', 'status-maintain'].includes(x))) return 1 // 2. Active
              if (t.some(x => ['status-wip', 'status-dev'].includes(x))) return 2 // 3. Building
              if (t.includes('status-plan')) return 3 // 4. Planned
              if (t.includes('status-inactive')) return 4 // 5. Inactive
              return 5 // 6. Others
            }

            const priorityA = getPriority(a)
            const priorityB = getPriority(b)

            if (priorityA !== priorityB) return priorityA - priorityB
            
            // Secondary Sort: Newest CODE PUSH first
            return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
          })

          setRepos(sorted)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch repos", err)
        setError(true)
        setLoading(false)
      })
  }, [])

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  // 1. LIFECYCLE BADGE
  const getLifecycleBadge = (topics: string[]) => {
    if (topics.some(t => ['status-active', 'status-maintain'].includes(t))) {
      return (
        <span className="text-green-400 flex items-center gap-2 text-[10px] font-mono border border-green-900/30 bg-green-950/20 px-2 py-1 rounded-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
          </span>
          ACTIVE
        </span>
      )
    }
    if (topics.some(t => ['status-wip', 'status-dev'].includes(t))) {
      return (
        <span className="text-amber-500 flex items-center gap-1.5 text-[10px] font-mono border border-amber-900/30 bg-amber-950/20 px-2 py-1 rounded-sm">
          <Construction className="w-3 h-3" />
          BUILDING
        </span>
      )
    }
    if (topics.includes('status-plan')) {
      return (
        <span className="text-blue-400 flex items-center gap-1.5 text-[10px] font-mono border border-blue-900/30 bg-blue-950/20 px-2 py-1 rounded-sm">
          <Map className="w-3 h-3" />
          PLANNING
        </span>
      )
    }
    if (topics.includes('status-inactive')) {
      return (
        <span className="text-slate-500 flex items-center gap-1.5 text-[10px] font-mono border border-slate-800 bg-slate-900/50 px-2 py-1 rounded-sm">
          <PauseCircle className="w-3 h-3" />
          INACTIVE
        </span>
      )
    }
    return null
  }

  // 2. OS / PLATFORM ICON
  const getOsIcon = (topics: string[]) => {
    if (topics.includes('arch-macos')) return <Command className="w-3 h-3" />
    if (topics.includes('arch-windows')) return <AppWindow className="w-3 h-3" />
    if (topics.some(t => ['arch-linux', 'arch-cli'].includes(t))) return <Terminal className="w-3 h-3" />
    if (topics.some(t => ['arch-ios', 'arch-android', 'arch-mobile'].includes(t))) return <Smartphone className="w-3 h-3" />
    if (topics.includes('arch-web')) return <Globe className="w-3 h-3" />
    if (topics.includes('arch-server')) return <Monitor className="w-3 h-3" />
    if (topics.includes('arch-library')) return <Box className="w-3 h-3" />
    return <Layers className="w-3 h-3" />
  }

  // 3. STRICT FILTER LOGIC
  const shouldHideTag = (t: string) => {
    return (
      t.startsWith('showcase') || 
      t.startsWith('featured') ||
      t.startsWith('status-') || 
      t.startsWith('stage-') || 
      t.startsWith('type-') || 
      t.startsWith('arch-')     
    )
  }

  if (loading) return (
    <div className="border border-dashed border-slate-700 rounded-sm p-12 bg-slate-900/20 text-center animate-pulse max-w-2xl mx-auto">
      <p className="font-mono text-cyan-500 flex items-center justify-center gap-3">
        <Terminal className="w-5 h-5" />
        [ ESTABLISHING_UPLINK... ]
      </p>
    </div>
  )

  if (error) return (
    <div className="border border-red-900/50 bg-red-950/20 p-8 text-center rounded-sm max-w-2xl mx-auto">
      <p className="font-mono text-red-500 flex items-center justify-center gap-2">
        <AlertCircle className="w-5 h-5" />
        ERROR: UPLINK_FAILED. RETRYING_CONNECTION...
      </p>
    </div>
  )

  if (!loading && repos.length === 0) return (
    <div className="text-center py-12 border border-slate-800 rounded-sm bg-slate-900/20">
      <Terminal className="w-8 h-8 text-slate-600 mx-auto mb-4" />
      <p className="text-slate-400 font-mono text-sm">
        // NO_PROJECTS_FOUND<br/>
        <span className="text-slate-600 text-xs mt-2 block">
          Add topic 'showcase-b2me' to your GitHub repositories.
        </span>
      </p>
    </div>
  )

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {repos.map((repo) => {
        const topics = repo.topics || []
        const isFeatured = topics.includes('featured-b2me')
        
        // Calculate visible tags ONCE
        const visibleTags = topics.filter(t => !shouldHideTag(t)).slice(0, 3)

        return (
          <div 
            key={repo.id}
            className={`group relative flex flex-col justify-between w-full max-w-[320px] bg-slate-900/40 backdrop-blur-sm border p-5 rounded-sm transition-all duration-300 ${
              isFeatured 
                ? 'border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.05)]' 
                : 'border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60'
            }`}
          >
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
               <div className="w-12 h-[1px] bg-cyan-900 group-hover:bg-cyan-500 transition-colors"></div>
               <div className="w-[1px] h-3 bg-cyan-900 absolute right-0 top-0 group-hover:bg-cyan-500 transition-colors"></div>
            </div>

            {/* MAIN CLICK TARGET */}
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="absolute inset-0 z-0"
              aria-label={`View ${repo.name} source code on GitHub`}
            >
              <span className="sr-only">View Source</span>
            </a>

            <div>
              <div className="flex justify-between items-start mb-4 relative z-10 pointer-events-none">
                
                {/* 1. LIFECYCLE BADGE */}
                <div className="h-6 flex items-center">
                  {getLifecycleBadge(topics)}
                </div>
                
                {/* 2. VISIT BUTTON */}
                {repo.homepage && (
                  <a 
                    href={repo.homepage}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pointer-events-auto flex items-center gap-1.5 px-2 py-1 bg-blue-900/20 hover:bg-blue-600 border border-blue-800 hover:border-blue-500 rounded-sm text-[10px] font-mono text-blue-200 hover:text-white transition-all z-20"
                  >
                    <span>VISIT</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Title */}
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-lg font-bold text-slate-100 font-mono group-hover:text-green-400 transition-colors truncate">
                  {repo.name}
                </h4>
                {isFeatured && <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />}
              </div>
              
              {/* Owner / Org Name (Always Visible Now) */}
              <p className="text-[10px] font-mono text-slate-600 mb-3 truncate">
                {`// ${repo.owner.login}`}
              </p>
              
              {/* Description */}
              <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 min-h-[3em]">
                {repo.description || "// No description provided."}
              </p>
            </div>

            <div className="flex flex-col">
              
              {/* 3. TAG CLOUD (Collapses completely if empty) */}
              {visibleTags.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-4 relative z-10 pointer-events-none h-6 overflow-hidden">
                  {visibleTags.map(topic => (
                    <span key={topic} className="text-[9px] uppercase tracking-wider font-mono text-cyan-600 bg-cyan-950/30 px-1.5 py-0.5 rounded-sm border border-cyan-900/50">
                      {topic}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="mt-4"></div> /* Spacer to keep alignment even if empty */
              )}

              {/* 4. FOOTER */}
              <div className="flex items-center gap-3 text-slate-500 text-[10px] font-mono pt-3 border-t border-slate-800 mt-2">
                 
                 {/* OS Icon + "CODE" Hover */}
                 <div className="flex items-center gap-2 group-hover:text-cyan-400 transition-colors" title="Platform">
                   {getOsIcon(topics)}
                   <span className="font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">CODE</span>
                 </div>

                 {/* Last Updated (Using Pushed At) */}
                 <div className="flex items-center gap-1 ml-auto text-slate-600">
                   <Clock className="w-3 h-3" />
                   <span>{formatDate(repo.pushed_at)}</span> 
                 </div>
              </div>
            </div>
            
          </div>
        )
      })}
    </div>
  )
}
