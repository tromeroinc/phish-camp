import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { familiaUA } from '@/lib/ua';

// GIF transparente de 1x1 px.
const PIXEL = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
);

// Se incrusta en el correo como <img src=".../api/track/open?t=TOKEN">.
// Al cargar la imagen, el cliente de correo dispara este GET = "abrió".
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('t');
  if (token) {
    try {
      await supabaseAdmin.from('eventos').insert({
        token,
        tipo: 'open',
        ua_familia: familiaUA(req.headers.get('user-agent')),
      });
    } catch {
      /* token inválido: devolvemos el pixel igual, sin ruido */
    }
  }
  return new Response(PIXEL, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    },
  });
}
