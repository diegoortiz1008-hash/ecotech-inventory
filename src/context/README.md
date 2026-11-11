# context/ — Estado Global

React Contexts para estado compartido entre muchas pantallas
(sesión de usuario con Supabase Auth, preferencias, tema).

Cada contexto exporta el `Provider` y un hook `useXxxContext()` que lanza error si se usa fuera del Provider.

✅ Permitido: `hooks/`, `services/`, `types/`.
❌ Prohibido: guardar en contexto datos que solo usa una pantalla (usar un hook local).
