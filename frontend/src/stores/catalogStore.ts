import { create } from 'zustand'
import {
  getProductDocs,
  getServiceDocs,
  type ProductDoc,
  type ServiceDoc,
  type StoreUpdateKind,
  CATALOG_LOCALSTORAGE_KEYS,
} from '../data/store'

export type { ProductDoc, ServiceDoc }

type CatalogState = {
  products: ProductDoc[]
  services: ServiceDoc[]
  /** Re-read catalogs from localStorage (same source as `store.ts`) */
  syncCatalogFromPersistence: () => void
}

function readCatalog(): { products: ProductDoc[]; services: ServiceDoc[] } {
  return {
    products: getProductDocs(),
    services: getServiceDocs(),
  }
}

export const useCatalogStore = create<CatalogState>((set) => ({
  ...readCatalog(),
  syncCatalogFromPersistence: () => set(readCatalog()),
}))

function attachCatalogSyncListeners() {
  if (typeof window === 'undefined') return
  const w = window as Window & { __motorcycleCatalogSyncAttached?: boolean }
  if (w.__motorcycleCatalogSyncAttached) return
  w.__motorcycleCatalogSyncAttached = true

  const sync = () => {
    useCatalogStore.getState().syncCatalogFromPersistence()
  }

  window.addEventListener('motorcycle_store_update', (e: Event) => {
    const ce = e as CustomEvent<{ kind?: StoreUpdateKind }>
    const kind = ce.detail?.kind
    if (kind === 'products' || kind === 'services') sync()
  })

  window.addEventListener('storage', (ev: StorageEvent) => {
    if (
      ev.key === CATALOG_LOCALSTORAGE_KEYS.products ||
      ev.key === CATALOG_LOCALSTORAGE_KEYS.services
    ) {
      sync()
    }
  })
}

attachCatalogSyncListeners()
