import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env, isSupabaseConfigured } from '../../config'
import type { Database } from '../../types'

let client: SupabaseClient<Database> | null = null

/** Devuelve la instancia ÚNICA del cliente de Supabase. */
export function getSupabaseClient(): SupabaseClient<Database> {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase no está configurado: define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env',
    )
  }
  client ??= createClient<Database>(env.supabaseUrl, env.supabaseAnonKey)
  return client
}
