import { getSupabaseClient } from '../supabase'
import type { NewProduct, Product, ProductRow } from '../../types'

/** Mapper: fila de BD (snake_case) -> modelo de dominio (camelCase). */
const toProduct = (row: ProductRow): Product => ({
  id: row.id,
  name: row.name,
  sku: row.sku,
  stock: row.stock,
  carbonFootprintKg: row.carbon_footprint_kg,
  createdAt: new Date(row.created_at),
})

export const productService = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await getSupabaseClient()
      .from('products')
      .select('*')
      .order('name')
    if (error) throw new Error(`No se pudieron cargar los productos: ${error.message}`)
    return data.map(toProduct)
  },

  async create(input: NewProduct): Promise<Product> {
    const { data, error } = await getSupabaseClient()
      .from('products')
      .insert({
        name: input.name,
        sku: input.sku,
        stock: input.stock,
        carbon_footprint_kg: input.carbonFootprintKg,
      })
      .select()
      .single()
    if (error) throw new Error(`No se pudo crear el producto: ${error.message}`)
    return toProduct(data)
  },
}
