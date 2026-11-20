import {
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Divider,
} from '@mui/material'

import {
    formatearPrecio,
    formatearFecha,
} from '../utils/formatters'

function VueloCard({ vuelo }) {
    const disponible =
        vuelo.disponible && vuelo.asientosDisponibles > 0

    return (
        <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2,
                    }}
                >

                    <Typography variant="h6" fontWeight={700}>
                        {vuelo.aerolinea}
                    </Typography>

                    <Chip
                        label={disponible ? 'Disponible' : 'Agotado'}
                        color={disponible ? 'success' : 'error'}
                        size="small"
                    />
                </Stack>

                <Typography color="text.secondary" variant="body2">
                    {vuelo.origen} → {vuelo.destino}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2">
                    <strong>Salida:</strong> {formatearFecha(vuelo.fechaSalida)}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Regreso:</strong> {formatearFecha(vuelo.fechaRegreso)}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Asientos disponibles:</strong>{' '}
                    {vuelo.asientosDisponibles}
                </Typography>

                <Typography
                    variant="h5"
                    color="primary"
                    fontWeight={700}
                    sx={{ mt: 3 }}
                >
                    {formatearPrecio(vuelo.precio, vuelo.moneda)}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    Precio referencial por persona
                </Typography>
            </CardContent>
        </Card>
    )
}

export default VueloCard
