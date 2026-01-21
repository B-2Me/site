// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // 1. Handle CORS (Allow browser to call this function)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 2. Initialize Supabase Client (Admin Mode)
    // We use the Service Role Key to bypass RLS (Row Level Security) so we can WRITE to the DB
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 3. Fetch from GitHub API
    // We require the topic 'showcase-b2me' to filter out random repos
    const githubResponse = await fetch(
      'https://api.github.com/search/repositories?q=topic:showcase-b2me&sort=updated',
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'b2me-portfolio-scraper', // GitHub requires a User-Agent
        },
      }
    )

    if (!githubResponse.ok) {
      throw new Error(`GitHub API Error: ${githubResponse.statusText}`)
    }

    const githubData = await githubResponse.json()
    const repos = githubData.items || []

    // 4. Transform Data (Keep only what we need)
    const sanitizedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      homepage: repo.homepage,
      topics: repo.topics,
      stars: repo.stargazers_count,
      language: repo.language,
      last_updated: repo.updated_at,
    }))

    // 5. Update Database (The Cache)
    // We store the ENTIRE array as a single JSON blob in 'project_cache'
    const { error: dbError } = await supabaseClient
      .from('project_cache')
      .upsert({ 
        id: 1, // We only ever keep 1 row (Single Source of Truth)
        repo_data: sanitizedRepos,
        updated_at: new Date().toISOString()
      })

    if (dbError) throw dbError

    return new Response(
      JSON.stringify({ success: true, count: sanitizedRepos.length, data: sanitizedRepos }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/sync-projects' \
    --header 'Authorization: Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6ImI4MTI2OWYxLTIxZDgtNGYyZS1iNzE5LWMyMjQwYTg0MGQ5MCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjIwODQzNzg0NTJ9.U8j_ag5VqI2S-XV3k5CMMvbrnYB43XzM8zIfvOM3Ttj8JmUG2OC7zjldVpF9KVBRZQ12cF_e8zuxVoqpg4q_jQ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
