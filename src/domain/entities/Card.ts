import { effect } from 'vue'
import { z } from 'zod'

const VariantsSchema = z.object({
  firstEdition: z.boolean(),
  holo: z.boolean(),
  normal: z.boolean(),
  reverse: z.boolean(),
  wPromo: z.boolean(),
})

const AttackSchema = z.object({
  cost: z.array(z.string()),
  name: z.string(),
  damage: z.string(),
})

const WeaknessSchema = z.object({
  type: z.string(),
  value: z.string(),
})

const LegalSchema = z.object({
  standard: z.boolean(),
  expanded: z.boolean(),
})

const BoosterSchema = z.object({
  id: z.string(),
  name: z.string(),
})

const AbilitySchema = z.object({
  type: z.string(),
  name: z.string(),
  effect: z.string(),
})

export const CardSchema = z.object({
  category: z.string(),
  id: z.string(),
  illustrator: z.string(),
  image: z.string().url(),
  localId: z.string(),
  name: z.string(),
  rarity: z.string(),
  effect: z.string().optional(),
  variants: VariantsSchema,
  hp: z.number(),
  trainerType: z.string().optional(),
  types: z.array(z.string()),
  description: z.string(),
  stage: z.string(),
  suffix: z.string().optional(),
  abilities: z.array(AbilitySchema).optional(),
  attacks: z.array(AttackSchema),
  weaknesses: z.array(WeaknessSchema),
  retreat: z.number(),
  legal: LegalSchema,
  boosters: z.array(BoosterSchema),
  updated: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
})

export type Card = z.infer<typeof CardSchema>
