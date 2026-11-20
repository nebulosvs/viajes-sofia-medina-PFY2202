import { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'

import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Chip,
  Stack,
  Divider,
} from '@mui/material'

import { obtenerDestinoPorId } from '../services/destinosService'
import { obtenerVuelos, obtenerHoteles } from '../services/viajesService'

import VueloCard from '../components/VueloCard'
import HotelCard from '../components/HotelCard'
import EstadoVacio from '../components/EstadoVacio'
import { useLocalStorage } from '../hooks/useLocalStorage'

function DetalleDestino() {
  const { id } = useParams()

  const [, setUltimoDestino] = useLocalStorage(
    'viajes-ultimo-destino',
    null
  )

  const [destino, setDestino] = useState(null)
  const [vuelos, setVuelos] = useState([])
  const [hoteles, setHoteles] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [reintento, setReintento] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function cargarInformacion() {
      setCargando(true)
      setError(null)

      try {
        const destinoObtenido = await obtenerDestinoPorId(
          id,
          controller.signal
        )

        if (!destinoObtenido) {
          throw new Error('El destino solicitado no existe.')
        }

        const [vuelosObtenidos, hotelesObtenidos] = await Promise.all([
          obtenerVuelos(id, controller.signal),
          obtenerHoteles(id, controller.signal),
        ])

        if (!controller.signal.aborted) {
          setDestino(destinoObtenido)
          setVuelos(vuelosObtenidos)
          setHoteles(hotelesObtenidos)
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false)
        }
      }
    }

    cargarInformacion()

    return () => controller.abort()
  }, [id, reintento])

  useEffect(() => {
    if (destino && String(destino.id) === String(id)) {
      setUltimoDestino({
        id: destino.id,
        nombre: destino.nombre,
        pais: destino.pais,
      })
    }
  }, [destino, id, setUltimoDestino])

  if (cargando) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>
          Consultando destino, vuelos y hoteles...
        </Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>

        <Stack
          direction="row"
          sx={{
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            onClick={() => setReintento((valor) => valor + 1)}
          >
            Reintentar
          </Button>

          <Button component={RouterLink} to="/destinos">
            Volver a destinos
          </Button>
        </Stack>
      </Box>
    )
  }

  if (!destino) {
    return (
      <EstadoVacio
        titulo="Destino no disponible"
        descripcion="No se encontró información para este destino."
      />
    )
  }

  return (
    <Box>
      <Button
        component={RouterLink}
        to="/destinos"
        sx={{ mb: 3 }}
      >
        ← Volver a destinos
      </Button>

      <Typography
        variant="h4"
        component="h1"
        fontWeight={700}
        gutterBottom
      >
        {destino.nombre}, {destino.pais}
      </Typography>


      <Box
        component="img"
        src={`${import.meta.env.BASE_URL}${destino.imagen}`}
        alt={`Vista turística de ${destino.nombre}`}
        sx={{
          width: '100%',
          height: {
            xs: 220,
            sm: 320,
            md: 400,
          },
          objectFit: 'cover',
          borderRadius: 3,
          mb: 3,
        }}
      />


      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {destino.descripcion}
      </Typography>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        Actividades populares
      </Typography>

      <Stack
        direction="row"
        sx={{
          flexWrap: 'wrap',
          gap: 1,
          mb: 4,
        }}
      >
        {destino.actividades.map((actividad) => (
          <Chip
            key={actividad}
            label={actividad}
            variant="outlined"
          />
        ))}
      </Stack>

      <Divider sx={{ mb: 4 }} />

      <Typography
        variant="h5"
        component="h2"
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        ✈️ Vuelos disponibles
      </Typography>

      {vuelos.length === 0 ? (
        <EstadoVacio
          titulo="No hay vuelos disponibles"
          descripcion="Actualmente no encontramos vuelos para este destino."
        />
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, minmax(0, 1fr))',
            },
            gap: 3,
            mb: 5,
          }}
        >
          {vuelos.map((vuelo) => (
            <VueloCard key={vuelo.id} vuelo={vuelo} />
          ))}
        </Box>
      )}

      <Typography
        variant="h5"
        component="h2"
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        🏨 Hoteles disponibles
      </Typography>

      {hoteles.length === 0 ? (
        <EstadoVacio
          titulo="No hay hoteles disponibles"
          descripcion="Actualmente no encontramos hoteles para este destino."
        />
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, minmax(0, 1fr))',
            },
            gap: 3,
          }}
        >
          {hoteles.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default DetalleDestino
