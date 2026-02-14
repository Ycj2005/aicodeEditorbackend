import groq from "groq";
import { groqapikey } from "../config/env.js";
import Groq from "groq-sdk";

export async function CallAI(prompt) {
  try {
    let client = new Groq({
      apiKey: groqapikey,
    });
    let chatCompilation = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      model: "llama-3.3-70b-versatile",
    });
    return chatCompilation.choices[0].message.content;
  } catch (error) {
    return { res: "chat not created something was wrong", error: error };
  }
}
