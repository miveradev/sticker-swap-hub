# Product Requirements Document (PRD) v1

## Product

Sticker Swap Hub

(MVP enfocado en FIFA World Cup 2026)

---

# 1. Objetivo

Permitir a los usuarios gestionar su colección de cromos, compartir su progreso y descubrir oportunidades de intercambio mediante la comparación automática entre colecciones.

---

# 2. Alcance del MVP

El MVP deberá permitir:

- Registro mediante Google OAuth.
- Creación de username único.
- Gestión de colección de cromos.
- Visualización de progreso.
- Perfil público compartible.
- Comparación entre usuarios autenticados.
- Soporte multiidioma (ES/EN).

---

# 3. Roles

## Visitante

Usuario no autenticado.

Puede:

- Ver landing page.
- Ver perfiles públicos.
- Ver progreso de otros usuarios.
- Ver repetidos.
- Ver faltantes.

No puede:

- Gestionar colección.
- Comparar colecciones.

---

## Usuario Registrado

Puede:

- Gestionar colección.
- Ver estadísticas.
- Compartir perfil.
- Comparar colecciones.

---

# 4. Flujo de Onboarding

## Paso 1

Usuario accede a la aplicación.

Landing principal.

Acciones:

- Login con Google
- Cambiar idioma

---

## Paso 2

Primer login.

Solicitar:

Username

Validaciones:

- Obligatorio
- Único
- Min 3 caracteres
- Max 20 caracteres
- Solo letras, números y "\_"

Ejemplos válidos:

- mike
- spasiomike
- mike_2026

---

## Paso 3

Acceso al dashboard.

---

# 5. Dashboard

## Objetivo

Mostrar el estado general de la colección.

---

## Información mostrada

Álbum seleccionado.

Porcentaje completado.

Ejemplo:

72%

---

Total cromos:

980

---

Conseguidos:

703

---

Faltantes:

277

---

Repetidos:

94

---

Acciones:

- Ver álbum
- Ver perfil público

---

# 6. Gestión del Álbum

## Vista principal

Listado por secciones.

Ejemplo:

### Opening Ceremony

### Stadiums

### Spain

### Argentina

### Brazil

### Legends

---

Cada sección mostrará un grid.

Ejemplo:

ESP1

ESP2

ESP3

ESP4

---

## Estado visual

### No obtenido

Aspecto:

Neutral

Cantidad:

0

---

### Obtenido

Aspecto:

Marcado

Cantidad:

1

---

### Repetidos

Aspecto:

Marcado

Cantidad:

2+

Indicador visual:

+N repetidos

---

# 7. Gestión de un Cromo

Al pulsar sobre un cromo:

Abrir modal.

---

Información:

Código

Ejemplo:

ESP10

---

Nombre

Ejemplo:

Pedri

---

Cantidad total

Control numérico:

0

1

2

3

4

5

...

---

Reglas

0 = No obtenido

1 = Obtenido

2 = 1 repetido

3 = 2 repetidos

N = N-1 repetidos

---

Guardar automáticamente.

Sin botón de confirmación.

---

# 8. Perfil Público

URL:

/u/{username}

Ejemplo:

/u/spasiomike

---

Información pública

Username

Fecha de creación

Álbum actual

Progreso

Conseguidos

Faltantes

Repetidos

---

Secciones visibles

- Faltantes
- Repetidos

---

No mostrar email.

No mostrar identificadores internos.

---

# 9. Comparación entre Usuarios

## Condición

Solo disponible para usuarios autenticados.

---

Si visitante no autenticado:

Mostrar CTA:

"Regístrate para comparar vuestra colección."

---

## Usuario autenticado

Al visitar otro perfil:

Generar comparación automática.

---

Bloque 1

### Puedes darle

Mostrar cromos donde:

Mi cantidad > 1

y

El usuario cantidad = 0

---

Bloque 2

### Puede darte

Mostrar cromos donde:

Su cantidad > 1

y

Mi cantidad = 0

---

Bloque 3

### Resumen

Número total de posibles intercambios.

---

# 10. Modelo de Navegación

/

Landing

---

/login

Autenticación

---

/dashboard

Panel principal

---

/album/[albumId]

Colección

---

/u/[username]

Perfil público

---

# 11. Multiidioma

Idiomas soportados:

- Español
- Inglés

---

Idioma por defecto:

Detectado desde navegador.

Fallback:

Inglés.

---

Toda cadena de texto deberá estar externalizada.

Ejemplo:

locales/en.json

locales/es.json

---

# 12. Reglas de Negocio

## Username

Debe ser único.

No editable en MVP.

---

## Perfil Público

Siempre accesible.

---

## Comparación

Requiere autenticación.

---

## Cantidad de cromos

No puede ser negativa.

---

## Álbum

Un usuario puede tener múltiples álbumes activos.

Aunque inicialmente solo existirá uno.

---

# 13. Datos Iniciales

Álbum:

FIFA World Cup 2026

---

Total cromos:

980

---

Fuente:

CSV proporcionado por administración.

Campos:

- Código
- Nombre
- Sección
- Orden

---

# 14. Eventos Analíticos

user_registered

album_opened

sticker_updated

profile_viewed

comparison_viewed

---

# 15. Criterios de Aceptación MVP

Un usuario nuevo puede:

- Registrarse.
- Elegir username.
- Gestionar cromos.
- Ver progreso.
- Compartir perfil.
- Recibir visitas en su perfil.
- Comparar su colección con otra.

Sin necesidad de soporte manual.
