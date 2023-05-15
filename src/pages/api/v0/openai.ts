import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type ResponseData = {
  text: string;
};

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
  };
}

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { prompt } = (req as GenerateNextApiRequest).body;
  if (!prompt || prompt === "") {
    return new Response("Missing prompt", { status: 400 });
  }

  const result = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}`,
    temperature: 0.9,
    max_tokens: 100,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  });
  // const result = await openai.createChatCompletion({
  //     model: "gpt-3.5-turbo",
  //     messages: [{ role: "user", content: "Hello world" }],
  // });

  const response =
    result.data.choices[0].text?.trim() || "Error fetching response.";
  res.status(200).json({ text: response });
}