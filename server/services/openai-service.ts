import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable must be set");
}

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface EmailSuggestion {
  subject: string;
  message: string;
}

export async function generateEmailTemplate(prompt: {
  purpose: string;
  tone?: "professional" | "casual" | "friendly";
  additionalContext?: string;
}): Promise<EmailSuggestion> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert email writer. Generate a professional email template based on the given purpose and tone. Respond with JSON containing 'subject' and 'message' fields.",
        },
        {
          role: "user",
          content: `Generate an email with the following details:
            Purpose: ${prompt.purpose}
            Tone: ${prompt.tone || "professional"}
            Additional Context: ${prompt.additionalContext || ""}
          `,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content || '{"subject": "", "message": ""}';
    const suggestion = JSON.parse(content);

    return {
      subject: suggestion.subject || "",
      message: suggestion.message || "",
    };
  } catch (error) {
    console.error("Error generating email template:", error);
    throw new Error("Failed to generate email template");
  }
}