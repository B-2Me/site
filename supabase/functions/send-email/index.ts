// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, message, honey } = await req.json() // <--- 1. Get honey

    // 2. THE BOT CHECK
    // If 'honey' is anything other than an empty string, it's a bot.
    if (honey) {
      console.log(`Bot detected! Trap field filled: ${honey}`)
      
      // Return a FAKE success to fool the bot
      return new Response(JSON.stringify({ success: true, message: "Transmission received" }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    if (!email || !message) {
      throw new Error('Missing required fields: email or message')
    }

    // Send via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        // 1. SEND FROM: Your new verified subdomain
        from: 'btwo.me uplink <system@contact.btwo.me>',
        
        // 2. SEND TO: Your personal Gmail (where you read mail)
        to: ['nate.sd@gmail.com'], 
        
        // 3. REPLY TO: The visitor's email (so hitting Reply works instantly)
        reply_to: email,

        subject: `[BTWO.ME] From: ${email}`,
        html: `
          <h3>Incoming Transmission</h3>
          <p><strong>Source:</strong> ${email}</p>
          <hr />
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
       throw new Error(data.message || 'Failed to send email via Resend')
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("Email Error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-email' \
    --header 'Authorization: Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6ImI4MTI2OWYxLTIxZDgtNGYyZS1iNzE5LWMyMjQwYTg0MGQ5MCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjIwODQ0NjUyODV9.u9rv5dq4NdImMQNuOOGNdUeyxoRSRasjm2RDMPngJD5gj0lDhzPriSBwvrhAEYcDYM1hOOPfGY0YaYKf5EfCIw' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
