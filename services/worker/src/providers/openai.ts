import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function runOpenAI(input: {
  systemPrompt?: string | null;
  role: string;
  title: string;
  description?: string | null;
  model: string;
}) {
  const response = await client.responses.create({
    model: input.model || "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: input.systemPrompt || `You are a ${input.role} AI worker.`
      },
      {
        role: "user",
        content: `Task title: ${input.title}

Task description: ${input.description || "No description"}

Return a complete useful result.`
      }
    ]
  });

  const output = response.output_text || "";

  const usage = response.usage || {
    input_tokens: 0,
    output_tokens: 0,
    total_tokens: 0
  };

  return {
    output,
    tokens_input: usage.input_tokens || 0,
    tokens_output: usage.output_tokens || 0,
    cost_usd: 0
  };
}
