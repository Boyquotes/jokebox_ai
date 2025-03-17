import OpenAI from 'openai';
import { NextRequest } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { joke } = await request.json();

    if (!joke) {
      return new Response(JSON.stringify({ error: 'No joke provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a joke evaluation assistant. Analyze jokes for their humor, appropriateness, and potential offensive content. 
          Provide a structured evaluation with boolean values for funny, appropriate, and offensive, along with brief comments.
          Be honest but constructive in your evaluation.`
        },
        {
          role: 'user',
          content: `Please evaluate this joke: "${joke}"`
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const response = completion.choices[0]?.message?.content;
    
    // Parse the AI's response to extract evaluation metrics
    const evaluation = {
      funny: response?.toLowerCase().includes('funny: true') || response?.toLowerCase().includes('humorous') || response?.toLowerCase().includes('amusing'),
      appropriate: !response?.toLowerCase().includes('inappropriate') && !response?.toLowerCase().includes('offensive'),
      offensive: response?.toLowerCase().includes('offensive') || response?.toLowerCase().includes('inappropriate'),
      comments: response?.split('comments:')[1]?.trim() || response
    };

    return new Response(JSON.stringify({ evaluation }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error evaluating joke:', error);
    return new Response(JSON.stringify({ error: 'Failed to evaluate joke' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 