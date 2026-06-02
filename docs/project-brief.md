# Project Brief

## Project Name

Sticker Swap Hub

---

# 1. Executive Summary

Sticker Swap Hub es una aplicación web mobile-first diseñada para ayudar a coleccionistas de cromos, especialmente del Mundial de Fútbol 2026 a gestionar su colección de forma sencilla y encontrar rápidamente oportunidades de intercambio con otros usuarios.

La aplicación permitirá registrar los cromos obtenidos, indicar la cantidad de repetidos, visualizar el progreso del álbum y compartir un perfil público con otros coleccionistas.

El principal valor diferencial del producto será la comparación automática entre colecciones, permitiendo identificar instantáneamente qué cromos puede intercambiar un usuario con otro.

Aunque la primera versión estará enfocada exclusivamente en el álbum del Mundial 2026, la arquitectura se diseñará desde el inicio para soportar múltiples álbumes coleccionables en el futuro.

---

# 2. Problem Statement

Actualmente los coleccionistas suelen gestionar sus cromos mediante:

- El propio álbum físico.
- Hojas de cálculo.
- Notas en el móvil.
- Mensajes de WhatsApp.
- Grupos de Telegram.

Esto genera varios problemas:

- Difícil saber qué cromos faltan.
- Difícil conocer qué cromos están repetidos.
- Comparación manual entre colecciones.
- Pérdida de tiempo buscando posibles intercambios.
- Imposibilidad de identificar rápidamente usuarios compatibles para intercambiar.

La experiencia actual es altamente manual y poco eficiente.

---

# 3. Product Vision

Convertirse en la forma más rápida y sencilla de gestionar colecciones de cromos y encontrar oportunidades de intercambio.

El usuario no debería preguntarse:

"¿Qué cromos me faltan?"

Sino:

"¿Con quién puedo intercambiar ahora mismo?"

---

# 4. Product Goals

## Objetivos principales

- Facilitar la gestión de colecciones.
- Reducir el tiempo necesario para comparar álbumes.
- Favorecer los intercambios entre usuarios.
- Ofrecer perfiles compartibles públicamente.
- Mantener una experiencia extremadamente simple.

## Objetivos secundarios

- Crear una comunidad de coleccionistas.
- Facilitar el crecimiento orgánico mediante enlaces compartidos.
- Diseñar una plataforma reutilizable para futuros álbumes.

---

# 5. Target Audience

## Usuario principal

Coleccionistas del álbum oficial del Mundial 2026.

Perfil:

- Adolescentes.
- Jóvenes adultos.
- Padres con hijos coleccionistas.
- Coleccionistas habituales de Panini.

## Usuario secundario

Coleccionistas de otros álbumes futuros.

---

# 6. Core Value Proposition

La aplicación permite:

- Registrar cromos obtenidos.
- Registrar repetidos.
- Compartir la colección.
- Comparar colecciones automáticamente.
- Identificar intercambios potenciales en segundos.

---

# 7. MVP Scope

## Incluido

### Autenticación

- Login con Google OAuth.
- Creación automática de usuario.
- Selección inicial de username.

### Perfil

- Perfil público.
- URL compartible.

Ejemplo:

/u/spasiomike

### Gestión de colección

- Visualización del álbum.
- Visualización por secciones.
- Gestión de cantidad de cromos.

Estados:

- No disponible.
- Disponible.
- Repetidos.

### Estadísticas

- Total cromos.
- Cromos obtenidos.
- Cromos faltantes.
- Repetidos totales.
- Porcentaje completado.

### Comparación entre usuarios

Visible únicamente para usuarios autenticados.

Mostrar:

- Cromos que el visitante puede ofrecer.
- Cromos que el perfil visitado puede ofrecer.
- Número total de oportunidades de intercambio.

### Compartición

- Perfil público accesible sin login.
- Botón de registro para comparar colecciones.

### Internacionalización

Idiomas soportados:

- Español
- Inglés

---

# 8. Out of Scope (MVP)

No se desarrollará inicialmente:

- Chat.
- Solicitudes de intercambio.
- Notificaciones.
- Geolocalización.
- Aplicación móvil nativa.
- Escaneo de cromos.
- Carga masiva de cromos.
- Imágenes oficiales.
- Marketplace.
- Sistema de reputación.

---

# 9. Future Roadmap

## Version 1.1

### Entrada rápida de cromos

Ejemplos:

ESP1,ESP2,ESP3

o

ESP1 ESP2 ESP3

### Comparación mejorada

- Match Score.
- Compatibilidad entre usuarios.

### Búsqueda de usuarios.

---

## Version 1.2

### Solicitudes de intercambio

- Crear solicitud.
- Aceptar.
- Rechazar.

### Historial de intercambios.

---

## Version 2.0

### Sistema de matchmaking

Identificación automática de usuarios compatibles.

### Ranking de intercambios.

### Mejoras sociales.

---

## Version 3.0

### Escaneo mediante cámara.

### Imágenes de cromos.

### Aplicación móvil.

---

# 10. Functional Requirements

## FR-001

El sistema deberá permitir autenticación mediante Google OAuth.

## FR-002

El sistema deberá permitir crear un username único.

## FR-003

El sistema deberá generar un perfil público accesible mediante URL.

## FR-004

El sistema deberá mostrar todos los cromos del álbum.

## FR-005

El usuario deberá poder indicar cuántas copias posee de un cromo.

## FR-006

El sistema deberá calcular automáticamente:

- Completados.
- Faltantes.
- Repetidos.

## FR-007

El sistema deberá permitir comparar dos colecciones.

## FR-008

El sistema deberá soportar múltiples idiomas.

## FR-009

El sistema deberá soportar múltiples álbumes.

---

# 11. Non Functional Requirements

## Performance

- Tiempo de carga inferior a 2 segundos.
- Navegación fluida en dispositivos móviles.

## Security

- OAuth seguro.
- Protección CSRF.
- Validación de datos.

## Scalability

La arquitectura deberá soportar:

- Nuevos álbumes.
- Miles de usuarios concurrentes.

## Accessibility

- Navegación táctil.
- Contraste adecuado.
- Responsive design.

---

# 12. High Level Architecture

Frontend

- Next.js
- TypeScript
- TailwindCSS
- shadcn/ui

Backend

- Next.js Server Actions
- Next.js Route Handlers

Authentication

- Better Auth
- Google OAuth

Database

- PostgreSQL

ORM

- Prisma

Hosting

- Vercel

Database Hosting

- Neon

---

# 13. Initial Domain Model

User

- id
- username
- email
- image
- createdAt

Album

- id
- code
- name
- totalStickers

Sticker

- id
- albumId
- code
- name
- section
- position

UserAlbum

- id
- userId
- albumId

UserSticker

- id
- userId
- stickerId
- quantity

---

# 14. Key Metrics

## Adoption

- Usuarios registrados.
- Usuarios activos.

## Engagement

- Cromos registrados por usuario.
- Comparaciones realizadas.

## Growth

- Perfiles compartidos.
- Conversiones desde perfiles públicos.

---

# 15. Risks

## Riesgo 1

Onboarding lento.

Mitigación:

- Entrada rápida de cromos en futuras versiones.

## Riesgo 2

Falta de masa crítica.

Mitigación:

- Perfiles públicos compartibles.

## Riesgo 3

Problemas de copyright.

Mitigación:

- No utilizar imágenes oficiales en MVP.

---

# 16. Success Criteria

El MVP será considerado exitoso si:

- Los usuarios pueden registrar fácilmente su colección.
- Los perfiles públicos son compartidos.
- La comparación entre usuarios reduce significativamente el esfuerzo de intercambio.
- El sistema puede escalar para soportar futuros álbumes sin cambios arquitectónicos significativos.
