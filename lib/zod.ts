import { z } from "zod";

export const loginSchema = z.object({
    email: z.string({
        message: "Invalid email address",
    }).email(),
    password: z.string({
        message: "Password must be at least 6 characters long",
    }).min(6),
});

export const registerSchema = z.object({
    name: z.string({
        message: "Name must be at least 2 characters long",
    }).min(2),
    email: z.string({
        message: "Invalid email address",
    }).email(),
    password: z.string({
        message: "Password must be at least 6 characters long",
    }).min(6),
});