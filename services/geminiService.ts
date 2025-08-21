
import { GoogleGenAI, Type } from "@google/genai";

// Ensure you have a .env file with API_KEY="your_api_key"
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getDailyGrowthPlan = async (): Promise<string[]> => {
  if (!API_KEY) {
    // Return placeholder data if API key is not set
    return [
      "Follow up with 5 old clients.",
      "Post a new offer on your WhatsApp status.",
      "Analyze yesterday's sales data for trends.",
      "Ask 3 happy customers for a referral.",
      "Clear pending payments with polite reminders.",
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "As an expert business consultant for Indian MSMEs, provide 5 actionable, simple, and impactful steps that a small business owner can take tomorrow to increase their turnover. The tone should be encouraging and practical. Provide just the steps.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: 'An actionable step for the business owner.'
              }
            }
          }
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result.steps || [];

  } catch (error) {
    console.error("Error fetching growth plan from Gemini API:", error);
    // Return placeholder data on error
    return [
      "Error fetching AI suggestions. Try checking your API key.",
      "Meanwhile, review your top-selling products.",
      "Plan a promotional activity for the weekend.",
      "Contact a high-value customer with a special offer.",
      "Update your business profile on online platforms.",
    ];
  }
};
