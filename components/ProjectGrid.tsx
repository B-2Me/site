'use client'
import { useEffect, useState } from 'react'
import { Clock, Terminal, ArrowUpRight, AlertCircle, Cpu, Smartphone, Monitor, Globe, Archive, Construction, Map, CheckCircle2, Layers } from 'lucide-react'

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
  owner: {
    login: string
  }
}

export default function ProjectGrid() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Search for any public repo with topic 'showcase-b2me'
    const query = encodeURIComponent('topic:showcase-b2me fork:true')
    
    fetch(`https://api.github.com/search/repositories?q=${query}&sort=updated&per_page=100`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(data => {
        if (data && Array.isArray(data.items)) {
          setRepos(data.items)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch repos", err)
        setError(true)
        setLoading(false)
      })
  }, [])

  // Helper: Date Formatter
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  // Helper: Status Mapper
  const getStageBadge = (topics: string[]) => {
    // ACTIVE / LIVE
    if (topics.some(t => t === 'status-active' || t === 'stage-maintaining')) {
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
    // DEVELOPMENT / WIP
    if (topics.some(t => t === 'stage-developing' || t === 'status-dev')) {
      return (
        <span className="text-amber-500 flex items-center gap-1.5 text-[10px] font-mono border border-amber-900/30 bg-amber-950/20 px-2 py-1 rounded-sm">
          <Construction className="w-3 h-3" />
          BUILDING
        </span>
      )
    }
    // PLANNING
    if (topics.some(t => t === 'stage-planning' || t === 'status-plan')) {
      return (
        <span className="text-blue-400 flex items-center gap-1.5 text-[10px] font-mono border border-blue-900/30 bg-blue-950/20 px-2 py-1 rounded-sm">
          <Map className="w-3 h-3" />
          PLANNING
        </span>
      )
    }
    // ARCHIVED
    if (topics.some(t => t === 'stage-deprecated' || t === 'status-archived' || t === 'status-eol')) {
      return (
        <span className="text-slate-500 flex items-center gap-1.5 text-[10px] font-mono border border-slate-800 bg-slate-900/50 px-2 py-1 rounded-sm">
          <Archive className="w-3 h-3" />
          ARCHIVED
        </span>
      )
    }
    
    // Fallback: Default Icon
    return (
      <div className="p-1.5 bg-slate-900 border border-slate-800 rounded-sm group-hover:border-cyan-500/30 transition-colors">
        <Terminal className="w-4 h-4 text-cyan-500" />
      </div>
    )
  }

  // Helper: Platform Icon Mapper
  const getArchIcon = (topics: string[]) => {
    if (topics.some(t => t === 'arch-embedded' || t === 'type-embedded')) return <Cpu className="w-3 h-3" />
    if (topics.some(t => t === 'arch-mobile' || t === 'type-mobile')) return <Smartphone className="w-3 h-3" />
    if (topics.some(t => t === 'arch-web' || t === 'type-web' || t === 'type-client')) return <Globe className="w-3 h-3" />
    if (topics.some(t => t === 'arch-desktop' || t === 'type-desktop' || t === 'type-application')) return <Monitor className="w-3 h-3" />
    if (topics.some(t => t === 'arch-cli' || t === 'type-cli')) return <Terminal className="w-3 h-3" />
    
    return <Layers className="w-3 h-3" />
  }

  // Helper: Strict Filtering
  const shouldHideTag = (t: string) => {
    return (
      t.startsWith('showcase') || 
      t.startsWith('featured') ||
      t.startsWith('status-') ||
      t.startsWith('stage-') ||
      t.startsWith('arch-') ||
      t.startsWith('type-')
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
        // NO_PROJECTS_FOUND :: CHECK_GITHUB_TOPICS<br/>
        <span className="text-slate-600 text-xs mt-2 block">
          Add topic 'showcase-b2me' to your User or Organization repositories.
        </span>
      </p>
    </div>
  )

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {repos.map((repo) => {
        const topics = repo.topics || []

        return (
          <div 
            key={repo.id}
            className="group relative flex flex-col justify-between w-full max-w-[320px] bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-5 rounded-sm hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all duration-300"
          >
            {/* Techy Corner Accents */}
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
              {/* TOP ROW: Status Indicator & Visit Link */}
              <div className="flex justify-between items-start mb-4 relative z-10 pointer-events-none">
                
                {/* 1. STATUS BADGE (Top Left) */}
                <div className="h-6 flex items-center">
                  {getStageBadge(topics)}
                </div>
                
                {/* 2. VISIT BUTTON (Top Right) */}
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

              {/* Title with NEON GREEN hover */}
              <h4 className="text-lg font-bold text-slate-100 font-mono mb-1 group-hover:text-green-400 transition-colors truncate">
                {repo.name}
              </h4>
              
              <p className="text-[10px] font-mono text-slate-600 mb-3 truncate">
                {repo.owner.login !== 'nater0000' ? `// ${repo.owner.login}` : ''}
              </p>
              
              <p className="text-slate-400 text-xs leading-relaxed mb-6 line-clamp-3 h-[3.5em]">
                {repo.description || "// No description provided."}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              
              {/* 3. TAG CLOUD (Strictly Filtered) */}
              {topics.filter(t => !shouldHideTag(t)).length > 0 && (
                <div className="flex flex-wrap gap-2 relative z-10 pointer-events-none h-6 overflow-hidden">
                  {topics
                    .filter(t => !shouldHideTag(t))
                    .slice(0, 3)
                    .map(topic => (
                    <span key={topic} className="text-[9px] uppercase tracking-wider font-mono text-cyan-600 bg-cyan-950/30 px-1.5 py-0.5 rounded-sm border border-cyan-900/50">
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              {/* 4. FOOTER */}
              <div className="flex items-center gap-3 text-slate-500 text-[10px] font-mono pt-3 border-t border-slate-800 mt-auto">
                 
                 {/* Platform Icon + "CODE" Text (Hover Effect) */}
                 <div className="flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                   {getArchIcon(topics)}
                   <span className="font-bold tracking-wider">CODE</span>
                 </div>

                 {/* Last Updated */}
                 <div className="flex items-center gap-1 ml-auto text-slate-600">
                   <Clock className="w-3 h-3" />
                   <span>{formatDate(repo.updated_at)}</span>
                 </div>
              </div>
            </div>
            
          </div>
        )
      })}
    </div>
  )
}
