# Data Flow Document v1

## Filosofía

Vamos a seguir una arquitectura basada en:

```
UI
 ↓
Server Actions
 ↓
Prisma
 ↓
PostgreSQL
```

No vamos a crear una API REST tradicional porque:

- No la necesitamos.
- Añade complejidad.
- Next.js Server Actions encajan perfectamente.

---

# Entidades

## User

```
User
```

---

## Album

```
Album
```

---

## Sticker

```
Sticker
```

---

## UserSticker

```
UserSticker
```

---

# Feature: Authentication

---

## Action: getCurrentUser

### Objetivo

Obtener usuario autenticado.

### Input

Nada.

### Output

```
User|null
```

---

## Action: createUserIfNotExists

### Trigger

Primer login Google.

### Input

```
{
email:string
image?:string
}
```

### Output

```
User
```

---

## Action: setUsername

### Input

```
{
username:string
}
```

### Validaciones

- único
- longitud
- caracteres permitidos

### Output

```
User
```

---

## Action: checkUsernameAvailability

### Input

```
{
username:string
}
```

### Output

```
{
available:boolean
}
```

---

# Feature: Album

---

## Query: getAlbum

### Input

```
albumCode
```

### Output

```
Album
```

---

## Query: getAlbumStickers

### Input

```
albumCode
```

### Output

```
Sticker[]
```

---

## Query: getAlbumWithUserData

### Input

```
albumCode
userId
```

### Output

```
AlbumWithStickerState
```

Ejemplo:

```
[
  {
    code:"ESP10",
    name:"Pedri",
    quantity:4
  }
]
```

---

# Feature: Sticker Management

---

## Action: incrementSticker

### Input

```
{
stickerId:string
}
```

---

### Lógica

```
No existe → crear quantity=1

Existe → quantity+1
```

---

### Output

```
{
quantity:number
}
```

---

## Action: decrementSticker

### Input

```
{
stickerId:string
}
```

---

### Lógica

```
quantity-1

Si llega a 0:

eliminar UserSticker
```

---

### Output

```
{
quantity:number
}
```

---

# Feature: Dashboard

---

## Query: getUserAlbumStats

### Input

```
userId
albumId
```

### Output

```
{
owned:number
missing:number
duplicates:number
completion:number
}
```

---

### Ejemplo

```
{
owned:703,
missing:277,
duplicates:94,
completion:71.7
}
```

---

# Feature: Public Profile

---

## Query: getProfileByUsername

### Input

```
username
```

### Output

```
Profile
```

---

## Query: getPublicCollection

### Input

```
username
albumCode
```

### Output

```
{
stats,
duplicates,
missing
}
```

---

# Feature: Comparison Engine

---

## Query: compareUsers

### Input

```
{
viewerId
profileUserId
albumId
}
```

---

### Output

```
{
canGive:Sticker[]
canReceive:Sticker[]
totalMatches:number
}
```

---

## Regla de negocio

### canGive

```
viewer.quantity > 1

AND

profile.quantity = 0
```

---

### canReceive

```
profile.quantity > 1

AND

viewer.quantity = 0
```

---

# Feature: Navigation

---

## Query: getUserProfileUrl

### Input

```
userId
```

### Output

```
/ u /username
```

---

# Feature: Album Import

(No MVP runtime)

---

## Script: importAlbumCsv

### Input

CSV

```
code,name,section,position
```

---

### Output

```
Album created
980 stickers inserted
```

---

# Caching Strategy

## NO cachear todavía

No necesitamos:

- Redis
- Upstash
- Memcached

---

Porque:

```
980 cromos
```

es muy poco volumen.

---

# Revalidation Strategy

Después de:

```
incrementSticker
decrementSticker
```

---

Ejecutar:

```
revalidatePath("/album/[albumCode]")
```

o equivalente.

---

# Error Handling

---

## Username

```
USERNAME_TAKEN
```

---

## Album

```
ALBUM_NOT_FOUND
```

---

## Profile

```
USER_NOT_FOUND
```

---

## Sticker

```
STICKER_NOT_FOUND
```

---

# Security Rules

---

## Increment Sticker

Requiere:

```
authenticated user
```

---

## Decrement Sticker

Requiere:

```
authenticated user
```

---

## Compare Users

Requiere:

```
authenticated user
```

---

## Public Profile

No requiere login.

---

# Vertical Slice Development Plan

Aquí está la clave para que avances rápido.

No desarrolles por capas.

Desarrolla por funcionalidad completa.

---

## Slice 1

Auth

Resultado:

```
Login Google
Username
Dashboard vacío
```

---

## Slice 2

Álbum

Resultado:

```
Ver álbum
Modificar cromos
Persistencia
```

---

## Slice 3

Dashboard

Resultado:

```
Estadísticas funcionando
```

---

## Slice 4

Perfil público

Resultado:

```
/u/username
```

---

## Slice 5

Comparación

Resultado:

```
You can give
You can receive
```

---