import { z } from "zod"

export const AuthSchema = z.object({
  username: z.string().min(1, { message: "Username required" }),
  password: z.string().min(5, { message: "Password has to be atleast 5 characters" }),
})

export type AuthSchemaType = z.infer<typeof AuthSchema>
