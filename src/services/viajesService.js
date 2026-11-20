import { apolloClient } from '../graphql/apolloClient'
import {
  OBTENER_VUELOS,
  OBTENER_HOTELES,
} from '../graphql/queries'

export async function obtenerVuelos(destinoId, signal) {
  const resultado = await apolloClient.query({
    query: OBTENER_VUELOS,
    variables: {
      destinoId: String(destinoId),
    },
    fetchPolicy: 'no-cache',
    context: {
      fetchOptions: {
        signal,
      },
    },
  })

  return resultado.data.vuelos
}

export async function obtenerHoteles(destinoId, signal) {
  const resultado = await apolloClient.query({
    query: OBTENER_HOTELES,
    variables: {
      destinoId: String(destinoId),
    },
    fetchPolicy: 'no-cache',
    context: {
      fetchOptions: {
        signal,
      },
    },
  })

  return resultado.data.hoteles
}
