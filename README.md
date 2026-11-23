# ✈️ Viajes | Agencia de Viajes

Aplicación web desarrollada con **React y Vite** para explorar destinos turísticos y consultar información de vuelos y hoteles mediante la integración de **API REST y GraphQL**.

El proyecto utiliza **Mock Service Worker (MSW)** para simular las respuestas del backend y **Apollo Client** para realizar consultas GraphQL, permitiendo demostrar la comunicación entre frontend y servicios sin depender de un servidor externo.

Desarrollado como parte de la asignatura **Desarrollo Frontend II (PFY2202)**.

## 🌐 Enlaces del proyecto

- **Aplicación publicada:** https://nebulosvs.github.io/viajes-sofia-medina-PFY2202/
- **Repositorio GitHub:** https://github.com/nebulosvs/viajes-sofia-medina-PFY2202

## 🚀 Funcionalidades

### Catálogo de destinos

- Visualización de seis destinos turísticos: París, Tokio, Roma, Río de Janeiro, Nueva York y Barcelona.
- Fotografías, país, descripción y actividades destacadas de cada destino.
- Búsqueda dinámica por nombre o país.
- Búsqueda sin distinción entre mayúsculas, minúsculas y tildes.
- Mensaje informativo cuando no se encuentran coincidencias.
- Restablecimiento de la búsqueda al volver a ingresar al catálogo.

### Detalle de destinos

- Navegación individual mediante rutas dinámicas.
- Consulta de información detallada utilizando una API REST simulada.
- Visualización de fotografías y actividades turísticas.
- Consulta de vuelos y hoteles asociados al destino mediante GraphQL.
- Información de precios, fechas y disponibilidad.
- Identificación visual de opciones disponibles y agotadas.
- Manejo de estados de carga, errores y reintentos.

### Persistencia

- Almacenamiento del último destino visitado mediante `localStorage`.
- Sección «Continúa explorando» en la página de inicio.
- Recuperación de la información al recargar la aplicación.

La búsqueda del catálogo no se almacena, para que el usuario pueda comenzar una nueva exploración al ingresar a Destinos.

### Diseño responsive

- Interfaz adaptable a dispositivos móviles, tablets y computadores.
- Componentes de Material UI.
- Tarjetas reutilizables para destinos, vuelos y hoteles.
- Fotografías adaptables mediante `object-fit: cover`.
- Navegación implementada con React Router.

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React | Construcción de la interfaz mediante componentes |
| Vite | Entorno de desarrollo y compilación |
| JavaScript | Lógica de la aplicación |
| Material UI | Componentes visuales y diseño responsive |
| React Router | Navegación entre páginas y rutas dinámicas |
| MSW | Simulación de respuestas REST y GraphQL |
| Apollo Client | Ejecución de consultas GraphQL |
| GraphQL | Definición de consultas y selección de campos |
| React Hooks | Gestión de estados y efectos |
| localStorage | Persistencia del último destino visitado |
| Git y GitHub | Control de versiones y repositorio |
| GitHub Pages | Publicación de la aplicación |

## 🔗 Integración con API REST

La aplicación utiliza una API REST simulada mediante MSW para obtener la información de los destinos turísticos.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/destinos` | Obtiene todos los destinos |
| GET | `/api/destinos/:id` | Obtiene un destino por su identificador |

La API también contempla respuestas HTTP `404 Not Found` cuando se solicita un destino inexistente.

Las rutas se adaptan automáticamente a la ruta base configurada en Vite, permitiendo su funcionamiento en GitHub Pages.

## 🔷 Integración con GraphQL

La información de vuelos y hoteles se consulta mediante **Apollo Client**, utilizando documentos GraphQL definidos con `gql`.

Las consultas se envían al endpoint simulado:

`POST /graphql`

### Consulta de vuelos

```graphql
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
```

### Consulta de hoteles

```graphql
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
```

Ambas consultas reciben el identificador del destino mediante variables, permitiendo obtener información relacionada con el lugar seleccionado.

**Nota:** GraphQL se utiliza con un backend simulado mediante MSW. El proyecto no implementa un servidor GraphQL completo ni una base de datos externa.

## 🏗️ Arquitectura de la aplicación

La aplicación organiza sus responsabilidades en distintas capas:

1. **Presentación:** páginas y componentes React encargados de mostrar la información.
2. **Servicios:** funciones reutilizables para obtener los datos.
3. **Cliente GraphQL:** configuración de Apollo Client y documentos de consulta.
4. **Backend simulado:** handlers de MSW que interceptan solicitudes HTTP y devuelven respuestas.
5. **Datos:** arreglos locales con destinos, vuelos y hoteles.

### Flujo de información

**Consulta REST**

`Componente React → destinosService.js → MSW → Datos de destinos`

**Consulta GraphQL**

`Componente React → viajesService.js → Apollo Client → MSW → Datos de vuelos y hoteles`

Esta separación facilita el mantenimiento, la reutilización y la comprensión del código.

## 📁 Estructura del proyecto

```text
viajes-sofia-medina-PFY2202/
├── public/
│   ├── images/
│   │   └── destinos/
│   └── mockServiceWorker.js
├── src/
│   ├── assets/
│   │   └── hero.png
│   ├── components/
│   │   ├── DestinoCard.jsx
│   │   ├── VueloCard.jsx
│   │   ├── HotelCard.jsx
│   │   └── EstadoVacio.jsx
│   ├── graphql/
│   │   ├── apolloClient.js
│   │   └── queries.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── mocks/
│   │   ├── data/
│   │   │   ├── destinos.js
│   │   │   ├── vuelos.js
│   │   │   └── hoteles.js
│   │   ├── browser.js
│   │   └── handlers.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Destinos.jsx
│   │   └── DetalleDestino.jsx
│   ├── services/
│   │   ├── destinosService.js
│   │   └── viajesService.js
│   ├── utils/
│   │   ├── formatters.js
│   │   └── normalizarTexto.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 💻 Instalación y ejecución local

### Requisitos

- Node.js compatible con la versión de Vite utilizada.
- npm.
- Navegador web moderno.

### 1. Clonar el repositorio

```bash
git clone https://github.com/nebulosvs/viajes-sofia-medina-PFY2202.git
```

### 2. Ingresar al directorio

```bash
cd viajes-sofia-medina-PFY2202
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Abrir en el navegador la dirección indicada por Vite.

### 5. Compilar para producción

```bash
npm run build
```

### 6. Previsualizar la compilación

```bash
npm run preview
```

### 7. Ejecutar OxLint

```bash
npm run lint
```

## 🧪 Pruebas funcionales

Se realizaron comprobaciones manuales de las siguientes funcionalidades:

| Prueba | Resultado |
|---|---|
| Carga del catálogo de destinos | Correcto |
| Búsqueda con y sin tildes | Correcto |
| Navegación entre páginas | Correcto |
| Consulta REST de destinos | Correcto |
| Manejo de destino inexistente | Correcto |
| Consultas GraphQL de vuelos | Correcto |
| Consultas GraphQL de hoteles | Correcto |
| Visualización de disponibilidad | Correcto |
| Persistencia del último destino | Correcto |
| Visualización responsive | Correcto |
| Carga de fotografías | Correcto |
| Funcionamiento en GitHub Pages | Correcto |

Las solicitudes REST y GraphQL se verificaron mediante las herramientas de desarrollo del navegador, comprobando las respuestas simuladas por MSW.

### Evidencias de pruebas

Se realizaron pruebas manuales de funcionamiento y compatibilidad en **Google Chrome, Mozilla Firefox y Opera GX**, verificando la navegación, el diseño responsive y las funcionalidades principales de la aplicación.

Las capturas y el registro de casos de prueba se encuentran disponibles en la carpeta [`evidencias/`](./evidencias/PRUEBAS.md).

## 🌍 Publicación

La aplicación se encuentra publicada mediante **GitHub Pages**.

Para evitar errores al recargar rutas internas, se utiliza `HashRouter`.

La configuración de Vite incluye la ruta base del repositorio, mientras que MSW utiliza un Service Worker ubicado dentro de la carpeta pública de la aplicación.

Para actualizar la versión publicada:

```bash
npm run deploy
```

Este comando genera la compilación de producción y publica su contenido en la rama `gh-pages`.

## 📌 Alcance del proyecto

Este proyecto tiene fines académicos y utiliza datos simulados.

Los destinos, vuelos, hoteles, precios y disponibilidades son referenciales. La aplicación no permite realizar reservas reales ni efectuar pagos.

Su propósito es demostrar el desarrollo de interfaces con React y la integración de tecnologías REST y GraphQL mediante servicios simulados.

---

**Asignatura:** Desarrollo Frontend II — PFY2202  
**Proyecto:** Agencia de Viajes  
**Modalidad:** Aplicación web frontend  
**Publicación:** GitHub Pages
