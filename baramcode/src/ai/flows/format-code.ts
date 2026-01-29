'use server';
/**
 * @fileOverview An AI agent that formats code snippets.
 *
 * - formatCode - A function that formats a code snippet.
 * - FormatCodeInput - The input type for the formatCode function.
 * - FormatCodeOutput - The return type for the formatCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FormatCodeInputSchema = z.object({
  code: z.string().describe('The code snippet to format.'),
});
export type FormatCodeInput = z.infer<typeof FormatCodeInputSchema>;

const FormatCodeOutputSchema = z.object({
  formattedCode: z.string().describe('The formatted code snippet.'),
});
export type FormatCodeOutput = z.infer<typeof FormatCodeOutputSchema>;

export async function formatCode(input: FormatCodeInput): Promise<FormatCodeOutput> {
  return formatCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'formatCodePrompt',
  input: {schema: FormatCodeInputSchema},
  output: {schema: FormatCodeOutputSchema},
  prompt: `You are an expert code formatter. Format the following code according to industry best practices, using standard indentation and style. Only return the formatted code, without any extra explanations or markdown code fences.

Code:
{{{code}}}`,
});

const formatCodeFlow = ai.defineFlow(
  {
    name: 'formatCodeFlow',
    inputSchema: FormatCodeInputSchema,
    outputSchema: FormatCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
