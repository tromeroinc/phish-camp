import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { familiaUA } from '@/lib/ua';

export async function POST(req: NextRequest) {
  // Defensa en profundidad: aunque el cliente mandara más campos,
  // desestructuramos SOLO el token. Nada más entra al servidor.
  const { token } = await req.json().catch(() => ({ token: null }));
  if (!token) return NextResponse.json({ ok: false }, { status: 400 });

  await supabaseAdmin.from('eventos').insert({
    token,
    tipo: 'submit',
    ua_familia: familiaUA(req.headers.get('user-agent')),
  });

  return NextResponse.json({ ok: true });
}
