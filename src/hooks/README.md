# hooks/ — Capa de Lógica

Custom hooks (`useXxx`) que encapsulan estado, efectos y casos de uso.
Exponen a la UI un contrato simple: `{ data, loading, error, acciones }`.

✅ Permitido: importar de `services/`, `types/`, `utils/`.
❌ Prohibido: devolver JSX o importar el cliente de Supabase directamente.
