const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to_email, otp_code, user_name } = await req.json()

    const html = `
      <div style="direction:rtl;font-family:Arial;text-align:center;padding:20px;max-width:380px;margin:auto">
        <h2 style="color:#175ab1">דנטל צ'אקיר 🦷</h2>
        <p style="font-size:15px">שלום ${user_name || ''},</p>
        <p style="font-size:15px">קוד האיפוס שלך לסיסמה:</p>
        <div style="font-size:32px;font-weight:bold;direction:ltr;
                    background:#eef9ff;padding:16px;border-radius:12px;
                    margin:16px auto;color:#175ab1;letter-spacing:8px">
          ${otp_code}
        </div>
        <p style="color:#666;font-size:13px">הקוד תקף ל-10 דקות בלבד</p>
        <p style="color:#aaa;font-size:11px">אם לא ביקשת איפוס — התעלם מהודעה זו</p>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "דנטל צ'אקיר <onboarding@resend.dev>",
        to: [to_email],
        subject: "קוד איפוס סיסמה - דנטל צ'אקיר",
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(JSON.stringify(err))
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
