import { OramaClient } from "@oramacloud/client"
import { useEffect, useState } from "react"
import { Results } from "@orama/orama"
import { useStore } from "@elasticpath/react-shopper-hooks"
import { usePathname } from "next/navigation"
import { useProducts } from "../components/search/ProductsProvider"

const ORAMA_ENDPOINT = process.env.NEXT_PUBLIC_ORAMA_ENDPOINT!
const ORAMA_API_KEY = process.env.NEXT_PUBLIC_ORAMA_PUBLIC_KEY!

export function useOramaHits() {
  const { page } = useProducts()
  const [oramaHits, setOramaHits] = useState<Results>(null)
  const { nav, client } = useStore();
  const pathname = usePathname()
  const urlSegments = pathname.split("/")
  const categoryId = nav?.[0].children.find(child => child.slug === urlSegments[urlSegments.length - 1])?.id || nav?.[0]?.id
  const limit = page.meta.page.limit
  const offset = page.meta.page.offset

  useEffect(() => {
    const getProducts = async () => {
      if(!!categoryId) {
        const results = await orama.search({
          term: categoryId,
          mode: "fulltext",
          limit: limit ? parseInt(limit) : 25,
          offset: offset ? parseInt(offset) : 0,
          threshold: 0
        })

        setOramaHits(results)
      }
    }

    getProducts()
  }, [page.meta.page.limit, page.meta.page.offset, categoryId])

  return oramaHits
}

export const orama = new OramaClient({
  endpoint: ORAMA_ENDPOINT,
  api_key: ORAMA_API_KEY,
})

orama.startHeartBeat({
  frequency: 3500
})
