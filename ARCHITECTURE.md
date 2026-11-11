# Especificación de Arquitectura — EcoTech Inventory

## 1. Problema que resuelve

El equipo de EcoTech Solutions es junior y tiende a llamar a la base de datos desde los componentes, mezclando JSX, estado y reglas de negocio en el mismo archivo. El resultado es código difícil de probar, tipos duplicados y errores que aparecen en cualquier pantalla cuando cambia una tabla. Siguiendo el **Desarrollo Basado en Especificaciones (SDD)**, este documento es el *plano*: se define antes de escribir código para que cada archivo nuevo tenga un lugar obvio y una única responsabilidad.

## 2. Estructura elegida: capas con dependencia unidireccional

```
components / pages  →  hooks / context  →  services  →  services/supabase  →  Supabase
      (UI)                (lógica)          (datos)        (cliente único)
```

| Capa | Carpeta | Regla |
|---|---|---|
| Presentación | `components/`, `pages/` | Reciben props y renderizan. Nunca importan servicios ni Supabase. |
| Lógica | `hooks/`, `context/` | Orquestan estado (`data`, `loading`, `error`) y casos de uso. No contienen JSX de negocio. |
| Servicios | `services/` | Única capa autorizada para hacer CRUD, Auth o Storage. No usan React. |
| Integración | `services/supabase/` | Crea **un solo** cliente tipado de Supabase. |
| Contratos | `types/` | Modelos de dominio y tipos generados de la base de datos. |
| Soporte | `config/`, `utils/`, `styles/` | Variables de entorno validadas, funciones puras y estilos globales. |

Se eligió una arquitectura por **capas técnicas** (y no por *features*) porque el proyecto está en su fase inicial y el equipo necesita reglas simples y visibles. Dentro de `components/` y `services/` ya existen subcarpetas de dominio (`inventory/`), lo que permite migrar a una organización por *features* cuando el producto crezca, sin romper la regla de dependencias.

## 3. Relación con Supabase (capa de servicios)

1. **Cliente único** — `services/supabase/client.ts` crea el cliente con `createClient<Database>()` a partir de `config/env.ts`. Ningún otro archivo llama a `createClient`, así que cambiar la URL, las claves o añadir opciones de Auth se hace en un solo lugar.
2. **Servicios por entidad** — `services/inventory/productService.ts` expone funciones como `getProducts()` o `updateStock()`. Traducen filas de la base de datos (`snake_case`) a modelos de dominio (`camelCase`) y lanzan errores con mensajes claros. Si una columna cambia, solo se modifica el *mapper*.
3. **Tipos generados** — `types/database.types.ts` se regenera con `npx supabase gen types typescript`. Así el compilador detecta inmediatamente cualquier desajuste entre el frontend y el esquema.
4. **Migraciones versionadas** — `supabase/migrations/` guarda el SQL de tablas y políticas **RLS** junto al código, por lo que la seguridad de los datos también se revisa en los *pull requests*.
5. **Hooks como puente** — `hooks/useProducts.ts` consume el servicio y entrega estado listo para la UI. Un componente solo hace `const { products, loading } = useProducts()`.

## 4. Cómo evita deuda técnica

- **Cambio aislado:** migrar de Supabase a otra API, o añadir caché, afecta a `services/`, no a decenas de componentes.
- **Testabilidad:** los servicios se pueden *mockear* en los tests de hooks y los componentes se prueban solo con props.
- **Onboarding rápido:** cada carpeta tiene un `README.md` con lo permitido y lo prohibido, así un junior sabe dónde poner su código sin preguntar.
- **Seguridad:** las claves solo se leen en `config/env.ts`, y el `.env` está en `.gitignore`. Solo se usa la clave pública `anon`; la protección real vive en las políticas RLS.

## 5. Reglas de oro para el equipo

1. Un componente **nunca** importa desde `services/`.
2. Un servicio **nunca** importa React.
3. Todo dato que cruza capas tiene un tipo en `types/`.
4. Si no sabes dónde va un archivo, lee el `README.md` de la carpeta antes de crearlo.
