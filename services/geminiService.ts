import { GoogleGenAI, Type } from "@google/genai";
import { AIStyleResponse } from "../types";

const createClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is not set");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const suggestQRStyle = async (context: string): Promise<AIStyleResponse | null> => {
  const ai = createClient();
  if (!ai) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Suggest a high-contrast foreground and background color for a QR code based on this context: "${context}".
      Ensure the colors have sufficient contrast to be scannable.
      Return JSON with 'fgColor' (hex) and 'bgColor' (hex).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fgColor: { type: Type.STRING, description: "The hex color code for the QR dots" },
            bgColor: { type: Type.STRING, description: "The hex color code for the background" },
            reasoning: { type: Type.STRING, description: "Short explanation of the choice" },
          },
          required: ["fgColor", "bgColor"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AIStyleResponse;
    }
    return null;
  } catch (error) {
    console.error("Error generating style:", error);
    return null;
  }
};
