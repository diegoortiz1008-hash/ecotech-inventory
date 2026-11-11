# Prompt Maestro

Prompt exacto usado con una IA (Claude) para generar la arquitectura de carpetas del proyecto.

---

```text
## ROL
Actúa como un Arquitecto de Software Senior especializado en aplicaciones frontend con
React + TypeScript y backends BaaS (Supabase). Tu prioridad es la mantenibilidad, la
escalabilidad y que un equipo de desarrolladores JUNIOR no pueda mezclar lógica de negocio
con la interfaz por accidente.

## CONTEXTO
Startup: "EcoTech Solutions".
Producto: aplicación web de gestión de inventario sostenible (productos, categorías,
proveedores, movimientos de stock e indicadores de huella de carbono).
Stack fijo (no proponer alternativas):
- React 19 + TypeScript (modo strict) creado con Vite.
- Supabase (PostgreSQL, Auth, Storage, Realtime) mediante @supabase/supabase-js.
Problema actual: el equipo llama a la base de datos directamente desde los componentes,
duplica tipos y mezcla estado, efectos y JSX, lo que genera errores constantes.
Metodología: Desarrollo Basado en Especificaciones (SDD): primero el plano, luego el código.

## TAREA
Diseña la estructura de carpetas ideal para `src/` (y la raíz del proyecto) aplicando
Separación de Preocupaciones en estas capas:
1. UI (presentación): componentes que solo reciben props y renderizan.
2. Lógica: custom hooks y contextos que orquestan estado y casos de uso.
3. Servicios: única capa autorizada para hablar con Supabase / APIs externas.
4. Tipos: modelos de dominio y tipos generados de la base de datos.
Además incluye OBLIGATORIAMENTE una carpeta específica para la integración con Supabase
(cliente único, configuración y tipos generados) y una carpeta en la raíz para
migraciones SQL.

## RESTRICCIONES
- Máximo 3 niveles de profundidad dentro de `src/`.
- Nombres de carpetas en inglés, en minúsculas y kebab-case.
- Regla de dependencias unidireccional: components -> hooks/context -> services -> supabase.
  Un componente NUNCA importa el cliente de Supabase.
- Las variables de entorno solo se leen en un único módulo de configuración.
- Nada de librerías extra (sin Redux, sin React Query) en esta fase.
- Cada carpeta principal debe tener un `index.ts` (barrel) o un `README.md` que explique
  qué se permite y qué está prohibido dentro de ella.

## FORMATO DE SALIDA
Responde exactamente con estas 4 secciones en Markdown:
1. **Árbol de directorios** en un bloque de código (formato `tree`), con un comentario
   corto (#) al lado de cada carpeta.
2. **Tabla de responsabilidades**: | Carpeta | Responsabilidad | Puede importar de | Prohibido |
3. **Comando de creación**: un único comando `mkdir -p` (bash) listo para copiar y pegar
   que cree TODAS las carpetas.
4. **Justificación**: máximo 5 viñetas explicando cómo la estructura facilita la
   integración con Supabase y evita deuda técnica.
No incluyas código de componentes ni explicaciones fuera de esas secciones.
```

---

## Respuesta de la IA (resumen)

### 1. Árbol propuesto

```text
ecotech-inventory/
├── supabase/
│   └── migrations/          # SQL versionado del esquema (tablas, RLS, políticas)
└── src/
    ├── components/          # UI pura (props in -> JSX out)
    │   ├── ui/              # Átomos reutilizables: Button, Input, Card
    │   ├── layout/          # Estructura: Header, Sidebar, PageLayout
    │   └── inventory/       # Componentes de dominio: ProductCard, StockTable
    ├── pages/               # Pantallas que componen componentes + hooks
    ├── hooks/               # Lógica y estado: useProducts, useAuth
    ├── context/             # Estado global (AuthContext)
    ├── services/            # Acceso a datos (única capa que toca Supabase)
    │   ├── supabase/        # Cliente único + helpers de la integración
    │   └── inventory/       # productService, categoryService...
    ├── types/               # Modelos de dominio + tipos generados de la BD
    ├── config/              # Lectura y validación de variables de entorno
    ├── utils/               # Funciones puras sin efectos (formateo, cálculos CO2)
    └── styles/              # Estilos globales y tokens
```

### 2. Tabla de responsabilidades

| Carpeta | Responsabilidad | Puede importar de | Prohibido |
|---|---|---|---|
| `components/` | Renderizar UI | `types`, `utils`, otros `components` | `services`, Supabase, fetch |
| `pages/` | Componer pantallas | `components`, `hooks`, `context` | `services` directo |
| `hooks/` | Estado y casos de uso | `services`, `types`, `utils` | JSX, cliente Supabase |
| `context/` | Estado global compartido | `hooks`, `services`, `types` | Lógica de UI |
| `services/` | CRUD, Auth, Storage | `services/supabase`, `types`, `config` | React (hooks, JSX) |
| `services/supabase/` | Cliente único | `config`, `types` | Lógica de negocio |
| `types/` | Contratos de datos | — | Código ejecutable |
| `config/` | Variables de entorno | — | Lógica de negocio |
| `utils/` | Funciones puras | `types` | Efectos secundarios |

### 3. Comando de creación

```bash
mkdir -p supabase/migrations src/{components/{ui,layout,inventory},pages,hooks,context,services/{supabase,inventory},types,config,utils,styles}
```

### 4. Justificación

- Un único punto de contacto con Supabase (`services/supabase/client.ts`) permite cambiar claves, añadir interceptores o mockear en tests sin tocar la UI.
- Los servicios devuelven tipos de dominio, no filas crudas: si cambia el esquema, solo se ajusta un mapper.
- Los hooks encapsulan `loading/error/data`, así los juniors consumen datos sin escribir efectos.
- `types/database.types.ts` se regenera con `supabase gen types`, manteniendo frontend y BD sincronizados.
- `supabase/migrations` versiona el esquema y las políticas RLS junto al código.
