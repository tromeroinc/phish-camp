export const metadata = { title: 'Ejercicio de phishing · Instituto Nacional del Cáncer' };

// Enlaces externos (encuesta de retroalimentación + sitio de seguridad)
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScLTHTrinyaELssdBJrT1G4UvqWDxqoFnA20q4lluQaxgKriA/viewform?usp=header';
const SITE_SEGURIDAD = 'https://sites.google.com/incancer.cl/seguridad-tics/inicio';

/* Paleta institucional (extraída del logo oficial del INC) */
const C = {
  naranjo: '#C9610A', naranjoOsc: '#A44E07', ambar: '#E4B34A',
  ambarSuave: '#FBF0DA', crema: '#FFFBF4', tinta: '#2B2320',
  gris: '#626971', alerta: '#E5172B', azul: '#0E6BA8',
  verde: '#2e9e5b', verdeSuave: '#e8f5ee', blanco: '#FFFFFF', linea: '#EFE6D7',
};

export default function Concientizacion() {
  return (
    <div style={S.page}>
      <header style={S.header}>
        <div style={S.headerInner}>
          <img src="/inc-logo.png" alt="Instituto Nacional del Cáncer" style={S.logo} />
          <div style={S.wordmark}>
            <span style={S.wordmarkStrong}>Instituto Nacional del Cáncer</span>
            <span style={S.wordmarkSub}>Equipo TICS · Seguridad de la Información</span>
          </div>
          <span style={S.headerTag}>Ejercicio de seguridad</span>
        </div>
      </header>

      <main style={S.main}>
        {/* ── Alerta principal ───────────────────────────────── */}
        <section style={S.hero}>
          <div style={S.heroIcon}><TriangleIcon /></div>
          <h1 style={S.h1}>¡Caíste en un simulacro de phishing!</h1>
          <p style={S.heroLead}>
            Si estás viendo esta pantalla, hiciste clic en un enlace de prueba
            enviado por el <strong>equipo TICS</strong> del INC.
          </p>
          <div style={S.reassure}>
            <CheckIcon />
            <span>
              <strong>Tranquilo/a:</strong> tu equipo NO ha sido infectado y tus
              datos están seguros. <strong>No ingresaste ninguna contraseña real</strong>:
              esta página nunca la recibió ni la guardó. Esta actividad es
              exclusivamente educativa y nadie será individualizado ni sancionado.
            </span>
          </div>
          <p style={S.heroRiesgo}>
            En un escenario real, este clic podría haber permitido a un atacante
            <strong> robar tus credenciales</strong>, <strong>acceder a datos de
            pacientes</strong> o <strong>infectar la red del instituto con
            ransomware</strong>.
          </p>
        </section>

        {/* ── ¿Qué es el phishing? ───────────────────────────── */}
        <section style={S.infoBox}>
          <h2 style={S.h2azul}>🔒 ¿Qué es el Phishing?</h2>
          <p style={S.infoText}>
            El <strong>phishing</strong> (o suplantación de identidad) es una
            técnica de engaño que usan los ciberdelincuentes para obtener
            información confidencial, como contraseñas y datos bancarios.
          </p>
          <p style={{ ...S.infoText, margin: 0 }}>
            Los atacantes se hacen pasar por una institución de confianza (el INC,
            un banco o Microsoft) en un correo o mensaje, creando una{' '}
            <strong>falsa sensación de urgencia</strong> para que hagas clic en un
            enlace malicioso antes de pensar.
          </p>
        </section>

        {/* ── Anatomía del correo trampa ─────────────────────── */}
        <section style={S.block}>
          <h2 style={S.h2}>Así se veía la trampa</h2>
          <p style={S.blockIntro}>
            El correo que abriste dejaba estas cuatro huellas, las mismas de
            cualquier phishing:
          </p>
          <div style={S.mail}>
            <div style={S.mailRow}>
              <span style={S.mailLabel}>De:</span>
              <span style={S.mailValue}>Mesa de Ayuda TI &lt;soporte-inc@incancr.cl&gt;<Flag n={1} /></span>
            </div>
            <div style={S.mailRow}>
              <span style={S.mailLabel}>Asunto:</span>
              <span style={S.mailValue}>⚠️ Tu buzón será suspendido en 24 horas<Flag n={2} /></span>
            </div>
            <div style={S.mailBody}>
              <p style={{ margin: '0 0 12px' }}>Estimado funcionario:</p>
              <p style={{ margin: '0 0 12px' }}>
                Detectamos un problema con tu cuenta. Para no perder el acceso a tu
                correo, verifica tu sesión de inmediato:
              </p>
              <p style={{ margin: '0 0 12px' }}>
                <span style={S.fakeLink}>https://portal.incancr.cl/verificar-cuenta</span>
                <Flag n={3} />
              </p>
              <p style={{ margin: 0 }}>
                Ingresa tu <strong>correo y contraseña institucional</strong>.<Flag n={4} />
              </p>
            </div>
          </div>
          <ol style={S.legend}>
            <li>
              <strong>El remitente oculto.</strong> ¿Verificaste si venía de una
              dirección terminada en <code style={S.code}>@incancer.cl</code>? Aquí
              decía <code style={S.code}>incancr.cl</code> (sin la «e»). Los
              atacantes usan nombres como “Soporte” desde dominios extraños.
            </li>
            <li>
              <strong>La urgencia artificial.</strong> “24 horas”, “suspensión”,
              “de inmediato”. El miedo es la herramienta principal para que no
              verifiques la información.
            </li>
            <li>
              <strong>El enlace trampa.</strong> Al pasar el mouse sobre el botón
              (sin hacer clic), ¿la dirección coincidía con la Intranet oficial?
              Siempre revisa a dónde te lleva el link antes de entrar.
            </li>
            <li>
              <strong>Te pedía la contraseña.</strong> Ningún sistema legítimo pide
              tu clave por correo ni en una página a la que llegaste desde un enlace.
            </li>
          </ol>
        </section>

        {/* ── Señales rápidas ────────────────────────────────── */}
        <section style={S.block}>
          <h2 style={S.h2}>4 señales para reconocerlo</h2>
          <div style={S.grid}>
            <Card icon={<GlobeIcon />} title="Revisa el remitente">
              Fíjate en lo que va después de la <b>@</b>. Un dominio parecido pero
              no idéntico al institucional es la señal más común.
            </Card>
            <Card icon={<ClockIcon />} title="Desconfía del apuro">
              Amenazas de bloqueo, plazos cortos o premios que vencen buscan anular
              tu juicio. Detente.
            </Card>
            <Card icon={<LinkIcon />} title="Mira el enlace real">
              Posa el cursor sobre el enlace y verifica a dónde lleva antes de hacer
              clic.
            </Card>
            <Card icon={<KeyIcon />} title="Nunca la contraseña">
              Tu clave no se pide por correo ni en páginas externas. Si te la piden,
              es fraude.
            </Card>
          </div>
        </section>

        {/* ── Qué hacer ──────────────────────────────────────── */}
        <section style={S.block}>
          <h2 style={S.h2}>Qué hacer ante un correo sospechoso</h2>
          <div style={S.steps}>
            <Step n={1} title="No hagas clic ni respondas">
              No abras enlaces ni adjuntos, y no ingreses ninguna credencial.
            </Step>
            <Step n={2} title="Verifica por otro canal">
              Confirma con el remitente por teléfono o presencialmente, no
              respondiendo el mismo correo.
            </Step>
            <Step n={3} title="Repórtalo">
              Avisa al equipo TICS / Seguridad de la Información. Tu reporte protege
              al resto de la institución y a los pacientes.
            </Step>
          </div>
        </section>

        {/* ── Regla de oro ───────────────────────────────────── */}
        <section style={S.rule}>
          <ShieldIcon />
          <p style={{ margin: 0 }}>
            <strong>Regla de oro:</strong> un clic en un simulacro es una
            oportunidad de aprender. El mismo clic en un ataque real puede costarle
            muchísimo a la institución y a los pacientes.
          </p>
        </section>

        {/* ── Encuesta + sitio de seguridad ──────────────────── */}
        <section style={S.cta}>
          <h2 style={{ ...S.h2, marginTop: 0 }}>Ayúdanos a mejorar</h2>
          <p style={S.blockIntro}>
            Completa esta breve encuesta anónima sobre el ejercicio. Tu
            retroalimentación nos ayuda a fortalecer la seguridad de todos.
          </p>
          <div style={S.botones}>
            <a href={FORM_URL} style={S.btnEncuesta} target="_blank" rel="noopener noreferrer">
              Responder encuesta ahora
            </a>
            <a href={SITE_SEGURIDAD} style={S.btnSitio} target="_blank" rel="noopener noreferrer">
              Sitio de Seguridad de la Información →
            </a>
          </div>
        </section>
      </main>

      <footer style={S.footer}>
        <div style={S.footerText}>Instituto Nacional del Cáncer · Equipo TICS — Seguridad de la Información</div>
        <div style={S.flag}>
          <span style={{ flex: 1, background: C.azul }} />
          <span style={{ flex: 1, background: C.alerta }} />
        </div>
      </footer>
    </div>
  );
}

/* ── Componentes auxiliares ── */
function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div style={S.card}>
      <div style={S.cardIcon}>{icon}</div>
      <div style={S.cardTitle}>{title}</div>
      <div style={S.cardText}>{children}</div>
    </div>
  );
}
function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div style={S.step}>
      <div style={S.stepNum}>{n}</div>
      <div>
        <div style={S.stepTitle}>{title}</div>
        <div style={S.stepText}>{children}</div>
      </div>
    </div>
  );
}
function Flag({ n }: { n: number }) {
  return <span style={S.flagBadge}>{n}</span>;
}

/* ── Íconos SVG ── */
function TriangleIcon() {
  return (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>);
}
function CheckIcon() {
  return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.verde} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M20 6 9 17l-5-5" /></svg>);
}
function GlobeIcon() {
  return (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.naranjo} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>);
}
function ClockIcon() {
  return (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.naranjo} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>);
}
function LinkIcon() {
  return (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.naranjo} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>);
}
function KeyIcon() {
  return (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.naranjo} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5" /><path d="m21 2-9.6 9.6" /><path d="m15.5 7.5 3 3L22 7l-3-3" /></svg>);
}
function ShieldIcon() {
  return (<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>);
}

/* ── Estilos ── */
const S: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: C.crema, color: C.tinta, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' },
  header: { background: C.blanco, borderBottom: `4px solid ${C.naranjo}` },
  headerInner: { maxWidth: 760, margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' },
  logo: { height: 44, width: 'auto' },
  wordmark: { display: 'flex', flexDirection: 'column', lineHeight: 1.2 },
  wordmarkStrong: { fontWeight: 700, fontSize: 15, color: C.gris },
  wordmarkSub: { fontSize: 12, color: C.naranjo, fontWeight: 600 },
  headerTag: { marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: C.ambarSuave, color: C.naranjoOsc, padding: '5px 10px', borderRadius: 999 },
  main: { maxWidth: 760, margin: '0 auto', padding: '28px 20px 40px' },

  hero: { background: C.blanco, border: `1px solid ${C.linea}`, borderTop: `4px solid ${C.alerta}`, borderRadius: 14, padding: '28px 28px 24px', textAlign: 'center', boxShadow: '0 2px 14px rgba(0,0,0,.05)' },
  heroIcon: { width: 72, height: 72, borderRadius: '50%', background: C.alerta, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' },
  h1: { fontSize: 27, margin: '0 0 10px', color: C.alerta },
  heroLead: { fontSize: 16, lineHeight: 1.6, color: C.tinta, margin: '0 auto 18px', maxWidth: 560 },
  reassure: { display: 'flex', gap: 10, alignItems: 'flex-start', textAlign: 'left', background: C.verdeSuave, border: `1px solid #cfe8da`, borderRadius: 10, padding: '14px 16px', fontSize: 14, lineHeight: 1.6, maxWidth: 560, margin: '0 auto' },
  heroRiesgo: { fontSize: 14, lineHeight: 1.6, color: C.gris, maxWidth: 560, margin: '16px auto 0' },

  infoBox: { background: '#eaf4fb', border: `1px solid #cfe5f5`, borderLeft: `4px solid ${C.azul}`, borderRadius: 12, padding: '20px 24px', marginTop: 20 },
  h2azul: { fontSize: 18, margin: '0 0 10px', color: C.azul },
  infoText: { fontSize: 14.5, lineHeight: 1.6, color: C.tinta, margin: '0 0 12px' },

  block: { background: C.blanco, border: `1px solid ${C.linea}`, borderRadius: 14, padding: '24px 28px', marginTop: 20 },
  h2: { fontSize: 20, margin: '0 0 8px', color: C.naranjoOsc },
  blockIntro: { fontSize: 14.5, lineHeight: 1.6, color: C.gris, margin: '0 0 18px' },

  mail: { border: `1px solid ${C.linea}`, borderRadius: 10, overflow: 'hidden', fontSize: 14, background: '#fff' },
  mailRow: { display: 'flex', gap: 8, padding: '10px 14px', borderBottom: `1px solid ${C.linea}`, background: '#FCFAF6', flexWrap: 'wrap' },
  mailLabel: { color: C.gris, fontWeight: 600, minWidth: 54 },
  mailValue: { color: C.tinta, display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 },
  mailBody: { padding: '16px', lineHeight: 1.6, color: C.tinta },
  fakeLink: { color: '#1a56c4', textDecoration: 'underline', wordBreak: 'break-all' },
  flagBadge: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: C.naranjo, color: '#fff', fontSize: 12, fontWeight: 700, marginLeft: 6, verticalAlign: 'middle' },
  legend: { margin: '18px 0 0', paddingLeft: 20, fontSize: 14, lineHeight: 1.7, color: C.tinta },
  code: { background: C.ambarSuave, padding: '1px 6px', borderRadius: 4, fontSize: 13, fontFamily: 'ui-monospace, Menlo, monospace' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14 },
  card: { background: C.crema, border: `1px solid ${C.linea}`, borderRadius: 12, padding: '18px' },
  cardIcon: { width: 46, height: 46, borderRadius: 10, background: C.ambarSuave, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  cardTitle: { fontWeight: 700, fontSize: 15, marginBottom: 6, color: C.tinta },
  cardText: { fontSize: 13.5, lineHeight: 1.55, color: C.gris },

  steps: { display: 'flex', flexDirection: 'column', gap: 14 },
  step: { display: 'flex', gap: 14, alignItems: 'flex-start' },
  stepNum: { flexShrink: 0, width: 34, height: 34, borderRadius: '50%', background: C.naranjo, color: '#fff', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  stepTitle: { fontWeight: 700, fontSize: 15, color: C.tinta },
  stepText: { fontSize: 14, lineHeight: 1.55, color: C.gris, marginTop: 2 },

  rule: { display: 'flex', gap: 14, alignItems: 'center', marginTop: 20, background: C.naranjo, color: '#fff', borderRadius: 14, padding: '20px 24px', fontSize: 15, lineHeight: 1.55 },

  cta: { marginTop: 20, background: C.ambarSuave, border: `1px solid ${C.linea}`, borderRadius: 14, padding: '24px 28px', textAlign: 'center' },
  botones: { display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 },
  btnEncuesta: { display: 'inline-block', background: C.verde, color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', padding: '13px 24px', borderRadius: 8 },
  btnSitio: { display: 'inline-block', background: '#fff', color: C.naranjoOsc, border: `1px solid ${C.naranjo}`, fontWeight: 700, fontSize: 15, textDecoration: 'none', padding: '13px 24px', borderRadius: 8 },

  footer: { marginTop: 8 },
  footerText: { textAlign: 'center', fontSize: 12, color: C.gris, padding: '20px' },
  flag: { display: 'flex', height: 6 },
};
