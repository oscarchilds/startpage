import * as z from "zod"
import type { Site } from "@/types"

const siteZod: z.ZodType<Site> = z.object({
  name: z.string(),
  url: z.string(),
  get children() {
    return z.array(siteZod).optional()
  }
})

const localStoreKey = 'startpage-sites'

const tempLocalStoreData: Site[] = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    children: [
      {
        name: 'startpage',
        url: 'https://github.com/oscarchilds/startpage'
      }
    ]
  }
]

localStorage.setItem(localStoreKey, JSON.stringify(tempLocalStoreData))

export const getSitesFromStore = (): Site[] => {
  const result = localStorage.getItem(localStoreKey)
  if (!result) return []

  const resultAsJson = JSON.parse(result)
  const parsedResult = siteZod.array().safeParse(resultAsJson)

  if (parsedResult.success) {
    return parsedResult.data
  } else {
    console.error('Failed to parse localStorage data.')
    return []
  }
}
