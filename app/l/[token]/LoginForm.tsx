'use client';

import { useState } from 'react';

// Portal genérico con estética institucional. A propósito NO clona
// pixel-a-pixel a Google: la enseñanza es "mira el dominio / la URL",
// no "desconfía de una réplica perfecta".
export default function LoginForm({ token }: { token: string }) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // ─────────────────────────────────────────────────────────────
    //  REGLA DE ORO: enviamos SOLO el token. Ni email ni contraseña
    //  viajan al servidor. Los valores existen para el realismo del
    //  formulario, pero jamás se transmiten ni se almacenan.
    // ─────────────────────────────────────────────────────────────
    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    }).catch(() => {});

    window.location.href = '/concientizacion';
  }

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.brand}>
          <div style={S.logo}>INC</div>
          <div>
            <div style={S.org}>Instituto Nacional del Cáncer</div>
            <div style={S.sub}>Portal de acceso institucional</div>
          </div>
        </div>

        <p style={S.notice}>
          Por seguridad, verifica tu sesión para continuar usando el correo
          institucional.
        </p>

        <form onSubmit={onSubmit}>
          <label style={S.label}>Correo institucional</label>
          <input
            style={S.input}
            type="email"
            placeholder="nombre@incancer.cl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label style={S.label}>Contraseña</label>
          <input
            style={S.input}
            type="password"
            placeholder="••••••••"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
          <button style={S.button} type="submit" disabled={loading}>
            {loading ? 'Verificando…' : 'Iniciar sesión'}
          </button>
        </form>

        <div style={S.footer}>© Instituto Nacional del Cáncer · Mesa de Ayuda TI</div>
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center', background: '#eef2f6', padding: 16,
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  },
  card: {
    width: '100%', maxWidth: 380, background: '#fff', borderRadius: 10,
    boxShadow: '0 2px 16px rgba(0,0,0,.08)', padding: 28,
  },
  brand: { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 },
  logo: {
    width: 44, height: 44, borderRadius: 8, background: '#0b5c8a', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, letterSpacing: 1,
  },
  org: { fontWeight: 600, fontSize: 14, color: '#1b2733' },
  sub: { fontSize: 12, color: '#6b7785' },
  notice: { fontSize: 13, color: '#3d4a57', lineHeight: 1.5, marginBottom: 18 },
  label: { display: 'block', fontSize: 12, color: '#556', margin: '10px 0 4px' },
  input: {
    width: '100%', boxSizing: 'border-box', padding: '10px 12px', fontSize: 14,
    border: '1px solid #cfd8e0', borderRadius: 6, outline: 'none',
  },
  button: {
    width: '100%', marginTop: 18, padding: '11px', fontSize: 14, fontWeight: 600,
    color: '#fff', background: '#0b5c8a', border: 'none', borderRadius: 6,
    cursor: 'pointer',
  },
  footer: { marginTop: 20, fontSize: 11, color: '#9aa5b1', textAlign: 'center' },
};
