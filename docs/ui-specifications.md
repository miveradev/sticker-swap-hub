# UI / Screen Specification v1

## Principios Globales

### Mobile First

Toda decisión de diseño se toma pensando primero en:

```
390px - 430px width
```

(iPhone 13/14/15 estándar)

---

### Desktop

No diseñamos una experiencia distinta.

Simplemente expandimos el layout.

---

### Filosofía

Queremos que parezca:

- rápida
- simple
- utilitaria

No queremos una red social.

No queremos una app corporativa.

Queremos una herramienta de coleccionistas.

---

# SCREEN 1 — Landing Page

## URL

```
/
```

---

## Objetivo

Explicar el producto en menos de 10 segundos.

---

## Estructura

### Header

Logo

Selector idioma

Botón Login

---

### Hero

Título:

```
Track your collection.
Find trading partners.
```

Subtítulo:

```
Manage your stickers and discover
possible swaps instantly.
```

CTA:

```
Continue with Google
```

---

### Features

3 bloques:

### Track

```
Keep track of your stickers
and duplicates.
```

---

### Share

```
Share your collection publicly.
```

---

### Compare

```
Find swaps in seconds.
```

---

### Footer

Links básicos.

---

# SCREEN 2 — Username Onboarding

## URL

```
/onboarding/username
```

---

## Objetivo

Obtener username único.

---

## Layout

Título:

```
Choose your username
```

Input:

```
@spasiomike
```

Validaciones inline.

---

Botón:

```
Continue
```

---

Estados:

### Disponible

```
✓ Username available
```

---

### No disponible

```
✕ Username already taken
```

---

# SCREEN 3 — Dashboard

## URL

```
/dashboard
```

---

## Objetivo

Resumen rápido.

---

## Layout

### Header

Avatar

Username

---

### Progress Card

```
72%
Completed
```

Progress bar.

---

### Stats Grid

2 columnas.

```
Owned
703
```

```
Missing
277
```

```
Duplicates
94
```

```
Total
980
```

---

### Actions

```
View Album
```

```
View Profile
```

---

# SCREEN 4 — Album

## URL

```
/album/wc2026
```

---

## Esta es LA pantalla principal

El usuario pasará aquí el 90% del tiempo.

---

# Layout

Header fijo:

```
World Cup 2026
```

Progreso:

```
72%
```

---

# Secciones

```
Opening Ceremony

Spain

Argentina

Brazil
```

---

# Grid

2 columnas móvil.

Ejemplo:

```
┌────────────┐
│ ESP10      │
│ Pedri      │
│            │
│     +      │
└────────────┘
```

---

Si cantidad > 0

```
┌────────────┐
│ ESP10      │
│ Pedri      │
│            │
│  - 4 +     │
└────────────┘
```

---

# Colores

No obtenido

```
Neutral
```

---

Obtenido

```
Accent
```

---

Repetidos

```
Accent + badge
```

---

# Comportamiento

Tap +

```
quantity +1
```

---

Tap -

```
quantity -1
```

---

Actualización inmediata.

Sin recargar.

---

# SCREEN 5 — Perfil Público

## URL

```
/u/spasiomike
```

---

## Objetivo

Compartir colección.

---

## Header

Avatar

Username

---

## Stats

Igual que dashboard.

---

## Sección

### Missing

Grid simple.

```
ESP10
ESP11
ESP12
```

---

### Duplicates

Grid simple.

```
ESP2 (+3)
ESP4 (+1)
```

---

# Visitante no logueado

Mostrar:

```
Want to compare collections?

Create your account.
```

Botón:

```
Continue with Google
```

---

# SCREEN 6 — Comparison View

## Contexto

Usuario autenticado visitando:

```
/u/other-user
```

---

## Bloque superior

```
Compatibility
```

---

## Métrica

```
15 possible swaps
```

---

# Sección 1

## You can give

```
ESP1
ESP5
ARG7
```

---

# Sección 2

## You can receive

```
BRA3
GER8
FRA4
```

---

# Empty State

```
No possible swaps found.
```

---

# Mobile Navigation

## MVP

Bottom nav.

---

### Tab 1

Dashboard

---

### Tab 2

Album

---

### Tab 3

Profile

---

Algo así:

```
Dashboard | Album | Profile
```

---

# Component Library

## Component: StickerCard

Props:

```
code
name
quantity
onIncrement
onDecrement
```

---

## Component: ProgressCard

Props:

```
owned
missing
duplicates
completion
```

---

## Component: ComparisonCard

Props:

```
give
receive
```

---

# Responsive Rules

## Mobile

```
2 columnas
```

---

## Tablet

```
3 columnas
```

---

## Desktop

```
4-5 columnas
```

---

# Estados que NO vamos a diseñar todavía

No MVP:

- Intercambios
- Mensajes
- Chat
- Notificaciones
- Matchmaking global
- Buscador avanzado

---

# Última recomendación antes de empezar

Yo añadiría una pantalla que no hemos mencionado todavía:

## 404 User Not Found

```
/u/random-user
```

↓

```
User not found
```

---

Y otra:

## Empty Collection

Usuario recién registrado.

```
You haven't added any stickers yet.

Start building your collection.
```
