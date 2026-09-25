-- ============================================================
--  Campaña antiphishing INC — Campaña 1 (interna)
--  Esquema mínimo. Principio: guardar CUENTAS, nunca CLAVES.
--  Ejecutar en Supabase → SQL Editor.
-- ============================================================

-- Identidad separada de la operación.
-- El token opaco (UUID) es la ÚNICA llave que cruza correo ↔ evento.
-- Nunca se guarda nombre ni RUT: solo un seudónimo tipo "FUNC-0427".
create table if not exists destinatarios (
  token        uuid primary key default gen_random_uuid(),
  seudonimo    text not null,               -- "FUNC-0001". El mapeo real vive FUERA de la app.
  departamento text,                        -- para cortes agregados por área
  enviado_at   timestamptz                  -- lo fija el enviador (Apps Script) al despachar
);

-- Solo eventos. Sin contraseñas. Sin IP. Sin user-agent crudo.
create table if not exists eventos (
  id         bigint generated always as identity primary key,
  token      uuid not null references destinatarios(token) on delete cascade,
  tipo       text not null check (tipo in ('open','click','submit','report')),
  ts         timestamptz not null default now(),
  ua_familia text                           -- "Chrome/Windows", nunca el user-agent completo
);

create index if not exists idx_eventos_token on eventos(token);
create index if not exists idx_eventos_tipo  on eventos(tipo);

-- ------------------------------------------------------------
--  Bloqueo por defecto: RLS activo y SIN políticas.
--  Toda escritura pasa por rutas de servidor con service_role,
--  que ignora RLS. El navegador (anon) no puede leer ni escribir nada.
-- ------------------------------------------------------------
alter table destinatarios enable row level security;
alter table eventos       enable row level security;

revoke all on destinatarios from anon, authenticated;
revoke all on eventos       from anon, authenticated;

-- ------------------------------------------------------------
--  Vistas de reporte (consultar desde SQL Editor / service_role).
--  Deduplican por persona: cuentan tokens únicos, no eventos brutos.
-- ------------------------------------------------------------
create or replace view metricas_campana as
select
  (select count(*) from destinatarios)                          as enviados,
  count(distinct token) filter (where tipo = 'open')            as aperturas_unicas,
  count(distinct token) filter (where tipo = 'click')           as clics_unicos,
  count(distinct token) filter (where tipo = 'submit')          as envios_credenciales,
  count(distinct token) filter (where tipo = 'report')          as reportes
from eventos;

create or replace view metricas_por_departamento as
select
  d.departamento,
  count(distinct d.token)                                             as enviados,
  count(distinct e.token) filter (where e.tipo = 'click')            as clics_unicos,
  count(distinct e.token) filter (where e.tipo = 'submit')          as envios_credenciales
from destinatarios d
left join eventos e on e.token = d.token
group by d.departamento
order by d.departamento;

-- Tiempo hasta el primer clic, por persona (para el informe).
create or replace view tiempo_hasta_clic as
select
  d.seudonimo,
  d.departamento,
  min(e.ts) - d.enviado_at as demora_primer_clic
from destinatarios d
join eventos e on e.token = d.token and e.tipo = 'click'
where d.enviado_at is not null
group by d.seudonimo, d.departamento, d.enviado_at;
