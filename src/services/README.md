# services/ — Capa de Servicios (Acceso a Datos)

**Única capa autorizada para comunicarse con Supabase** (Database, Auth, Storage, Realtime).

| Subcarpeta | Contenido |
|---|---|
| `supabase/` | Cliente único tipado (`client.ts`). Nadie más llama a `createClient`. |
| `inventory/` | Servicios por entidad: `productService`, `categoryService`... |

Reglas:
- Funciones `async` que devuelven **modelos de dominio** (`types/`), no filas crudas.
- Traducen `snake_case` (BD) a `camelCase` (app) mediante *mappers*.
- Lanzan `Error` con mensajes claros cuando Supabase devuelve `error`.

❌ Prohibido: importar React, hooks o componentes.
