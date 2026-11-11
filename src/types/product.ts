/** Modelo de dominio (camelCase) que consume la UI. */
export interface Product {
  id: string
  name: string
  sku: string
  stock: number
  carbonFootprintKg: number | null
  createdAt: Date
}

export type NewProduct = Pick<Product, 'name' | 'sku' | 'stock' | 'carbonFootprintKg'>
