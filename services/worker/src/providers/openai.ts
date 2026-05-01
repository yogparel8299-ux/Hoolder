import OpenAI from "openai";

export async function runOpenAI(input: {
  apiKey?: string | null;
  systemPrompt?: string | null;
  role: string;
  title: string;
  description?: string | null;
  model: string;
}) {
  const apiKey = input.apiKey || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY missing. Add platform key or user BYOK key.");
  }

  const client = new OpenAI({ apiKey });

  const response = await client.responses.create({
    model: input.model || "gpt-4o-mini",
    input: [
      {
        role: "system",
        content:
          input.systemPrompt ||
          `You are a helpful AI agent. Your role is: ${input.role}.`
      },
      {
        role: "user",
        content: `
Task title:
${input.title}

Task description:
${input.description || "No description provided."}

Return a useful, structured, complete answer.
        `
      }
    ]
  });

  const output = response.output_text || "No output generated.";

  return {
    output,
    tokens_input: response.usage?.input_tokens || 0,
    tokens_output: response.usage?.output_tokens || 0,
    cost_usd: 0
  };
}
