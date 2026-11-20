import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material'

import DestinoCard from '../components/DestinoCard'
import EstadoVacio from '../components/EstadoVacio'
import { obtenerDestinos } from '../services/destinosService'
import { normalizarTexto } from '../utils/normalizarTexto'
import { useLocation } from 'react-router-dom'

function Destinos() {
  const [destinos, setDestinos] = useState([])
  const location = useLocation()
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    setBusqueda('')
  }, [location.key])

  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [reintento, setReintento] = useState(0)
  
  useEffect(() => {
    const controller = new AbortController()

    async function cargarDestinos() {
      setCargando(true)
      setError(null)

      try {
        const datos = await obtenerDestinos(controller.signal)

        if (!controller.signal.aborted) {
          setDestinos(datos)
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

    cargarDestinos()

    return () => controller.abort()
  }, [reintento])


  const textoBusqueda = normalizarTexto(busqueda)

  const destinosFiltrados = destinos.filter((destino) => {
    const nombre = normalizarTexto(destino.nombre)
    const pais = normalizarTexto(destino.pais)

    return (
      nombre.includes(textoBusqueda) ||
      pais.includes(textoBusqueda)
    )
  })


  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        fontWeight={700}
        gutterBottom
      >
        Explora nuestros destinos
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Descubre destinos turísticos y encuentra vuelos y hoteles
        para planificar tu próximo viaje.
      </Typography>

      <TextField
        label="Buscar por ciudad o país"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        fullWidth
        sx={{ mb: 4 }}
      />

      {cargando && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>
            Cargando destinos...
          </Typography>
        </Box>
      )}

      {!cargando && error && (
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => setReintento((valor) => valor + 1)}
            >
              Reintentar
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {!cargando && !error && destinosFiltrados.length === 0 && (
        <EstadoVacio
          titulo="No se encontraron destinos"
          descripcion="Prueba con otra ciudad o país."
        />
      )}

      {!cargando && !error && destinosFiltrados.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 3,
          }}
        >
          {destinosFiltrados.map((destino) => (
            <DestinoCard
              key={destino.id}
              destino={destino}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default Destinos
