import { createClient } from '@supabase/supabase-js';

// Cliente SOLO de servidor. Usa la service_role key, que NUNCA debe
// exponerse al navegador (no lleva prefijo NEXT_PUBLIC_).
// Con RLS activo y sin políticas, esta es la única vía que puede escribir.
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
);
