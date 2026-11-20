const API_URL = `${import.meta.env.BASE_URL}api/destinos`

export async function obtenerDestinos(signal) {
  const respuesta = await fetch(API_URL, { signal })

  if (!respuesta.ok) {
    throw new Error('No fue posible cargar los destinos.')
  }

  return respuesta.json()
}

export async function obtenerDestinoPorId(id, signal) {
  const respuesta = await fetch(
    `${API_URL}/${encodeURIComponent(id)}`,
    { signal }
  )

  if (respuesta.status === 404) {
    return null
  }

  if (!respuesta.ok) {
    throw new Error('No fue posible cargar el destino.')
  }

  return respuesta.json()
}
