import { z } from 'zod';
export const searchSchema=z.object({from:z.string().min(2),to:z.string().min(2),date:z.string().min(8),travellers:z.coerce.number().int().min(1).max(9),mode:z.string().default('all')});
export const passengerSchema=z.object({fullName:z.string().min(2),age:z.coerce.number().int().min(1).max(120),gender:z.string().min(1),email:z.string().email(),phone:z.string().min(10)});
