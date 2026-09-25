# Campaña antiphishing INC — Campaña 1 (landing + tracking)

Landing instrumentada para el simulacro de phishing interno (COMGES 2026, Eje 6).
Stack: Next.js (App Router) + Supabase + Vercel.

## Principio de diseño
- **La contraseña nunca viaja al servidor.** El formulario tiene campos de
  correo y clave por realismo, pero al enviar solo se transmite el `token`.
- Sin RUT, sin nombres, sin IP, sin user-agent crudo. Solo eventos y un
  seudónimo. El mapeo `seudónimo → persona` vive **fuera** de la app.
- RLS activo y sin políticas: el navegador no puede leer ni escribir. Todo
  pasa por rutas de servidor con `service_role`.

## Eventos que mide
| Evento    | Cómo se dispara                                  |
|-----------|--------------------------------------------------|
| `open`    | pixel 1x1 en el correo (`/api/track/open?t=…`)   |
| `click`   | al abrir el enlace de la landing (`/l/[token]`)  |
| `submit`  | al enviar el formulario falso (`/api/submit`)    |
| `report`  | reservado (quien reporta el correo)              |

## Puesta en marcha
1. **Supabase**: crea un proyecto → SQL Editor → pega y ejecuta
   `supabase/schema.sql`.
2. **Env vars** (local `.env` y en Vercel → Settings → Environment Variables):
   copia `.env.example` y completa `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`
   (Project Settings → API). La `service_role` es secreta: **no** lleva
   `NEXT_PUBLIC_`.
3. **Deploy**: sube el repo a GitHub → impórtalo en Vercel. Define
   `NEXT_PUBLIC_BASE_URL` con el dominio final.
4. **Carga de destinatarios**: inserta las filas en `destinatarios` (una por
   funcionario, con seudónimo y departamento). El enviador (Apps Script)
   recupera cada `token` para armar el enlace único.

## Prueba antes de enviar a nadie
1. Inserta un token de prueba:
   ```sql
   insert into destinatarios (seudonimo, departamento)
   values ('PRUEBA-01', 'TI') returning token;
   ```
2. Visita `NEXT_PUBLIC_BASE_URL/l/<token>` → debe registrar un `click`.
3. Envía el formulario → debe registrar un `submit` y llevarte a
   `/concientizacion`.
4. Verifica en Supabase que **no** existe ninguna columna ni fila con la clave.
5. Consulta `select * from metricas_campana;`.

## Qué falta (siguientes piezas)
- **Enviador** (Google Apps Script): mail-merge con enlace y pixel por persona.
- **Dashboard / informe**: exportar `metricas_campana` y sus cortes.
