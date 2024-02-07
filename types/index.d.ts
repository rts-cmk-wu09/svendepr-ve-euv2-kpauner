import { z } from "zod"

export const SearchSchema = z.object({
  username: z.string().min(1, { message: "Query required" }),
})

export type SearchSchemaType = z.infer<typeof SearchSchema>
