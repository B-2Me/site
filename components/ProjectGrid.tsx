'use client'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

type Repository = {
  id: number
  name: string
  description: string
  url: string
  homepage: string
  topics: string[]
  stars: number
  language: string
  last_updated: string
}

const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('project_cache')
    .select('repo_data')
    .single()

  if (error) throw error
  return data.repo_data as Repository[]
}

export default function ProjectGrid() {
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5,
  })

  // Loading State
  if (isLoading) return (
    <div className="border border-dashed border-slate-700 rounded-sm p-12 bg-slate-900/20 text-center animate-pulse max-w-2xl mx-auto">
      <p className="font-mono text-cyan-500">[ ESTABLISHING_UPLINK... ]</p>
    </div>
  )

  // Error State
  if (isError) return (
    <div className="border border-red-900/50 bg-red-950/20 p-8 text-center rounded-sm max-w-2xl mx-auto">
      <p className="font-mono text-red-500">ERROR: UPLINK_FAILED. RETRYING_CONNECTION...</p>
    </div>
  )

  return (
    // CENTER FIX: Use Flexbox + Flex Wrap + Justify Center
    // This ensures that if there are 2 items, they are centered. 
    // If there are 3, they fill the row.
    <div className="flex flex-wrap justify-center gap-6">
      {projects?.map((repo) => (
        <a 
          key={repo.id} 
          href={repo.homepage || repo.url} 
          target="_blank" 
          rel="noopener noreferrer"
          // Added w-full max-w-[400px] to keep cards uniform size
          className="group relative block w-full max-w-[400px]"
        >
          <div className="absolute inset-0 border border-cyan-900/30 bg-slate-900/80 backdrop-blur-sm transition-all group-hover:border-cyan-500/50 group-hover:bg-slate-900/90"></div>
          
          <div className="absolute top-0 right-0 p-2 opacity-50">
             <div className="w-16 h-[1px] bg-cyan-900 group-hover:bg-cyan-500 transition-colors"></div>
             <div className="w-[1px] h-4 bg-cyan-900 absolute right-0 top-0 group-hover:bg-cyan-500 transition-colors"></div>
          </div>

          <div className="relative p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-mono text-lg font-bold text-cyan-100 group-hover:text-cyan-400 transition-colors">
                {repo.name}
              </h4>
              <span className="text-xs font-mono text-slate-500 border border-slate-800 px-2 py-1 rounded">
                {repo.language || 'TXT'}
              </span>
            </div>

            <p className="text-slate-400 text-sm mb-6 flex-grow font-sans leading-relaxed">
              {repo.description}
            </p>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-500">
              <div className="flex gap-2">
                 {repo.topics.includes('status-active') && (
                   <span className="text-green-500 flex items-center gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                     ACTIVE
                   </span>
                 )}
                 {repo.topics.includes('stage-dev') && (
                   <span className="text-amber-500 flex items-center gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                     DEV
                   </span>
                 )}
              </div>
              <span className="group-hover:text-cyan-400 transition-colors">
                 [ REPO ] &rarr;
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
