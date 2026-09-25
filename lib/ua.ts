// Reduce el user-agent a una etiqueta gruesa ("Chrome/Windows").
// Nunca almacenamos el user-agent completo: es un identificador de rastreo.
export function familiaUA(ua: string | null): string {
  if (!ua) return 'desconocido';
  const nav =
    /Edg/.test(ua)     ? 'Edge'    :
    /Chrome/.test(ua)  ? 'Chrome'  :
    /Firefox/.test(ua) ? 'Firefox' :
    /Safari/.test(ua)  ? 'Safari'  : 'otro';
  const os =
    /Windows/.test(ua)          ? 'Windows' :
    /Android/.test(ua)          ? 'Android' :
    /iPhone|iPad|iOS/.test(ua)  ? 'iOS'     :
    /Mac/.test(ua)              ? 'macOS'   :
    /Linux/.test(ua)            ? 'Linux'   : 'otro';
  return `${nav}/${os}`;
}
