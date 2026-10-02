'use client';

import { useState } from 'react';

/*
 * Réplica enfocada de la intranet institucional (barra superior + login).
 * NO clona sidebar, noticias ni fotos reales de funcionarios.
 *
 * REGLA DE ORO intacta: al enviar se transmite SOLO el token.
 * Usuario y contraseña se escriben por realismo pero NUNCA viajan al servidor.
 */
export default function LoginForm({ token }: { token: string }) {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }), // solo el token
    }).catch(() => {});
    window.location.href = '/concientizacion';
  }

  return (
    <div style={S.page}>
      {/* ── Barra superior tipo intranet ─────────────────────── */}
      <div style={S.topbar}>
        <div style={S.brand}>
          <img src="/inc-logo.png" alt="" style={S.logoMini} />
          <span style={S.brandText}>Instituto Nacional del Cáncer</span>
        </div>

        <nav style={S.menu}>
          <span style={S.menuItem}>Sidra ▾</span>
          <span style={S.menuItem}>CET ▾</span>
          <span style={S.menuItem}>Ris</span>
          <span style={S.menuItem}>Synapse</span>
        </nav>

        <form onSubmit={onSubmit} style={S.loginForm}>
          <input
            style={S.input}
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            style={S.input}
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
          <button type="submit" style={S.btnIngresar} disabled={loading}>
            {loading ? '…' : 'Ingresar →'}
          </button>
          <a href="#" onClick={(e) => e.preventDefault()} style={S.btnOlvido}>
            Olvido de clave
          </a>
        </form>
      </div>

      {/* ── Cuerpo sobrio que justifica el reingreso ─────────── */}
      <main style={S.body}>
        <img src="/inc-logo.png" alt="Instituto Nacional del Cáncer" style={S.logoBig} />
        <h1 style={S.h1}>Intranet Institucional</h1>
        <p style={S.lead}>
          Su sesión ha finalizado por inactividad. Por seguridad, ingrese
          nuevamente sus credenciales para continuar.
        </p>
      </main>
    </div>
  );
}

const NARANJO = '#C9610A';
const AZUL = '#2b6cb0';
const VERDE = '#2e9e5b';
const GRIS_BARRA = '#eef1f4';

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#f6f8fa', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' },

  topbar: {
    background: GRIS_BARRA, borderBottom: '1px solid #d9e0e6',
    display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
    padding: '8px 18px',
  },
  brand: { display: 'flex', alignItems: 'center', gap: 8 },
  logoMini: { height: 28, width: 'auto' },
  brandText: { color: NARANJO, fontWeight: 700, fontSize: 15 },

  menu: { display: 'flex', gap: 14, flexWrap: 'wrap' },
  menuItem: { color: AZUL, fontSize: 13, cursor: 'default' },

  loginForm: { display: 'flex', gap: 8, alignItems: 'center', marginLeft: 'auto', flexWrap: 'wrap' },
  input: {
    padding: '6px 10px', fontSize: 13, border: '1px solid #c3ccd4',
    borderRadius: 4, outline: 'none', width: 130,
  },
  btnIngresar: {
    background: VERDE, color: '#fff', border: 'none', borderRadius: 4,
    padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
  },
  btnOlvido: {
    background: AZUL, color: '#fff', textDecoration: 'none', borderRadius: 4,
    padding: '7px 14px', fontSize: 13, fontWeight: 600,
  },

  body: {
    maxWidth: 520, margin: '0 auto', padding: '70px 20px', textAlign: 'center',
  },
  logoBig: { height: 120, width: 'auto', marginBottom: 20 },
  h1: { fontSize: 24, color: '#2b2320', margin: '0 0 10px' },
  lead: { fontSize: 15, color: '#5a6672', lineHeight: 1.6, margin: 0 },
};
