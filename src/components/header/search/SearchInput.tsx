"use client"
import React, { ChangeEvent, Suspense, useState, ReactElement, ReactNode, useEffect } from "react"
import { OramaClient } from "@oramacloud/client"
import Link from "next/link"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

export default function SearchInput({ api_key, endpoint }: { api_key: string, endpoint: string }): JSX.Element {
  const [results, setResults] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const client = new OramaClient({
    endpoint,
    api_key
  })

  const onResultClick = () => {
    setSearchTerm("")
    setResults([])
  }

  const getSrc: (result: any) => string = (result: any) => result.document?.attributes?.extensions?.["products(extension)"]?.image_1 as string  || "/dummy.jpg"

  useEffect(() => {
    if (!searchTerm) {
      setResults([])
      return
    }
    const search = async () => {
      const results = await client.search({
        term: searchTerm,
        mode: "fulltext",
        limit: 5
      })

      setResults(results?.hits ?? [])
    }

    search()
  }, [searchTerm])

  return <div className="o__search-wrapper">
    <MagnifyingGlassIcon width={16} height={16} />
    <input
      className="o__input"
      type="text"
      onChange={e => setSearchTerm(e.target.value)} value={searchTerm}
      placeholder={"Start typing to search"}
    />
    {results.length > 0 && <ul className="o__results">
			<Suspense fallback={<div>Loading...</div>}>
        {results.map((result: any) => {
          return <li key={result.id} onClick={onResultClick}>
            <Link href={`/products/${result.document.id}`}>
              <div className="o__image-container">
                <img
                  src={getSrc(result)}
                  alt="image"
                />
              </div>
              <h3>{result.document.attributes.name}</h3>
            </Link>
          </li>
        })}
			</Suspense>
		</ul>}
  </div>
}