import { PageLayout, ProductList } from '../components'
import { useProducts } from '../hooks'

/** Conecta lógica (hook) con presentación (componentes). */
export function InventoryPage() {
  const { products, loading, error } = useProducts()

  return (
    <PageLayout title="EcoTech · Inventario sostenible">
      {loading && <p>Cargando…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && <ProductList products={products} />}
    </PageLayout>
  )
}
