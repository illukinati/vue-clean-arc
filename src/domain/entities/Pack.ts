import { z } from 'zod'

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

export const CardSchema = z.object({
  id: z.string(),
  image: z.string().url(),
  localeId: z.string(),
  name: z.string(),
})

export const PackSchema = z.object({
  cardCount: CardCountSchema,
  id: z.string(),
  logo: z.string().url().optional(),
  name: z.string(),
  releaseDate: z.string().datetime(),
  boosters: z.array(BoosterSchema),
  cards: z.array(CardSchema),
})

export type Pack = z.infer<typeof PackSchema>
