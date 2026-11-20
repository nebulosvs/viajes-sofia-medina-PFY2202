import {
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Divider,
    Rating,
} from '@mui/material'

import {
    formatearPrecio,
    formatearFecha,
} from '../utils/formatters'

function HotelCard({ hotel }) {
    const disponible =
        hotel.disponible && hotel.habitacionesDisponibles > 0

    return (
        <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: 2,
                        mb: 1,
                    }}
                >
                    <Typography variant="h6" fontWeight={700}>
                        {hotel.nombre}
                    </Typography>

                    <Chip
                        label={disponible ? 'Disponible' : 'Agotado'}
                        color={disponible ? 'success' : 'error'}
                        size="small"
                    />
                </Stack>

                <Rating
                    value={hotel.categoria}
                    max={5}
                    readOnly
                    size="small"
                    sx={{ mb: 2 }}
                />

                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2">
                    <strong>Entrada:</strong> {formatearFecha(hotel.fechaEntrada)}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Salida:</strong> {formatearFecha(hotel.fechaSalida)}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Habitaciones disponibles:</strong>{' '}
                    {hotel.habitacionesDisponibles}
                </Typography>

                <Typography
                    variant="h5"
                    color="primary"
                    fontWeight={700}
                    sx={{ mt: 3 }}
                >
                    {formatearPrecio(hotel.precioNoche, hotel.moneda)}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    Precio referencial por noche
                </Typography>
            </CardContent>
        </Card>
    )
}

export default HotelCard
