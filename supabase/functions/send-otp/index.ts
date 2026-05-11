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

    const html = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;direction:rtl">
  <table width="100%" cellpadding="0" cellspacing="0" dir="rtl" style="direction:rtl">
    <tr><td align="center">
      <table width="400" cellpadding="24" cellspacing="0" dir="rtl"
        style="direction:rtl;font-family:Arial,sans-serif;background:#fff;border-radius:16px;margin:20px auto">
        <tr><td dir="rtl" style="direction:rtl;text-align:center">
          <h2 style="color:#175ab1;margin:0 0 16px">&#x05D3;&#x05E0;&#x05D8;&#x05DC; &#x05E6;'&#x05D0;&#x05E7;&#x05D9;&#x05E8; &#x1F9B7;</h2>
          <p dir="rtl" style="direction:rtl;text-align:right;font-size:15px;margin:8px 0">&#x05E9;&#x05DC;&#x05D5;&#x05DD; ${user_name || ''},</p>
          <p dir="rtl" style="direction:rtl;text-align:right;font-size:15px;margin:8px 0">&#x05E7;&#x05D5;&#x05D3; &#x05D4;&#x05D0;&#x05D9;&#x05E4;&#x05D5;&#x05E1; &#x05E9;&#x05DC;&#x05DA; &#x05DC;&#x05E1;&#x05D9;&#x05E1;&#x05DE;&#x05D0;&#x05D4;:</p>
          <div dir="ltr" style="direction:ltr;font-size:36px;font-weight:bold;text-align:center;
              background:#eef9ff;padding:16px;border-radius:12px;
              margin:16px auto;color:#175ab1;letter-spacing:10px">
            ${otp_code}
          </div>
          <p dir="rtl" style="direction:rtl;text-align:right;color:#666;font-size:13px;margin:8px 0">&#x05D4;&#x05E7;&#x05D5;&#x05D3; &#x05EA;&#x05E7;&#x05E3; &#x05DC;-10 &#x05D3;&#x05E7;&#x05D5;&#x05EA; &#x05D1;&#x05DC;&#x05D1;&#x05D3;</p>
          <p dir="rtl" style="direction:rtl;text-align:right;color:#aaa;font-size:11px;margin:8px 0">&#x05D0;&#x05DD; &#x05DC;&#x05D0; &#x05D1;&#x05D9;&#x05E7;&#x05E9;&#x05EA; &#x05D0;&#x05D9;&#x05E4;&#x05D5;&#x05E1; &#x2014; &#x05D4;&#x05EA;&#x05E2;&#x05DC;&#x05DD; &#x05DE;&#x05D4;&#x05D5;&#x05D3;&#x05E2;&#x05D4; &#x05D6;&#x05D5;</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

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
