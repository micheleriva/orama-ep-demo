import React, { ReactElement } from "react"
import { getServerSideImplicitClient } from "../../lib/epcc-server-side-implicit-client"
import SearchInput from "../header/search/SearchInput"

export default async function OramaSearch(): Promise<ReactElement> {
  try {
    const EPCCClient = getServerSideImplicitClient();
    const { ORAMA_CLOUD_BASE_URL, ORAMA_CLOUD_PRIVATE_API_KEY  } = process.env;
    const {data} = await EPCCClient.ShopperCatalog.Get()
    const catalogId = data.attributes.catalog_id;
    const configResponse = await fetch(`${ORAMA_CLOUD_BASE_URL}/api/v1/indexes/get-elastic-configuration?catalogId=${catalogId}`, {
      headers: {
        Authorization: `Bearer ${ORAMA_CLOUD_PRIVATE_API_KEY}`
      }
    })
    const { index_id } = await configResponse.json()
    const indexResponse = await fetch(`${ORAMA_CLOUD_BASE_URL}/api/v1/indexes/get-index?id=${index_id}`, {
      headers: {
        Authorization: `Bearer ${ORAMA_CLOUD_PRIVATE_API_KEY}`
      }
    })
    const { api_key, api_endpoint } = await indexResponse.json()

    return <SearchInput endpoint={api_endpoint} api_key={api_key} />
  } catch (e: any) {
    return <div>{e.message}</div>
  }
}