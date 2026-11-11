# components/ — Capa de Presentación (UI)

Componentes **puros**: reciben datos por `props` y devuelven JSX.

| Subcarpeta | Contenido |
|---|---|
| `ui/` | Átomos reutilizables sin dominio: `Button`, `Input`, `Card`, `Spinner`. |
| `layout/` | Estructura de página: `Header`, `Sidebar`, `PageLayout`. |
| `inventory/` | Componentes del dominio: `ProductCard`, `ProductList`, `StockTable`. |

✅ Permitido: importar de `types/`, `utils/` y otros componentes.
❌ Prohibido: importar `services/`, el cliente de Supabase, usar `fetch` o reglas de negocio.
