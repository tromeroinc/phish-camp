'use client';

import { useState } from 'react';

/*
 * Landing de la campaña: réplica de la intranet INC como fondo + modal
 * flotante "sesión expirada" que obliga a reingresar credenciales.
 *
 * REGLA DE ORO: al enviar se transmite SOLO el token. Usuario y contraseña
 * se escriben por realismo pero NUNCA viajan al servidor ni se almacenan.
 */
export default function Intranet({ token }: { token: string }) {
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
    <>
      {/* Estilos y librerías de la intranet original */}
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/css/simple-line-icons.min.css"
      />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Fondo: intranet (estático, no interactivo — el modal bloquea) */}
      <div
        style={{ fontFamily: "'Open Sans', sans-serif", filter: 'blur(1px)' }}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: BODY }}
      />

      {/* Modal flotante obligatorio */}
      <div style={M.overlay}>
        <div style={M.card}>
          <div style={M.head}>
            <img src="/inc-logo.png" alt="" style={M.logo} />
            <div>
              <div style={M.org}>Instituto Nacional del Cáncer</div>
              <div style={M.sub}>Portal de autenticación</div>
            </div>
          </div>

          <div style={M.lockRow}>
            <i className="fa fa-lock" style={{ color: '#E35710', fontSize: 18 }} />
            <strong>Tu sesión ha expirado</strong>
          </div>
          <p style={M.msg}>
            Por seguridad, vuelve a ingresar tus credenciales institucionales
            para continuar navegando en la Intranet.
          </p>

          <form onSubmit={onSubmit}>
            <label style={M.label}>Usuario</label>
            <input
              style={M.input}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="usuario"
              autoComplete="off"
              required
            />
            <label style={M.label}>Contraseña</label>
            <input
              style={M.input}
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="••••••••"
              autoComplete="off"
              required
            />
            <button type="submit" style={M.btn} disabled={loading}>
              {loading ? 'Verificando…' : 'Ingresar'}
            </button>
          </form>

          <div style={M.foot}>
            © Instituto Nacional del Cáncer · Unidad de Informática
          </div>
          <div style={M.flag}>
            <span style={{ flex: 1, background: '#0E6BA8' }} />
            <span style={{ flex: 1, background: '#E5172B' }} />
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Estilos del modal ── */
const M: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 100000,
    background: 'rgba(20,25,30,.55)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 16, fontFamily: "'Open Sans', system-ui, sans-serif",
  },
  card: {
    width: '100%', maxWidth: 390, background: '#fff', borderRadius: 10,
    boxShadow: '0 12px 40px rgba(0,0,0,.35)', overflow: 'hidden',
    padding: '26px 28px 0',
  },
  head: { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 },
  logo: { height: 42, width: 'auto' },
  org: { fontWeight: 700, fontSize: 14, color: '#333' },
  sub: { fontSize: 12, color: '#E35710', fontWeight: 600 },
  lockRow: { display: 'flex', gap: 8, alignItems: 'center', fontSize: 15, color: '#1a1a1a', marginBottom: 6 },
  msg: { fontSize: 13, color: '#555', lineHeight: 1.6, margin: '0 0 16px' },
  label: { display: 'block', fontSize: 12, color: '#666', margin: '10px 0 4px', fontWeight: 600 },
  input: {
    width: '100%', boxSizing: 'border-box', padding: '10px 12px', fontSize: 14,
    border: '1px solid #cfd8e0', borderRadius: 25, outline: 'none',
  },
  btn: {
    width: '100%', marginTop: 18, padding: '11px', fontSize: 14, fontWeight: 700,
    color: '#fff', background: '#35aa47', border: 'none', borderRadius: 25,
    cursor: 'pointer',
  },
  foot: { marginTop: 20, fontSize: 11, color: '#9aa5b1', textAlign: 'center' },
  flag: { display: 'flex', height: 5, margin: '14px -28px 0' },
};

/* ── CSS de la intranet original (tema INC) ── */
const CSS = `
* { box-sizing: border-box; }
.incbg { font-family:'Open Sans',sans-serif; font-size:13px; color:#333; background:#fff; }
.page-header.navbar { background:#e1e1e1; height:46px; min-height:46px; margin:0; padding:0; border:0; border-radius:0; width:100%; position:fixed; top:0; left:0; z-index:9995; box-shadow:0 1px 3px rgba(0,0,0,.1); }
.page-header.navbar .page-header-inner { display:flex; align-items:center; justify-content:space-between; height:46px; width:100%; padding:0 15px; }
.page-header.navbar .page-logo { display:flex; align-items:center; height:46px; padding-left:5px; }
.titulo1 { color:#E35710; font-weight:700; font-size:18px; letter-spacing:-.3px; white-space:nowrap; }
.top-menu .navbar-nav { margin:0; padding:0; list-style:none; display:flex; align-items:center; }
.top-menu .navbar-nav > li { height:46px; display:flex; align-items:center; padding:0 4px; }
.top-menu .navbar-nav > li > a.dropdown-toggle { color:#E35710; padding:10px; height:46px; display:flex; align-items:center; font-size:13px; font-weight:600; text-decoration:none; background:transparent; }
.top-menu .navbar-nav > li > a.dropdown-toggle > i { color:#E35710; font-size:17px; }
.input-icon { position:relative; }
.input-icon > i { color:#999; position:absolute; margin:8px 2px 4px 10px; z-index:3; width:16px; font-size:14px; text-align:center; }
.input-icon > input.form-control { padding-left:30px; height:28px; font-size:12px; }
.form-control.input-circle { border-radius:25px !important; border:1px solid #ccc; width:130px; }
.btn-circle { border-radius:25px !important; padding:4px 12px; font-size:12px; font-weight:600; }
.btn.green { color:#fff; background:#35aa47; border:1px solid #35aa47; }
.btn.blue { color:#fff; background:#4b8df8; border:1px solid #4b8df8; }
.page-container { margin-top:46px; padding:0; position:relative; display:flex; min-height:calc(100vh - 46px - 40px); }
.page-sidebar-wrapper { width:225px; flex-shrink:0; background:#f6f6f6; border-right:1px solid #e7e7e7; }
.page-sidebar { width:225px; background:#f6f6f6; }
.page-sidebar-menu { list-style:none; margin:0; padding:0; }
.page-sidebar-menu > li { display:block; margin:0; padding:0; border:0; }
.page-sidebar-menu > li.heading { padding:10px 15px 5px; }
.page-sidebar-menu > li.heading > h3 { margin:0; padding:0; font-size:12px; font-weight:bold; color:#1a1a1a; text-transform:uppercase; }
.page-sidebar-menu > li.heading .logo-sidebar { max-width:100%; height:auto; display:block; margin:5px auto 10px; border-radius:4px; }
.page-sidebar-menu > li > a { display:block; position:relative; margin:0; border:0; padding:9px 15px; text-decoration:none; font-size:13px; font-weight:400; color:#555; border-top:1px solid #eee; }
.page-sidebar-menu > li > a > i { color:#E35710; font-size:15px; margin-right:8px; width:16px; text-align:center; }
.page-sidebar-menu > li > a > .arrow { float:right; margin-top:2px; font-size:12px; }
.page-sidebar-menu > li.active > a { background:#E35710 !important; border-top-color:transparent; color:#fff !important; font-weight:600; }
.page-sidebar-menu > li.active > a > i { color:#fff !important; }
.page-sidebar-menu > li._noprincipal > a { color:#1a1a1a; font-weight:bold !important; font-size:13px !important; background:#b3a6a62b; }
.page-sidebar-menu > li._noprincipal2 > a { color:#1a1a1a; font-weight:bold !important; font-size:13px !important; }
.sub-menu { list-style:none; padding:0; margin:0; background:#f1f1f1; display:none; }
.page-sidebar-menu > li.open > .sub-menu { display:block; }
.sub-menu > li > a { display:block; padding:7px 15px 7px 30px; color:#555; text-decoration:none; font-size:12px; border-top:1px solid #e8e8e8; }
.sub-menu > li > a > i { color:#E35710; font-size:12px; margin-right:6px; }
.page-content-wrapper { flex-grow:1; background:#fff; min-width:0; }
.page-content { padding:20px 25px; }
.dashboard-stat { display:block; margin-bottom:25px; overflow:hidden; border-radius:4px; box-shadow:0 1px 3px rgba(0,0,0,.15); position:relative; }
.dashboard-stat .visual { width:80px; height:80px; display:block; float:left; padding-top:10px; padding-left:15px; margin-bottom:15px; font-size:35px; line-height:35px; }
.dashboard-stat .visual > i { margin-left:-30px; font-size:100px; line-height:100px; color:rgba(255,255,255,.16) !important; }
.dashboard-stat .details { position:absolute; right:15px; padding-right:15px; text-align:right; }
.dashboard-stat .details .number { padding-top:15px; text-align:right; font-size:30px; line-height:32px; letter-spacing:-1px; margin-bottom:0; font-weight:600; color:#fff !important; }
.dashboard-stat .details .desc { text-align:right; font-size:15px; font-weight:300; color:#fff !important; }
.dashboard-stat .more { clear:both; display:block; padding:10px 15px; position:relative; text-transform:uppercase; font-weight:400; font-size:12px; color:#fff !important; background:rgba(0,0,0,.12); text-decoration:none; }
.dashboard-stat .more > i { display:inline-block; margin-top:2px; float:right; }
.section-header { text-align:center; margin-bottom:20px; margin-top:5px; }
.section-header h3 { margin:0; font-size:22px; font-weight:bold; }
.section-header h3 a { color:#222; text-decoration:none; }
.section-header h3 i { color:#E35710; margin-right:6px; }
.news-blocks { padding:14px; margin-bottom:16px; background:#faf6ea; border-top:solid 3px #f5eed3; border-radius:3px; box-shadow:0 1px 2px rgba(0,0,0,.05); position:relative; }
.news-blocks h3 { margin:0 0 6px; font-size:18px; line-height:24px; font-weight:600; width:72%; }
.news-blocks h3 a { color:#1a1a1a; text-decoration:none; }
.news-blocks .news-block-tags { margin-bottom:10px; color:#777; font-size:12px; width:72%; }
.news-blocks img.news-block-img { width:25%; height:130px; object-fit:cover; border-radius:4px; box-shadow:0 1px 3px rgba(0,0,0,.15); margin-top:-45px; float:right; border:2px solid #fff; }
.news-blocks p { overflow:hidden; font-size:13px; line-height:1.5; color:#444; margin-bottom:8px; clear:left; }
.news-blocks a.news-block-btn { color:#111; display:block; font-size:13px; font-weight:600; text-align:right; text-decoration:none; padding-top:5px; }
.btn-contacto-intranet { background:#de370f; color:#fff; font-weight:bold; font-size:13px; padding:10px; text-align:center; border-radius:4px; margin:10px 0 25px; box-shadow:0 2px 4px rgba(222,55,15,.3); }
.informativo-card { background:#fff; border:1px solid #e2e2e2; border-radius:4px; margin-bottom:22px; box-shadow:0 1px 4px rgba(0,0,0,.08); overflow:hidden; }
.informativo-badge { background:#e7505a; color:#fff; font-size:12px; font-weight:600; padding:4px 10px; border-radius:3px; display:inline-block; margin-bottom:8px; }
.document-preview-frame { width:100%; height:380px; background:#fbfbfb; border-top:1px solid #eee; border-bottom:1px solid #eee; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px; text-align:center; position:relative; }
.document-preview-sheet { background:#fff; width:85%; height:90%; box-shadow:0 3px 10px rgba(0,0,0,.15); border:1px solid #e0e0e0; border-radius:2px; padding:25px; display:flex; flex-direction:column; justify-content:space-between; text-align:left; }
.ver_mas_informativo { display:block; padding:10px 15px; font-weight:bold; font-size:14px; color:#4990cc; text-decoration:none; background:#fcfcfc; }
.divsiguenos { border:1px solid transparent; background:#ff9933; background-image:linear-gradient(180deg,#ff9933 0%,rgba(255,196,178,.4) 100%); border-radius:6px; padding:15px; margin-bottom:20px; box-shadow:0 2px 5px rgba(255,153,51,.25); }
.btnsiguenos { color:#fff !important; border-color:rgba(10,10,10,.2) !important; border-radius:50% !important; border:1px solid; width:44px; height:44px; display:inline-flex !important; align-items:center; justify-content:center; box-shadow:0 3px 6px rgba(0,0,0,.3); font-size:20px; margin:0 4px; text-decoration:none; }
.divcumple { background:#f7f7f7; border-radius:6px; min-height:82px; position:relative; background-size:cover; background-position:center; margin-bottom:20px; box-shadow:0 2px 5px rgba(0,0,0,.1); border:1px solid #e5e5e5; display:flex; align-items:center; justify-content:space-around; padding:10px; }
.humanizacion-btn { background:rgba(255,255,255,.9); border:1px solid #ff9933; padding:8px 14px; border-radius:20px; font-size:12px; font-weight:bold; color:#d85700; text-decoration:none; box-shadow:0 2px 4px rgba(0,0,0,.1); }
.alert-info-institucional { background:#d9edf7; border:1px solid #bce8f1; color:#31708f; text-align:center; padding:10px; border-radius:4px; margin:10px 0 25px; font-size:13px; }
.page-footer { background:#333; color:#fff; padding:12px 20px; display:flex; justify-content:space-between; align-items:center; font-size:12px; }
.page-footer a { color:#E35710; text-decoration:none; font-weight:600; }
.scroll-to-top { width:28px; height:28px; background:#E35710; display:flex; align-items:center; justify-content:center; border-radius:3px; color:#fff; }
`;

/* ── Cuerpo de la intranet (fondo visual). Logo → /inc-logo.png ── */
const BODY = `
<div class="incbg">
<div class="page-header navbar navbar-fixed-top">
  <div class="page-header-inner">
    <div class="page-logo"><span class="titulo1">Instituto Nacional del Cáncer</span></div>
    <div class="top-menu">
      <ul class="nav navbar-nav">
        <li><a class="dropdown-toggle" href="#"><i class="icon-home"></i></a></li>
        <li><a class="dropdown-toggle" href="#"><i class="icon-envelope-open"></i></a></li>
        <li><a href="#" class="dropdown-toggle">Sidra <span class="caret"></span></a></li>
        <li><a href="#" class="dropdown-toggle">CET <span class="caret"></span></a></li>
        <li><a class="dropdown-toggle" href="#">Ris</a></li>
        <li style="margin-right:15px;"><a class="dropdown-toggle" href="#">Synapse</a></li>
        <li><div class="input-icon"><i class="fa fa-user"></i><input class="form-control input-circle" type="text" placeholder="Usuario" readonly/></div></li>
        <li style="margin-left:6px;"><div class="input-icon"><i class="fa fa-lock"></i><input class="form-control input-circle" type="password" placeholder="Contraseña" readonly/></div></li>
        <li style="margin-left:6px;"><span class="btn btn-circle green">Ingresar <i class="fa fa-arrow-right"></i></span></li>
        <li style="margin-left:4px;"><span class="btn btn-circle blue">Olvido de clave</span></li>
      </ul>
    </div>
  </div>
</div>
<div class="page-container">
  <div class="page-sidebar-wrapper"><div class="page-sidebar"><ul class="page-sidebar-menu">
    <li class="heading" style="text-align:center;padding-top:15px;">
      <a href="#"><img class="logo-sidebar" src="/inc-logo.png" alt="INC" style="max-width:150px;"></a>
    </li>
    <li class="active"><a href="#"><i class="icon-home"></i><span class="title">Inicio</span></a></li>
    <li class="heading"><h3><strong>¿Quiénes Somos?</strong></h3></li>
    <li class="_noprincipal"><a href="#"><i class="fa fa-book"></i><span class="title">Mis Módulos</span></a></li>
    <li class="_noprincipal2"><a href="#"><i class="fa fa-wrench" style="color:#E35710;"></i><span class="title">Soporte TIC</span></a></li>
    <li class="heading"><h3><strong>Información general INC</strong></h3></li>
    <li><a href="#"><i class="fa fa-phone-square"></i><span class="title">Anexos</span><span class="arrow fa fa-chevron-right"></span></a></li>
    <li><a href="#"><i class="fa fa-envelope"></i><span class="title">Correos electrónicos</span><span class="arrow fa fa-chevron-right"></span></a></li>
    <li><a href="#"><i class="fa fa-server" style="color:#E35710;"></i><span class="title"><strong>Estado Servicios Incancer</strong></span></a></li>
    <li class="heading"><h3><strong>Sitios web institucionales</strong></h3></li>
    <li><a style="color:#fff !important;background:rgb(137,184,192) !important;" href="#"><i class="fa fa-cogs" style="color:rgb(251,200,93);"></i><span class="title" style="color:#1a1a1a;font-weight:bold;">Site GRD</span></a></li>
    <li><a href="#"><i class="fa fa-search"></i><span class="title">Site CR Investigación</span></a></li>
    <li><a href="#"><i class="fa fa-shield"></i><span class="title">Site Seguridad de la Información</span></a></li>
    <li><a href="#"><i class="fa fa-google"></i><span class="title">Site Google</span><span class="arrow fa fa-chevron-right"></span></a></li>
    <li><a href="#"><i class="fa fa-users" style="color:#E35710;"></i><span class="title"><strong>Reuniones Clínicas</strong></span></a></li>
    <li><a href="#"><i class="fa fa-exclamation-triangle" style="color:#E35710;"></i><span class="title"><strong>Reporte de Riesgos Institucionales</strong></span></a></li>
    <li><a href="#"><i class="fa fa-bar-chart" style="color:#E35710;"></i><span class="title"><strong>Reportería</strong></span><span class="arrow fa fa-chevron-right"></span></a></li>
    <li><a href="#"><i class="fa fa-graduation-cap" style="color:#E35710;"></i><span class="title"><strong>Capacitaciones INC</strong></span><span class="arrow fa fa-chevron-right"></span></a></li>
    <li class="open"><a href="#"><i class="fa fa-file-text-o" style="color:#E35710;"></i><span class="title"><strong>Formularios y solicitudes</strong></span><span class="arrow fa fa-chevron-right"></span></a>
      <ul class="sub-menu" style="display:block;">
        <li><a href="#"><i class="icon-users"></i> Recursos Humanos</a></li>
        <li><a href="#"><i class="fa fa-clock-o"></i> Reserva Auditorium</a></li>
        <li><a href="#"><i class="fa fa-calendar"></i> Reserva Salas [Nuevo]</a></li>
        <li><a href="#"><i class="fa fa-laptop"></i> Solicitud cuentas INTRANET [Nuevo]</a></li>
      </ul>
    </li>
    <li><a href="#"><i class="fa fa-folder-open-o" style="color:#E35710;"></i><span class="title"><strong>Instructivos generales</strong></span><span class="arrow fa fa-chevron-right"></span></a></li>
    <li><a href="#"><i class="fa fa-external-link" style="color:#E35710;"></i><span class="title"><strong>Links externos</strong></span><span class="arrow fa fa-chevron-right"></span></a></li>
  </ul></div></div>
  <div class="page-content-wrapper"><div class="page-content">
    <div class="row">
      <div class="col-md-4 col-sm-6"><div class="dashboard-stat" style="background:#376d8f;"><a href="#"><div class="visual"><i class="fa fa-cutlery"></i></div><div class="details"><div class="number">Casino</div><div class="desc">Menú</div></div></a><a class="more" href="#">Ver <i class="fa fa-arrow-circle-right"></i></a></div></div>
      <div class="col-md-4 col-sm-6"><div class="dashboard-stat" style="background:#d87975;"><a href="#"><div class="visual"><i class="fa fa-ticket"></i></div><div class="details"><div class="number">Autoconsulta</div><div class="desc">RRHH</div></div></a><a class="more" href="#">Ver <i class="fa fa-arrow-circle-right"></i></a></div></div>
      <div class="col-md-4 col-sm-12"><div class="dashboard-stat" style="background:#73787c;"><a href="#"><div class="visual"><i class="fa fa-users"></i></div><div class="details"><div class="number">SERQ</div><div class="desc">Servicios</div></div></a><a class="more" href="#">Ver <i class="fa fa-arrow-circle-right"></i></a></div></div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="section-header"><h3><i class="fa fa-newspaper-o"></i><a href="#">Noticias</a></h3></div>
        <div class="news-blocks"><h3><a href="#">Semana de la Seguridad y Salud en el Trabajo en el INC</a></h3><div class="news-block-tags"><em>Prevención, autocuidado y bienestar laboral 2026</em></div><img class="news-block-img" src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop&q=80" alt=""/><p>Con una destacada participación de funcionarios y equipos clínicos, nuestro Instituto desarrolló diversas jornadas y talleres enfocados en la cultura de prevención de riesgos y ergonomía en el entorno hospitalario...</p><a href="#" class="news-block-btn">Leer más <i class="fa fa-arrow-right"></i></a></div>
        <div class="news-blocks"><h3><a href="#">Reacreditación Institucional: Avances y desafíos en calidad de atención</a></h3><div class="news-block-tags"><em>Unidad de Calidad y Seguridad del Paciente</em></div><img class="news-block-img" src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&auto=format&fit=crop&q=80" alt=""/><p>Los distintos Centros de Responsabilidad continúan reforzando los protocolos de seguridad asistencial, trazabilidad de medicamentos e identificación correcta de los pacientes...</p><a href="#" class="news-block-btn">Leer más <i class="fa fa-arrow-right"></i></a></div>
        <div class="news-blocks"><h3><a href="#">Nuevo equipamiento de última generación en el CR de Radioterapia</a></h3><div class="news-block-tags"><em>Tecnología médica para tratamientos de alta precisión</em></div><img class="news-block-img" src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&auto=format&fit=crop&q=80" alt=""/><p>La incorporación de los nuevos sistemas permite optimizar los tiempos de planificación y entregar dosis más focalizadas a pacientes oncológicos...</p><a href="#" class="news-block-btn">Leer más <i class="fa fa-arrow-right"></i></a></div>
        <div style="background:#ffb848;height:6px;border-radius:3px;margin:10px 0 15px;"></div>
        <div class="btn-contacto-intranet">Sugerencias, consultas, agregar o modificar contenido <i class="fa fa-arrow-circle-o-right" style="color:#fff;margin:0 4px;"></i> intranet@incancer.cl</div>
      </div>
      <div class="col-md-6">
        <div class="section-header"><h3><i class="fa fa-bullhorn"></i><a href="#">Informativos</a></h3></div>
        <div class="informativo-card">
          <div style="padding:12px 15px 0;"><span class="informativo-badge"><i class="fa fa-thumb-tack"></i> Informativo Fijado</span></div>
          <div class="document-preview-frame"><div class="document-preview-sheet">
            <div>
              <div style="display:flex;justify-content:space-between;border-bottom:2px solid #E35710;padding-bottom:8px;margin-bottom:12px;"><div><strong style="color:#E35710;font-size:13px;">INSTITUTO NACIONAL DEL CÁNCER</strong><div style="font-size:11px;color:#666;">Dirección - Comunicaciones Internas</div></div><div style="font-size:11px;color:#888;text-align:right;">Circular N° 14/2026<br>Santiago, Chile</div></div>
              <h4 style="font-size:14px;font-weight:bold;color:#1a1a1a;margin:15px 0 10px;text-align:center;">ACTUALIZACIÓN PROTOCOLO INSTITUCIONAL DE ACCESOS Y FIRMA ELECTRÓNICA</h4>
              <p style="font-size:11px;color:#444;line-height:1.6;">Se informa a todos los funcionarios que a contar del presente mes se encuentra operativa la nueva plataforma centralizada de autenticación y validación de documentos clínicos y recetas médicas electrónicas.</p>
              <p style="font-size:11px;color:#444;line-height:1.6;">Las jefaturas de servicio deberán coordinar con el departamento de Informática la actualización de credenciales corporativas.</p>
            </div>
            <div style="border-top:1px dashed #ccc;padding-top:10px;display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#888;"><span><i class="fa fa-file-pdf-o" style="color:#e7505a;"></i> Circular_Firmas_2026.pdf</span><span>Página 1 de 2</span></div>
          </div></div>
          <a href="#" class="ver_mas_informativo"><i class="fa fa-hand-o-right"></i> Más información <span style="font-size:12px;color:#777;font-weight:normal;">(512 clics)</span></a>
        </div>
        <div class="informativo-card">
          <div class="document-preview-frame" style="height:330px;"><div class="document-preview-sheet" style="height:92%;">
            <div>
              <div style="display:flex;justify-content:space-between;border-bottom:2px solid #376d8f;padding-bottom:8px;margin-bottom:10px;"><div><strong style="color:#376d8f;font-size:13px;">SUBDIRECCIÓN MÉDICA</strong><div style="font-size:11px;color:#666;">Comité Farmacológico y Terapéutico</div></div><div style="font-size:11px;color:#888;">Octubre 2026</div></div>
              <h4 style="font-size:13px;font-weight:bold;color:#1a1a1a;margin:10px 0;text-align:center;">ARSENAL FARMACOLÓGICO Y DISPONIBILIDAD ANTIMICROBIANOS</h4>
              <p style="font-size:11px;color:#444;line-height:1.5;">Ya se encuentra disponible en la Intranet la versión revisada del Arsenal Farmacológico institucional 2026, incluyendo la actualización del Formulario SARV para antimicrobianos en reserva.</p>
            </div>
            <div style="border-top:1px dashed #ccc;padding-top:8px;display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#888;"><span><i class="fa fa-file-pdf-o" style="color:#e7505a;"></i> Arsenal_Farmacologico_INC_2026.pdf</span><span>Vigencia Anual</span></div>
          </div></div>
          <a href="#" class="ver_mas_informativo"><i class="fa fa-hand-o-right"></i> Más información <span style="font-size:12px;color:#777;font-weight:normal;">(284 clics)</span></a>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top:10px;">
      <div class="col-md-6"><div class="divsiguenos"><div class="row" style="align-items:center;display:flex;"><div class="col-xs-6"><span style="color:#fff;font-size:17px;font-weight:bold;line-height:1.3;display:block;">¡Síguenos en nuestras Redes Sociales!</span></div><div class="col-xs-6" style="text-align:center;"><span class="btnsiguenos" style="background:#f8a82f;"><i class="fa fa-globe"></i></span><span class="btnsiguenos" style="background:#3b5998;"><i class="fa fa-facebook"></i></span><span class="btnsiguenos" style="background:#00acee;"><i class="fa fa-twitter"></i></span><span class="btnsiguenos" style="background:#a638ad;"><i class="fa fa-instagram"></i></span><span class="btnsiguenos" style="background:#0e76a8;"><i class="fa fa-linkedin"></i></span></div></div></div></div>
      <div class="col-md-6"><div class="divcumple"><span class="humanizacion-btn"><i class="fa fa-heart" style="color:#E35710;"></i> Estrategias de Humanización</span><span class="humanizacion-btn"><i class="fa fa-users" style="color:#376d8f;"></i> Hospital Amigo</span><span class="humanizacion-btn"><i class="fa fa-child" style="color:#35aa47;"></i> Ley Mila 21.372</span></div></div>
    </div>
    <div class="row"><div class="col-md-12"><div class="alert-info-institucional"><strong>Dirección:</strong> Avda. Profesor Zañartu 1010, Independencia, Santiago, Chile &nbsp;&nbsp;|&nbsp;&nbsp; <strong>RUT:</strong> 61.608.404-6</div></div></div>
  </div></div>
</div>
<div class="page-footer"><div><a href="#">Ayuda</a> &nbsp;|&nbsp; <a href="#">Contacto</a> &nbsp;|&nbsp; ©2004 - 2026 Unidad de Informática INC</div><div class="scroll-to-top"><i class="fa fa-angle-up" style="font-size:16px;"></i></div></div>
</div>
`;
