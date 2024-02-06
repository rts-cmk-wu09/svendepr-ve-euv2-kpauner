import { z } from "zod"

export const RegisterUserSchema = z
  .object({
    email: z
      .string()
      .min(5, {
        message: "Email should be at least 5 characters long",
      })
      .email(),
    password: z.string().min(6, {
      message: "password must be atleast 6 characters long",
    }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "passwords do not match",
    path: ["passwordConfirm"],
  })

export type RegisterUserType = z.infer<typeof RegisterUserSchema>
