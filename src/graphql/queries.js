import { gql } from '@apollo/client'

export const OBTENER_VUELOS = gql`
  query ObtenerVuelos($destinoId: ID!) {
    vuelos(destinoId: $destinoId) {
      id
      destinoId
      aerolinea
      origen
      destino
      fechaSalida
      fechaRegreso
      precio
      moneda
      disponible
      asientosDisponibles
    }
  }
`

export const OBTENER_HOTELES = gql`
  query ObtenerHoteles($destinoId: ID!) {
    hoteles(destinoId: $destinoId) {
      id
      destinoId
      nombre
      categoria
      precioNoche
      moneda
      fechaEntrada
      fechaSalida
      disponible
      habitacionesDisponibles
    }
  }
`
