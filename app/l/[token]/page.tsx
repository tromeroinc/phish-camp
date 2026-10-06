import { headers } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { familiaUA } from '@/lib/ua';
import Intranet from './Intranet';

export const dynamic = 'force-dynamic';

export default async function Landing({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const ua = (await headers()).get('user-agent');

  // Abrir el enlace ya cuenta como 'click'. Token inválido → silencio.
  try {
    await supabaseAdmin
      .from('eventos')
      .insert({ token, tipo: 'click', ua_familia: familiaUA(ua) });
  } catch {
    /* no delatar el ejercicio */
  }

  return <Intranet token={token} />;
}
