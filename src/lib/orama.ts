import { OramaClient } from "@oramacloud/client"

const ORAMA_ENDPOINT = process.env.NEXT_PUBLIC_ORAMA_ENDPOINT!
const ORAMA_API_KEY = process.env.NEXT_PUBLIC_ORAMA_PUBLIC_KEY!

export const orama = new OramaClient({
  endpoint: ORAMA_ENDPOINT,
  api_key: ORAMA_API_KEY,
})

orama.startHeartBeat({
  frequency: 3500
})
