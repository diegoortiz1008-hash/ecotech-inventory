import { useCallback, useEffect, useState } from 'react'
import { productService } from '../services'
import type { Product } from '../types'

const toMessage = (e: unknown) => (e instanceof Error ? e.message : 'Error desconocido')

/** Puente entre la capa de servicios y la UI. */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setProducts(await productService.getAll())
      setError(null)
    } catch (e) {
      setError(toMessage(e))
    } finally {
      setLoading(false)
    }
  }, [])

  // Carga inicial: sincroniza el estado con Supabase (sistema externo).
  useEffect(() => {
    let active = true
    productService
      .getAll()
      .then((data) => {
        if (active) setProducts(data)
      })
      .catch((e: unknown) => {
        if (active) setError(toMessage(e))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  /** Recarga manual (p. ej. tras crear un producto). */
  const refresh = useCallback(async () => {
    setLoading(true)
    await load()
  }, [load])

  return { products, loading, error, refresh }
}
