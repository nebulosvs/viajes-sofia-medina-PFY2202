import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
} from '@mui/material'

import { Link as RouterLink } from 'react-router-dom'

function DestinoCard({ destino }) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        image={`${import.meta.env.BASE_URL}${destino.imagen}`}
        alt={`Fotografía de ${destino.nombre}, ${destino.pais}`}
        sx={{
          height: 210,
          objectFit: 'cover',
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          component="h2"
          fontWeight={700}
          gutterBottom
        >
          {destino.nombre}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {destino.pais}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          {destino.descripcion}
        </Typography>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Actividades populares
        </Typography>

        <Stack
          direction="row"
          sx={{
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {destino.actividades.map((actividad) => (
            <Chip
              key={actividad}
              label={actividad}
              size="small"
              variant="outlined"
            />
          ))}
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          component={RouterLink}
          to={`/destinos/${destino.id}`}
          variant="contained"
          fullWidth
        >
          Ver vuelos y hoteles
        </Button>
      </CardActions>
    </Card>
  )
}

export default DestinoCard
