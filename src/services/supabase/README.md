# services/supabase/ — Integración con Supabase

- `client.ts`: crea **una sola instancia** de `SupabaseClient<Database>` usando `config/env.ts`.
- Aquí irían helpers transversales (manejo de errores de PostgREST, suscripciones Realtime).

Para regenerar los tipos de la base de datos:

```bash
npx supabase gen types typescript --project-id <ID_PROYECTO> > src/types/database.types.ts
```
