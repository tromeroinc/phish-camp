'use client';

import { useEffect, useState } from 'react';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScLTHTrinyaELssdBJrT1G4UvqWDxqoFnA20q4lluQaxgKriA/viewform?usp=header';
const SITE_SEGURIDAD = 'https://sites.google.com/incancer.cl/seguridad-tics/inicio';

export default function Concientizacion() {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    document.title = 'Ejercicio de phishing · Instituto Nacional del Cáncer';
    const t = setTimeout(() => setModal(true), 1400); // aparece sola tras leer el aviso
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <header className="cz-header">
        <div className="cz-header-in">
          <img src="/inc-logo.png" alt="Instituto Nacional del Cáncer" className="cz-logo" />
          <div className="cz-wordmark">
            <span className="cz-wm-strong">Instituto Nacional del Cáncer</span>
            <span className="cz-wm-sub">Equipo TICS · Seguridad de la Información</span>
          </div>
          <span className="cz-tag">Ejercicio de seguridad</span>
        </div>
      </header>

      <main className="cz-wrap">
        {/* Alerta principal */}
        <section className="cz-hero">
          <div className="cz-hero-icon"><TriangleIcon /></div>
          <h1 className="cz-h1">¡Caíste en un simulacro de phishing!</h1>
          <p className="cz-lead">
            Si estás viendo esta pantalla, hiciste clic en un enlace de prueba
            enviado por el <strong>equipo TICS</strong> del INC.
          </p>
          <div className="cz-reassure">
            <CheckIcon />
            <span>
              <strong>Tranquilo/a:</strong> tu equipo NO ha sido infectado y tus
              datos están seguros. <strong>No ingresaste ninguna contraseña real</strong>:
              esta página nunca la recibió ni la guardó. Nadie será individualizado
              ni sancionado.
            </span>
          </div>
          <p className="cz-riesgo">
            En un escenario real, este clic podría haber permitido a un atacante
            <strong> robar tus credenciales</strong>, <strong>acceder a datos de
            pacientes</strong> o <strong>infectar la red con ransomware</strong>.
          </p>
        </section>

        {/* ¿Qué es phishing? */}
        <section className="cz-info">
          <h2 className="cz-h2-azul">🔒 ¿Qué es el Phishing?</h2>
          <p className="cz-info-txt">
            El <strong>phishing</strong> (o suplantación de identidad) es una técnica
            de engaño que usan los ciberdelincuentes para obtener información
            confidencial, como contraseñas y datos bancarios.
          </p>
          <p className="cz-info-txt" style={{ margin: 0 }}>
            Los atacantes se hacen pasar por una institución de confianza (el INC, un
            banco o Microsoft) creando una <strong>falsa sensación de urgencia</strong>{' '}
            para que hagas clic antes de pensar.
          </p>
        </section>

        {/* Dos columnas en desktop */}
        <div className="cz-grid2">
          {/* Anatomía del correo */}
          <section className="cz-block">
            <h2 className="cz-h2">Así se veía la trampa</h2>
            <p className="cz-intro">
              El correo que abriste dejaba estas cuatro huellas, las mismas de
              cualquier phishing:
            </p>
            <div className="cz-mail">
              <div className="cz-mail-row"><span className="cz-mail-lbl">De:</span>
                <span className="cz-mail-val">Mesa de Ayuda TICS - INC &lt;soporte-inc@incancr.cl&gt;<Flag n={1} /></span></div>
              <div className="cz-mail-row"><span className="cz-mail-lbl">Asunto:</span>
                <span className="cz-mail-val">Acción requerida: verifica tu cuenta de correo institucional</span></div>
              <div className="cz-mail-body">
                <p style={{ margin: '0 0 12px' }}>Estimado funcionario:</p>
                <p style={{ margin: '0 0 12px' }}>
                  Su buzón institucional alcanzó el <strong>95% de su capacidad</strong>.
                  Verifique su sesión antes de <strong>24 horas</strong>.<Flag n={2} />
                </p>
                <p style={{ margin: '0 0 14px', textAlign: 'center' }}>
                  <span className="cz-fake-btn">Verificar mi cuenta</span><Flag n={3} />
                </p>
                <p style={{ margin: 0, fontSize: 12, color: '#6b7785' }}>
                  Si el botón no funciona, copie este enlace:<br />
                  <span className="cz-fake-link">https://portal.incancr.cl/l/…</span>
                </p>
              </div>
            </div>
            <ol className="cz-legend">
              <li><strong>El remitente oculto.</strong> ¿Verificaste si venía de{' '}
                <code className="cz-code">@incancer.cl</code>? Aquí decía{' '}
                <code className="cz-code">incancr.cl</code> (sin la «e»). Un nombre
                confiable no garantiza que el dominio lo sea.</li>
              <li><strong>La urgencia artificial.</strong> “95% de capacidad”, “antes de
                24 horas”. El miedo busca que actúes sin verificar.</li>
              <li><strong>El enlace trampa.</strong> Al pasar el mouse sobre el botón,
                la dirección no coincidía con la Intranet oficial.</li>
            </ol>
            <p className="cz-legend-extra">
              <strong>Y al entrar:</strong> la página imitaba la Intranet y te pedía
              tu clave. Ningún sistema legítimo te lleva a ingresar tu contraseña
              desde un enlace de correo.
            </p>
          </section>

          {/* Señales + qué hacer */}
          <div className="cz-col">
            <section className="cz-block">
              <h2 className="cz-h2">4 señales para reconocerlo</h2>
              <div className="cz-cards">
                <Card icon={<GlobeIcon />} title="Revisa el remitente">
                  Fíjate en lo que va después de la <b>@</b>. Un dominio parecido pero
                  no idéntico es la señal más común.
                </Card>
                <Card icon={<ClockIcon />} title="Desconfía del apuro">
                  Amenazas de bloqueo o plazos cortos buscan anular tu juicio. Detente.
                </Card>
                <Card icon={<LinkIcon />} title="Mira el enlace real">
                  Posa el cursor sobre el enlace y verifica a dónde lleva antes de
                  hacer clic.
                </Card>
                <Card icon={<KeyIcon />} title="Nunca la contraseña">
                  Tu clave no se pide por correo ni en páginas externas. Si te la
                  piden, es fraude.
                </Card>
              </div>
            </section>

            <section className="cz-block">
              <h2 className="cz-h2">Qué hacer ante un correo sospechoso</h2>
              <div className="cz-steps">
                <Step n={1} title="No hagas clic ni respondas">
                  No abras enlaces ni adjuntos, y no ingreses ninguna credencial.
                </Step>
                <Step n={2} title="Verifica por otro canal">
                  Confirma con el remitente por teléfono o presencialmente.
                </Step>
                <Step n={3} title="Repórtalo">
                  Avisa al equipo TICS. Tu reporte protege al resto de la institución
                  y a los pacientes.
                </Step>
              </div>
            </section>
          </div>
        </div>

        {/* Regla de oro */}
        <section className="cz-rule">
          <ShieldIcon />
          <p style={{ margin: 0 }}>
            <strong>Regla de oro:</strong> un clic en un simulacro es una oportunidad
            de aprender. El mismo clic en un ataque real puede costarle muchísimo a la
            institución y a los pacientes.
          </p>
        </section>
      </main>

      <footer className="cz-footer">
        <div className="cz-footer-txt">Instituto Nacional del Cáncer · Equipo TICS — Seguridad de la Información</div>
        <div className="cz-flag"><span style={{ flex: 1, background: '#0E6BA8' }} /><span style={{ flex: 1, background: '#E5172B' }} /></div>
      </footer>

      {/* Botón flotante para reabrir */}
      <button className="cz-fab" onClick={() => setModal(true)} aria-label="Responder encuesta">
        📝 Responder encuesta
      </button>

      {/* Ventana flotante: encuesta + sitio de seguridad */}
      {modal && (
        <div className="cz-overlay" onClick={() => setModal(false)}>
          <div className="cz-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cz-modal-x" onClick={() => setModal(false)} aria-label="Cerrar">×</button>
            <h2 className="cz-modal-title">Ayúdanos a mejorar</h2>
            <p className="cz-modal-txt">
              Completa esta breve encuesta anónima sobre el ejercicio. Tu
              retroalimentación nos ayuda a fortalecer la seguridad de todos.
            </p>
            <a href={FORM_URL} className="cz-btn-enc" target="_blank" rel="noopener noreferrer">
              Responder encuesta ahora
            </a>
            <a href={SITE_SEGURIDAD} className="cz-btn-site" target="_blank" rel="noopener noreferrer">
              Sitio de Seguridad de la Información →
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Componentes ── */
function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (<div className="cz-card"><div className="cz-card-icon">{icon}</div><div className="cz-card-title">{title}</div><div className="cz-card-txt">{children}</div></div>);
}
function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (<div className="cz-step"><div className="cz-step-n">{n}</div><div><div className="cz-step-title">{title}</div><div className="cz-step-txt">{children}</div></div></div>);
}
function Flag({ n }: { n: number }) { return <span className="cz-flag-badge">{n}</span>; }

/* ── Íconos ── */
const I = { n: '#C9610A', v: '#2e9e5b' };
function TriangleIcon() { return (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>); }
function CheckIcon() { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={I.v} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M20 6 9 17l-5-5" /></svg>); }
function GlobeIcon() { return (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={I.n} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>); }
function ClockIcon() { return (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={I.n} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>); }
function LinkIcon() { return (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={I.n} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>); }
function KeyIcon() { return (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={I.n} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5" /><path d="m21 2-9.6 9.6" /><path d="m15.5 7.5 3 3L22 7l-3-3" /></svg>); }
function ShieldIcon() { return (<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>); }

/* ── Estilos (con media queries responsivas) ── */
const CSS = `
:root{ --nar:#C9610A; --narO:#A44E07; --ambS:#FBF0DA; --crema:#FFFBF4; --tinta:#2B2320; --gris:#626971; --alerta:#E5172B; --azul:#0E6BA8; --verde:#2e9e5b; --linea:#EFE6D7; }
*{box-sizing:border-box;}
body{margin:0;}
.cz-header,.cz-footer,.cz-wrap,.cz-overlay,.cz-fab,.cz-rule,.cz-hero,.cz-info,.cz-block{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;}
.cz-wrap{background:var(--crema);} body{background:var(--crema);color:var(--tinta);}
.cz-header{background:#fff;border-bottom:4px solid var(--nar);}
.cz-header-in{max-width:1080px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
.cz-logo{height:44px;width:auto;}
.cz-wordmark{display:flex;flex-direction:column;line-height:1.2;}
.cz-wm-strong{font-weight:700;font-size:15px;color:var(--gris);}
.cz-wm-sub{font-size:12px;color:var(--nar);font-weight:600;}
.cz-tag{margin-left:auto;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;background:var(--ambS);color:var(--narO);padding:5px 10px;border-radius:999px;}
.cz-wrap{max-width:1080px;margin:0 auto;padding:28px 20px 70px;}

.cz-hero{background:#fff;border:1px solid var(--linea);border-top:4px solid var(--alerta);border-radius:14px;padding:30px 28px 24px;text-align:center;box-shadow:0 2px 14px rgba(0,0,0,.05);}
.cz-hero-icon{width:72px;height:72px;border-radius:50%;background:var(--alerta);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;}
.cz-h1{font-size:28px;margin:0 0 10px;color:var(--alerta);}
.cz-lead{font-size:16px;line-height:1.6;color:var(--tinta);margin:0 auto 18px;max-width:620px;}
.cz-reassure{display:flex;gap:10px;align-items:flex-start;text-align:left;background:#e8f5ee;border:1px solid #cfe8da;border-radius:10px;padding:14px 16px;font-size:14px;line-height:1.6;max-width:620px;margin:0 auto;}
.cz-riesgo{font-size:14px;line-height:1.6;color:var(--gris);max-width:620px;margin:16px auto 0;}

.cz-info{background:#eaf4fb;border:1px solid #cfe5f5;border-left:4px solid var(--azul);border-radius:12px;padding:20px 24px;margin-top:20px;}
.cz-h2-azul{font-size:18px;margin:0 0 10px;color:var(--azul);}
.cz-info-txt{font-size:14.5px;line-height:1.6;color:var(--tinta);margin:0 0 12px;}

.cz-grid2{display:grid;grid-template-columns:1fr;gap:20px;margin-top:20px;}
.cz-col{display:flex;flex-direction:column;gap:20px;}
@media(min-width:900px){ .cz-grid2{grid-template-columns:1fr 1fr;align-items:start;} }

.cz-block{background:#fff;border:1px solid var(--linea);border-radius:14px;padding:24px 28px;}
.cz-h2{font-size:20px;margin:0 0 8px;color:var(--narO);}
.cz-intro{font-size:14.5px;line-height:1.6;color:var(--gris);margin:0 0 18px;}

.cz-mail{border:1px solid var(--linea);border-radius:10px;overflow:hidden;font-size:14px;background:#fff;}
.cz-mail-row{display:flex;gap:8px;padding:10px 14px;border-bottom:1px solid var(--linea);background:#FCFAF6;flex-wrap:wrap;}
.cz-mail-lbl{color:var(--gris);font-weight:600;min-width:54px;}
.cz-mail-val{color:var(--tinta);display:inline-flex;align-items:center;flex-wrap:wrap;gap:4px;}
.cz-mail-body{padding:16px;line-height:1.6;color:var(--tinta);}
.cz-fake-link{color:#1a56c4;text-decoration:underline;word-break:break-all;}
.cz-fake-btn{display:inline-block;background:#0b5c8a;color:#fff;font-size:13px;font-weight:600;padding:9px 20px;border-radius:6px;}
.cz-flag-badge{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:var(--nar);color:#fff;font-size:12px;font-weight:700;margin-left:6px;vertical-align:middle;}
.cz-legend{margin:18px 0 0;padding-left:20px;font-size:14px;line-height:1.7;color:var(--tinta);}
.cz-legend-extra{margin-top:14px;padding:12px 16px;background:var(--ambS);border-radius:8px;font-size:14px;line-height:1.6;color:var(--tinta);}
.cz-code{background:var(--ambS);padding:1px 6px;border-radius:4px;font-size:13px;font-family:ui-monospace,Menlo,monospace;}

.cz-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;}
.cz-card{background:var(--crema);border:1px solid var(--linea);border-radius:12px;padding:16px;}
.cz-card-icon{width:44px;height:44px;border-radius:10px;background:var(--ambS);display:flex;align-items:center;justify-content:center;margin-bottom:10px;}
.cz-card-title{font-weight:700;font-size:15px;margin-bottom:6px;color:var(--tinta);}
.cz-card-txt{font-size:13.5px;line-height:1.55;color:var(--gris);}

.cz-steps{display:flex;flex-direction:column;gap:14px;}
.cz-step{display:flex;gap:14px;align-items:flex-start;}
.cz-step-n{flex-shrink:0;width:34px;height:34px;border-radius:50%;background:var(--nar);color:#fff;font-weight:700;font-size:16px;display:flex;align-items:center;justify-content:center;}
.cz-step-title{font-weight:700;font-size:15px;color:var(--tinta);}
.cz-step-txt{font-size:14px;line-height:1.55;color:var(--gris);margin-top:2px;}

.cz-rule{display:flex;gap:14px;align-items:center;margin-top:20px;background:var(--nar);color:#fff;border-radius:14px;padding:20px 24px;font-size:15px;line-height:1.55;}

.cz-footer{margin-top:8px;}
.cz-footer-txt{text-align:center;font-size:12px;color:var(--gris);padding:20px;}
.cz-flag{display:flex;height:6px;}

/* Botón flotante */
.cz-fab{position:fixed;right:20px;bottom:20px;z-index:9998;background:var(--verde);color:#fff;border:none;border-radius:30px;padding:13px 20px;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25);font-family:inherit;}
.cz-fab:hover{background:#278a4c;}

/* Ventana flotante */
.cz-overlay{position:fixed;inset:0;z-index:9999;background:rgba(20,25,30,.5);display:flex;align-items:center;justify-content:center;padding:16px;}
.cz-modal{position:relative;width:100%;max-width:420px;background:#fff;border-radius:14px;padding:28px 28px 26px;box-shadow:0 14px 44px rgba(0,0,0,.35);text-align:center;border-top:5px solid var(--verde);}
.cz-modal-x{position:absolute;top:10px;right:14px;background:none;border:none;font-size:24px;line-height:1;color:#999;cursor:pointer;}
.cz-modal-title{font-size:21px;margin:4px 0 10px;color:var(--narO);}
.cz-modal-txt{font-size:14px;line-height:1.6;color:var(--gris);margin:0 0 20px;}
.cz-btn-enc{display:block;background:var(--verde);color:#fff;font-weight:700;font-size:15px;text-decoration:none;padding:14px;border-radius:8px;margin-bottom:10px;}
.cz-btn-site{display:block;background:#fff;color:var(--narO);border:1px solid var(--nar);font-weight:700;font-size:14px;text-decoration:none;padding:12px;border-radius:8px;}
`;
