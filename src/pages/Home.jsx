import { Link as RouterLink } from 'react-router-dom'

import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
} from '@mui/material'

import { useLocalStorage } from '../hooks/useLocalStorage'
import hero from '../assets/hero.png'

function Home() {
  const [ultimoDestino] = useLocalStorage(
    'viajes-ultimo-destino',
    null
  )

  return (
    <Box>
      <Box
        sx={{
          minHeight: { xs: 360, md: 440 },
          borderRadius: 4,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          p: { xs: 3, md: 6 },
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(10, 32, 58, 0.88),
              rgba(10, 32, 58, 0.35)
            ),
            url(${hero})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
        }}
      >
        <Box sx={{ maxWidth: 600 }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: 2 }}
          >
            Tu próxima aventura comienza aquí
          </Typography>

          <Typography
            variant="h3"
            component="h1"
            fontWeight={800}
            sx={{
              fontSize: {
                xs: '2.2rem',
                md: '3.5rem',
              },
              my: 2,
            }}
          >
            Descubre el mundo a tu manera
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontWeight: 400,
              lineHeight: 1.7,
            }}
          >
            Explora destinos increíbles, compara vuelos y
            encuentra hoteles para tu próximo viaje.
          </Typography>

          <Button
            component={RouterLink}
            to="/destinos"
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#ffffff',
              color: '#1464a0',
              fontWeight: 700,
              '&:hover': {
                bgcolor: '#e8f1fa',
              },
            }}
          >
            Explorar destinos
          </Button>
        </Box>
      </Box>

      {ultimoDestino && (
        <Paper
          variant="outlined"
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              justifyContent: 'space-between',
              alignItems: {
                xs: 'flex-start',
                sm: 'center',
              },
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="overline"
                color="text.secondary"
              >
                Continúa explorando
              </Typography>

              <Typography variant="h6" fontWeight={700}>
                {ultimoDestino.nombre}, {ultimoDestino.pais}
              </Typography>

              <Typography color="text.secondary">
                Revisa nuevamente sus vuelos y hoteles.
              </Typography>
            </Box>

            <Button
              component={RouterLink}
              to={`/destinos/${ultimoDestino.id}`}
              variant="outlined"
            >
              Ver destino
            </Button>
          </Stack>
        </Paper>
      )}

      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          fontWeight={700}
          gutterBottom
        >
          Planifica tu próximo viaje
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            maxWidth: 650,
            mx: 'auto',
            mb: 3,
          }}
        >
          Consulta destinos turísticos mediante nuestra API REST
          y descubre vuelos y hoteles utilizando GraphQL.
        </Typography>

        <Button
          component={RouterLink}
          to="/destinos"
          variant="contained"
        >
          Ver todos los destinos
        </Button>
      </Box>
    </Box>
  )
}

export default Home
