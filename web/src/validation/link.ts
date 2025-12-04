// src/validation/link.ts
import { z } from 'zod'

export const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .url('Informe uma URL válida.'),
  shortCode: z
    .string()
    .regex(
      /^[a-z0-9-]*$/, // * permite vazio
      'Informe uma url minúscula e sem espaço/caracter especial.'
    ),
})

export type CreateLinkInput = z.infer<typeof createLinkSchema>
