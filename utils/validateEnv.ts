import { z } from "zod";

const envSchema = z.object({
    TALKI_RTC_SERVER: z.string().url(),
    BACKEND_SERVER: z.string().url(),
});

const env = envSchema.parse({
    TALKI_RTC_SERVER: process.env.TALKI_RTC_SERVER,
    BACKEND_SERVER: process.env.BACKEND_SERVER,
});

export default env;
