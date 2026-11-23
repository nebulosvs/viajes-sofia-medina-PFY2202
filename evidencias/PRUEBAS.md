# Pruebas funcionales y de compatibilidad

## Objetivo

Verificar el funcionamiento de la aplicación web de agencia de viajes, considerando la navegación, la consulta de datos mediante REST y GraphQL, la visualización de información turística y la compatibilidad entre distintos navegadores.

## Entorno de pruebas

- **Aplicación:** Viajes — Agencia de Viajes
- **Tecnologías:** React, Vite, Material UI, React Router, MSW y Apollo Client
- **Navegadores:** Google Chrome, Mozilla Firefox y Opera GX
- **Modalidad:** Pruebas manuales
- **Sitio publicado:** https://nebulosvs.github.io/viajes-sofia-medina-PFY2202/

## Casos de prueba

| ID | Caso de prueba | Resultado esperado |
|---|---|---|
| CP-01 | Acceder a Inicio | La página carga correctamente |
| CP-02 | Acceder al catálogo | Se muestran los seis destinos |
| CP-03 | Buscar `paris` | Se muestra París sin exigir tilde |
| CP-04 | Buscar un destino inexistente | Aparece un mensaje informativo |
| CP-05 | Seleccionar un destino | Se muestra su información detallada |
| CP-06 | Consultar vuelos | Se muestran los vuelos correspondientes al destino |
| CP-07 | Consultar hoteles | Se muestran los hoteles correspondientes al destino |
| CP-08 | Revisar disponibilidad | Se distinguen opciones disponibles y agotadas |
| CP-09 | Recargar una ruta interna | La página continúa funcionando |
| CP-10 | Volver a Destinos | La búsqueda se restablece |
| CP-11 | Recargar Inicio | Se conserva el último destino visitado |
| CP-12 | Visualizar en móvil | Los componentes se adaptan al ancho de pantalla |
| CP-13 | Visualizar fotografías | Las imágenes cargan sin deformarse |
| CP-14 | Revisar solicitudes REST y GraphQL | Las respuestas esperadas son correctas |

## Compatibilidad entre navegadores

Se verificó el funcionamiento general de la aplicación en los siguientes navegadores:

| Navegador | Funcionamiento general | Diseño responsive |
|---|---|---|
| Google Chrome | Correcto | Correcto |
| Mozilla Firefox | Correcto | Correcto |
| Opera GX | Correcto | Correcto |

Las pruebas permiten comprobar que la aplicación puede utilizarse en diferentes motores de navegador, manteniendo su navegación, presentación visual y funcionalidades principales.

## Evidencias

Las capturas de pantalla se organizan en carpetas independientes para cada navegador:

- `chrome/`
- `firefox/`
- `opera-gx/`

Cada carpeta contiene evidencias de la página de inicio, el catálogo de destinos y la vista de detalle.

## Conclusión

La aplicación presenta un funcionamiento correcto en los tres navegadores evaluados, con una interfaz responsive y navegación funcional.

Las pruebas documentadas son manuales y no constituyen una suite de pruebas automatizadas.
