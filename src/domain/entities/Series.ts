import { z } from 'zod'

export const SetsSchema = z.object({
  id: z.string(),
  logo: z.string().url().optional(),
  name: z.string(),
  symbol: z.string().url().optional(),
})

export const SeriesSchema = z.object({
  id: z.string(),
  logo: z.string().url(),
  name: z.string(),
  releaseDate: z.string().datetime(),
  sets: z.array(SetsSchema),
})

export type Series = z.infer<typeof SeriesSchema>
