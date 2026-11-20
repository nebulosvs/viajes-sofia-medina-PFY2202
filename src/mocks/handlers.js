import { http, HttpResponse } from 'msw'

import { destinos } from './data/destinos'
import { vuelos } from './data/vuelos'
import { hoteles } from './data/hoteles'

const API_BASE = import.meta.env.BASE_URL

export const handlers = [
  // REST: obtener todos los destinos
  http.get(`${API_BASE}api/destinos`, () => {
    return HttpResponse.json(destinos)
  }),

  // REST: obtener un destino por ID
  http.get(`${API_BASE}api/destinos/:id`, ({ params }) => {
    const destino = destinos.find(
      (item) => item.id === Number(params.id)
    )

    if (!destino) {
      return HttpResponse.json(
        { mensaje: 'Destino no encontrado.' },
        { status: 404 }
      )
    }

    return HttpResponse.json(destino)
  }),

  // GraphQL mock: consultar vuelos y hoteles
  http.post(`${API_BASE}graphql`, async ({ request }) => {
    const { query, variables } = await request.json()

    const destinoId = variables?.destinoId

    if (!destinoId) {
      return HttpResponse.json({
        errors: [
          { message: 'Debes indicar el ID del destino.' },
        ],
      })
    }

    if (query.includes('ObtenerVuelos')) {
      const vuelosFiltrados = vuelos.filter(
        (vuelo) =>
          String(vuelo.destinoId) === String(destinoId)
      )

      return HttpResponse.json({
        data: {
          vuelos: vuelosFiltrados,
        },
      })
    }

    if (query.includes('ObtenerHoteles')) {
      const hotelesFiltrados = hoteles.filter(
        (hotel) =>
          String(hotel.destinoId) === String(destinoId)
      )

      return HttpResponse.json({
        data: {
          hoteles: hotelesFiltrados,
        },
      })
    }

    return HttpResponse.json({
      errors: [
        { message: 'Operación GraphQL no reconocida.' },
      ],
    })
  }),
]
