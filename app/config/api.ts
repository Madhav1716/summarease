import OpenAI from "openai";

// API URL configuration
export const API_URL = "https://aisummarybackend.onrender.com";

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // This is needed for Expo/React Native
});

// API configuration
export const API_CONFIG = {
  model: "gpt-3.5-turbo",
  maxTokens: 1000,
  temperature: 0.7,
};

// Helper function to generate PDF summary
export async function generateSummary(text: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes PDF documents.",
        },
        {
          role: "user",
          content: `Please summarize the following text:\n\n${text}`,
        },
      ],
    });
    return response.choices[0]?.message?.content || "No summary generated";
  } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
}

// Helper function to generate chat response
export async function generateChatResponse(
  messages: { role: "user" | "assistant"; content: string }[]
) {
  try {
    const response = await openai.chat.completions.create({
      model: API_CONFIG.model,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that answers questions about PDF documents. Provide clear, accurate, and concise responses.",
        },
        ...messages,
      ],
      max_tokens: API_CONFIG.maxTokens,
      temperature: API_CONFIG.temperature,
    });

    return response.choices[0]?.message?.content || "No response generated";
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw error;
  }
}

// Default export for route
export default {
  generateSummary,
  generateChatResponse,
  API_CONFIG,
};
