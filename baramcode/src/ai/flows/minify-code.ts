'use server';
/**
 * @fileOverview An AI agent that minifies code snippets.
 *
 * - minifyCode - A function that minifies a code snippet.
 * - MinifyCodeInput - The input type for the minifyCode function.
 * - MinifyCodeOutput - The return type for the minifyCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MinifyCodeInputSchema = z.object({
  code: z.string().describe('The code snippet to minify.'),
});
export type MinifyCodeInput = z.infer<typeof MinifyCodeInputSchema>;

const MinifyCodeOutputSchema = z.object({
  minifiedCode: z.string().describe('The minified code snippet.'),
});
export type MinifyCodeOutput = z.infer<typeof MinifyCodeOutputSchema>;

export async function minifyCode(input: MinifyCodeInput): Promise<MinifyCodeOutput> {
  return minifyCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'minifyCodePrompt',
  input: {schema: MinifyCodeInputSchema},
  output: {schema: MinifyCodeOutputSchema},
  prompt: `You are an expert code minifier. Minify the following code snippet by removing all unnecessary characters like whitespace, newlines, and comments without changing its functionality. Only return the minified code, without any extra explanations or markdown code fences.

Code:
{{{code}}}`,
});

const minifyCodeFlow = ai.defineFlow(
  {
    name: 'minifyCodeFlow',
    inputSchema: MinifyCodeInputSchema,
    outputSchema: MinifyCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
