'use server';
/**
 * @fileOverview AI Symptom Checker flow.
 *
 * This file defines a Genkit flow for predicting possible health issues based on selected symptoms.
 * - aiSymptomChecker - A function that handles the symptom checking process.
 * - AISymptomCheckerInput - The input type for the aiSymptomChecker function.
 * - AISymptomCheckerOutput - The return type for the aiSymptomChecker function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AISymptomCheckerInputSchema = z.object({
  symptoms: z.array(
    z.string().describe('A symptom selected by the user.')
  ).describe('An array of symptoms selected by the user.')
});
export type AISymptomCheckerInput = z.infer<typeof AISymptomCheckerInputSchema>;

const AISymptomCheckerOutputSchema = z.object({
  possibleIssues: z.array(
    z.string().describe('A possible health issue based on the symptoms.')
  ).describe('An array of possible health issues.')
});
export type AISymptomCheckerOutput = z.infer<typeof AISymptomCheckerOutputSchema>;

export async function aiSymptomChecker(input: AISymptomCheckerInput): Promise<AISymptomCheckerOutput> {
  return aiSymptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSymptomCheckerPrompt',
  input: {
    schema: z.object({
      symptoms: z.array(
        z.string().describe('A symptom selected by the user.')
      ).describe('An array of symptoms selected by the user.')
    }),
  },
  output: {
    schema: z.object({
      possibleIssues: z.array(
        z.string().describe('A possible health issue based on the symptoms.')
      ).describe('An array of possible health issues.')
    }),
  },
  prompt: `You are an AI HealthBot that can predict possible health issues based on a user's selected symptoms.

  Based on the following symptoms, predict possible health issues:

  Symptoms: {{#each symptoms}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Possible Health Issues: `,
});

const aiSymptomCheckerFlow = ai.defineFlow<
  typeof AISymptomCheckerInputSchema,
  typeof AISymptomCheckerOutputSchema
>({
  name: 'aiSymptomCheckerFlow',
  inputSchema: AISymptomCheckerInputSchema,
  outputSchema: AISymptomCheckerOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
