# EcoTech Inventory 🌱

Andamiaje (scaffolding) inicial de la aplicación de **gestión de inventario sostenible** de *EcoTech Solutions*, construido con **React + TypeScript (Vite)** y preparado para **Supabase**, siguiendo el Desarrollo Basado en Especificaciones (SDD).

## Entregables

| # | Entregable | Archivo |
|---|---|---|
| 1 | Prompt Maestro (texto exacto + respuesta de la IA) | [`docs/PROMPT_MAESTRO.md`](docs/PROMPT_MAESTRO.md) |
| 2 | Árbol de directorios | [`docs/ARBOL_DIRECTORIOS.md`](docs/ARBOL_DIRECTORIOS.md) |
| 3 | Especificación de arquitectura | [`ARCHITECTURE.md`](ARCHITECTURE.md) |

Cada carpeta principal de `src/` (`components`, `hooks`, `services`, `types`, `context`, etc.) incluye un `README.md` y un `index.ts` que explican qué debe ir en ella.

## Arquitectura en una línea

```
components / pages  →  hooks / context  →  services  →  services/supabase  →  Supabase
```

Un componente **nunca** habla con Supabase: solo la capa `services/` lo hace.

## Comando usado para crear la estructura

```bash
mkdir -p supabase/migrations src/{components/{ui,layout,inventory},pages,hooks,context,services/{supabase,inventory},types,config,utils,styles}
```

## Cómo ejecutar

```bash
npm install
cp .env.example .env   # completar con la URL y la anon key de Supabase
npm run dev
```

Sin `.env` la app compila y muestra un mensaje indicando que falta configurar Supabase.

Para crear la tabla de ejemplo, ejecuta [`supabase/migrations/0001_create_products.sql`](supabase/migrations/0001_create_products.sql) en el SQL Editor de Supabase.

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Verificación de tipos + build de producción |
| `npm run lint` | Linter (oxlint) |
