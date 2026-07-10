import { z } from 'zod'

export const CollegeLoginSchema = z.object({
  name: z.string().max(19, "Name must be less than 20 characters").min(1, "Name is required"),
  rollno: z.string().min(11, "Roll number must be greater than 10 characters").regex(/^[a-zA-Z0-9]+$/, "Roll number must be alphanumeric"),
  dept: z.enum(['cse', 'ece', 'ds', 'ailm'], { required_error: "Department is required" }),
  email: z.string().email("Invalid email format").min(9, "Email must be greater than 8 characters"),
  login: z.string().min(1, "Login information is required")
})

// TypeScript type — inferred for free
export type CollegeLogin = z.infer<typeof CollegeLoginSchema>

export function validateCollegeLogin(input: unknown) {
  return CollegeLoginSchema.safeParse(input)
}
