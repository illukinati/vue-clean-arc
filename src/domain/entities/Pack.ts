import { z } from 'zod'
import { id } from 'zod/v4/locales'

export const CardCountSchema = z.object({
  firstEd: z.number(),
  holo: z.number(),
  normal: z.number(),
  official: z.number(),
  reverse: z.number(),
  total: z.number(),
})

export const BoosterSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const PackSchema = z.object({
  cardCount: CardCountSchema,
  id: z.string(),
  logo: z.string().url().optional(),
  name: z.string(),
  releaseDate: z.string().datetime(),
  boosters: z.array(BoosterSchema),
})

export type Pack = z.infer<typeof PackSchema>
