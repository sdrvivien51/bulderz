import * as z from 'zod';

export const profileSchema = z.object({
  personalInfo: z.object({
    firstName: z
      .string()
      .min(2, 'Le prénom doit contenir au moins 2 caractères'),
    lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    age: z.number().min(16).max(100),
    tagline: z.string().max(100),
    description: z.string().max(500)
  }),
  skills: z.object({
    tools: z.array(z.string()).min(1),
    softSkills: z.array(z.string()).max(3)
  }),
  certifications: z.array(
    z.object({
      title: z.string().min(2),
      organization: z.string().min(2),
      date: z.string(),
      url: z.string().url().optional()
    })
  ),
  experiences: z.array(
    z.object({
      title: z.string().min(2),
      company: z.string().min(2),
      startDate: z.string(),
      endDate: z.string().optional(),
      current: z.boolean().default(false),
      description: z.string()
    })
  )
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
