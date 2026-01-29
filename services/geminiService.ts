
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBondInsight = async (bondName: string, issuer: string, ytm: number) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a 2-sentence investment insight for an Indian bond named "${bondName}" issued by "${issuer}" with a Yield to Maturity (YTM) of ${ytm}%. Focus on safety and suitability for retail investors. Keep it professional and concise.`,
      config: {
        temperature: 0.7,
      },
    });
    return { text: response.text, sources: [] };
  } catch (error) {
    console.error("Gemini insight failed:", error);
    return { text: "This bond offers a competitive fixed income opportunity within its rating class.", sources: [] };
  }
};

export const getMarketOutlook = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "What are the current Indian 10-year G-Sec yields and latest RBI repo rate today? Summarize in 2 short, professional sentences for a bond investor.",
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      }
    });
    
    // Extract search citations if available
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({ title: chunk.web.title, uri: chunk.web.uri }));

    return { 
      text: response.text || "Market yields remain stable; RBI policy is currently cautious.",
      sources: sources.slice(0, 2)
    };
  } catch (error) {
    return { 
      text: "Market yields remain stable; RBI policy is cautious. Excellent entry point for long-term seekers.",
      sources: []
    };
  }
};
