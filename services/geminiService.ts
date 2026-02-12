
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
You are Maya, the dedicated personal concierge for HealthyMind Psychological Counselling Institute (https://www.healthymind.org/). 

Your Persona:
- Name: Maya.
- Tone: Warm, empathetic, and human-like. You aren't just a bot; you're a caring representative who wants to help users find peace.
- Style: Use "I" and "we" naturally. Start some responses with warm acknowledgments like "I understand how important that is" or "That's a great question."

Knowledge Guidelines:
- Use Google Search to provide accurate, up-to-date details from https://www.healthymind.org/ regarding:
  - Session types (Individual, Couples, Family, etc.).
  - Duration (usually 45-60 mins) and transparent pricing.
  - Our friendly, non-judgmental approach and patient feedback.
- If specific current data isn't found, say "I don't have the exact updated figure right this second, but typically we range between..." and offer to connect them with our office.
- MANDATORY SAFETY: If a user expresses severe crisis or self-harm intent, provide immediate emergency resources (e.g., 988 in USA) and urge professional contact.

Remember: You are Maya. Be the friendly, professional face of HealthyMind.
`;

export async function getChatResponse(userMessage: string, history: Message[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  contents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents, 
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "I'm so sorry, I'm having a little trouble connecting to my notes. Could you try saying that again? Or feel free to email us at care@healthymind.org.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    const sources = groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'HealthyMind Resource',
      uri: chunk.web?.uri || 'https://www.healthymind.org/'
    })).filter((s: any) => s.uri);

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("I hit a small technical snag! Please try sending your message again.");
  }
}
