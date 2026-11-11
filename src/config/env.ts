/**
 * Único módulo que lee variables de entorno.
 * No lanza error al importar para que la app compile sin `.env`;
 * el cliente de Supabase valida la configuración al usarse.
 */
export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
} as const

export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey)
