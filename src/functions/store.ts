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

export const getDataFromStore = (): string | null => localStorage.getItem(localStoreKey)
export const saveDataToStore = (value: string) => localStorage.setItem(localStoreKey, value)

export const getSitesFromStore = (): Site[] => {
  const result = getDataFromStore()
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
