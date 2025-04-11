'use server';
/**
 * @fileOverview Provides day-wise advice and minimal medicine suggestions for basic health issues.
 *
 * - getBasicHealthAdvice - A function that provides basic health advice based on a given health issue.
 * - BasicHealthAdviceInput - The input type for the getBasicHealthAdvice function.
 * - BasicHealthAdviceOutput - The return type for the getBasicHealthAdvice function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const BasicHealthAdviceInputSchema = z.object({
  healthIssue: z.string().describe('The predicted health issue.'),
});
export type BasicHealthAdviceInput = z.infer<typeof BasicHealthAdviceInputSchema>;

const BasicHealthAdviceOutputSchema = z.object({
  advice: z
    .string()
    .describe('Day-wise advice and minimal medicine suggestions for the health issue.'),
});
export type BasicHealthAdviceOutput = z.infer<typeof BasicHealthAdviceOutputSchema>;

export async function getBasicHealthAdvice(input: BasicHealthAdviceInput): Promise<BasicHealthAdviceOutput> {
  return basicHealthAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'basicHealthAdvicePrompt',
  input: {
    schema: z.object({
      healthIssue: z.string().describe('The predicted health issue.'),
    }),
  },
  output: {
    schema: z.object({
      advice:
        z.string().describe('Day-wise advice and minimal medicine suggestions for the health issue.'),
    }),
  },
  prompt: `You are a helpful AI assistant providing basic health advice.

  Based on the predicted health issue, provide day-wise advice and minimal medicine suggestions.
  Health Issue: {{{healthIssue}}}
  `,
});

const basicHealthAdviceFlow = ai.defineFlow<
  typeof BasicHealthAdviceInputSchema,
  typeof BasicHealthAdviceOutputSchema
>(
  {
    name: 'basicHealthAdviceFlow',
    inputSchema: BasicHealthAdviceInputSchema,
    outputSchema: BasicHealthAdviceOutputSchema,
  },
  async input => {
    try{
      if (!process.env.GOOGLE_GENAI_API_KEY) {
        return {
          advice: "The AI assistant is unavailable. Please ensure the GOOGLE_GENAI_API_KEY environment variable is set."
        };
      }
      const {output} = await prompt(input);
      return output!;
    } catch (error: any) {
      console.error("[GoogleGenerativeAI Error]:", error);
      return {
        advice: "Failed to get health advice. Please try again later."
      };
    }
  }
);
