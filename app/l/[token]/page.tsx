import { headers } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { familiaUA } from '@/lib/ua';
import LoginForm from './LoginForm';

// Sin caché: cada visita debe registrar su evento.
export const dynamic = 'force-dynamic';

export default async function Landing({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const ua = (await headers()).get('user-agent');

  // El solo hecho de abrir el enlace ya es "hizo clic": lo registramos aquí.
  // Si el token es inválido, no rompemos la fachada — mostramos el login igual.
  try {
    await supabaseAdmin
      .from('eventos')
      .insert({ token, tipo: 'click', ua_familia: familiaUA(ua) });
  } catch {
    /* token desconocido: silencio, para no delatar el ejercicio */
  }

  return <LoginForm token={token} />;
}
