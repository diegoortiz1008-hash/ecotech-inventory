import type { Product } from '../../types'
import { formatCarbon } from '../../utils'

interface ProductListProps {
  products: Product[]
}

/** Componente puro: solo recibe props. No sabe que existe Supabase. */
export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) return <p>No hay productos registrados.</p>
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <strong>{p.name}</strong> ({p.sku}) · stock: {p.stock} · {formatCarbon(p.carbonFootprintKg)}
        </li>
      ))}
    </ul>
  )
}
