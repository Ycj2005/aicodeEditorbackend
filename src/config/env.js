import dotenv from "dotenv";

dotenv.config({
    path: '.env.dev',
});

export const PORT = process.env.PORT;
export const groqapikey = process.env.GROQ_API_KEY;