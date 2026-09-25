export const metadata = { title: 'Simulacro de phishing · INC' };

export default function Concientizacion() {
  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.badge}>Ejercicio de seguridad</div>
        <h1 style={S.h1}>Esto fue un simulacro de phishing</h1>
        <p style={S.lead}>
          El correo que abriste lo envió el equipo de Seguridad de la Información
          del INC como parte de un ejercicio interno. <strong>No ingresaste ninguna
          contraseña real</strong>: este portal nunca la recibió ni la guardó.
          Nadie será individualizado ni sancionado. El objetivo es aprender a
          reconocer estos intentos.
        </p>

        <h2 style={S.h2}>Señales que delataban el engaño</h2>
        <ul style={S.list}>
          <li>Urgencia artificial: “verifica tu sesión para continuar”.</li>
          <li>Un enlace que llevaba a una dirección web que no es la oficial.</li>
          <li>Se pedía la contraseña en una página fuera de los sistemas habituales.</li>
          <li>El remitente no correspondía exactamente al dominio institucional.</li>
        </ul>

        <h2 style={S.h2}>Qué hacer ante un correo sospechoso</h2>
        <ul style={S.list}>
          <li>No hagas clic ni ingreses credenciales.</li>
          <li>Revisa la dirección real del enlace antes de abrirlo.</li>
          <li>Repórtalo a la Mesa de Ayuda TI / Seguridad de la Información.</li>
          <li>Ante la duda, verifica por un canal aparte (teléfono, presencial).</li>
        </ul>

        <p style={S.foot}>
          Gracias por participar. Un clic en un simulacro es una oportunidad de
          aprender; un clic en un ataque real puede costarle mucho a la institución.
        </p>
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh', background: '#f4f7fa', padding: '32px 16px',
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    display: 'flex', justifyContent: 'center',
  },
  card: {
    maxWidth: 680, background: '#fff', borderRadius: 12, padding: '32px 36px',
    boxShadow: '0 2px 16px rgba(0,0,0,.07)',
  },
  badge: {
    display: 'inline-block', fontSize: 12, fontWeight: 700, letterSpacing: .5,
    color: '#0b5c8a', background: '#e2eef6', padding: '4px 10px',
    borderRadius: 999, marginBottom: 14,
  },
  h1: { fontSize: 24, color: '#16222e', margin: '0 0 12px' },
  lead: { fontSize: 15, color: '#3d4a57', lineHeight: 1.6 },
  h2: { fontSize: 16, color: '#16222e', margin: '24px 0 8px' },
  list: { fontSize: 14, color: '#3d4a57', lineHeight: 1.8, paddingLeft: 20, margin: 0 },
  foot: {
    fontSize: 13, color: '#556', lineHeight: 1.6, marginTop: 24,
    paddingTop: 16, borderTop: '1px solid #eef2f6',
  },
};
