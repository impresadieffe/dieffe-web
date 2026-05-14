import { z } from 'zod';

export const SERVIZI = [
  'Rifacimento Tetti',
  'Facciate e Cappotti Termici',
  'Ristrutturazioni Complete',
  'Nuove Costruzioni',
  'Costruzioni in Bioedilizia',
  'Impianti Elettrici e Idraulici',
  'Altro',
] as const;

export const contactSchema = z.object({
  nome: z.string().min(2, 'Nome troppo breve'),
  cognome: z.string().min(2, 'Cognome troppo breve'),
  email: z.string().email('Email non valida'),
  telefono: z
    .string()
    .optional()
    .refine((v) => !v || /^[+\d\s\-()/]{7,15}$/.test(v), {
      message: 'Numero di telefono non valido',
    }),
  servizio: z.string().optional(),
  messaggio: z.string().min(10, 'Messaggio troppo breve (min. 10 caratteri)'),
  privacy: z
    .boolean()
    .refine((v) => v === true, { message: 'Devi accettare la privacy policy' }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
