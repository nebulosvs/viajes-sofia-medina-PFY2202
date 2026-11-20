export function formatearPrecio(valor, moneda = 'CLP') {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(valor)
}

export function formatearFecha(fecha) {
  if (!fecha) return 'Fecha no disponible'

  const [anio, mes, dia] = fecha.split('-').map(Number)

  const fechaLocal = new Date(anio, mes - 1, dia)

  return new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(fechaLocal)
}
