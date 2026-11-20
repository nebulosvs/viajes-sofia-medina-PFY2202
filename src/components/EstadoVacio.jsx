import { Box, Typography } from '@mui/material'

function EstadoVacio({ titulo, descripcion }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 6,
        px: 3,
        border: '1px dashed #cbd5e1',
        borderRadius: 3,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {titulo}
      </Typography>

      <Typography color="text.secondary">
        {descripcion}
      </Typography>
    </Box>
  )
}

export default EstadoVacio
