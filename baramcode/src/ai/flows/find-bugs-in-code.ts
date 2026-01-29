'use server';
/**
 * @fileOverview This file defines a Genkit flow for finding bugs in code.
 *
 * It includes the FindBugsInCodeInput, FindBugsInCodeOutput interfaces and
 * the findBugsInCode function which analyzes code and provides potential bug findings.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindBugsInCodeInputSchema = z.object({
  code: z.string().describe('The code to analyze for bugs.'),
  question: z.string().optional().describe('The question about the code.'),
});
export type FindBugsInCodeInput = z.infer<typeof FindBugsInCodeInputSchema>;

const FindBugsInCodeOutputSchema = z.object({
  bugFindings: z.string().describe('The bug findings in the code.'),
});
export type FindBugsInCodeOutput = z.infer<typeof FindBugsInCodeOutputSchema>;

export async function findBugsInCode(input: FindBugsInCodeInput): Promise<FindBugsInCodeOutput> {
  return findBugsInCodeFlow(input);
}

const findBugsInCodePrompt = ai.definePrompt({
  name: 'findBugsInCodePrompt',
  input: {schema: FindBugsInCodeInputSchema},
  output: {schema: FindBugsInCodeOutputSchema},
  prompt: `You are an AI code analyzer that helps developers find bugs in their code. Analyze the following code and provide potential bug findings. If question is given, focus on answering the question.

Code:
{{code}}

Question:
{{question}}`,
});

const findBugsInCodeFlow = ai.defineFlow(
  {
    name: 'findBugsInCodeFlow',
    inputSchema: FindBugsInCodeInputSchema,
    outputSchema: FindBugsInCodeOutputSchema,
  },
  async input => {
    const {output} = await findBugsInCodePrompt(input);
    return output!;
  }
);
