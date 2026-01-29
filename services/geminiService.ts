
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBondInsight = async (bondName: string, issuer: string, ytm: number) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a 2-sentence investment insight for an Indian bond named "${bondName}" issued by "${issuer}" with a Yield to Maturity (YTM) of ${ytm}%. Focus on safety and suitability for retail investors. Keep it professional and concise.`,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini insight failed:", error);
    return "This bond offers a competitive fixed income opportunity within its rating class. Consult a financial advisor for detailed suitability.";
  }
};

export const getMarketOutlook = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Summarize the current Indian Debt Market outlook (RBI policy, yields, inflation) in 3 bullet points for a retail investor. Use a professional, slightly optimistic tone.",
      config: {
        temperature: 0.5,
      }
    });
    return response.text;
  } catch (error) {
    return "Market yields remain stable; RBI policy is cautious; Excellent entry point for long-term fixed income seekers.";
  }
};
