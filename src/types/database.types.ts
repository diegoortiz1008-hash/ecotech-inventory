/**
 * Tipos de la base de datos.
 * Archivo GENERADO: reemplazar con `npx supabase gen types typescript`.
 * Este placeholder refleja `supabase/migrations/0001_create_products.sql`.
 */
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          sku: string
          stock: number
          carbon_footprint_kg: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          sku: string
          stock?: number
          carbon_footprint_kg?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          sku?: string
          stock?: number
          carbon_footprint_kg?: number | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

export type ProductRow = Database["public"]["Tables"]["products"]["Row"]
