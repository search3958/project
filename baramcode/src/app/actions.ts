'use server';

import { explainCodeSnippet, type ExplainCodeSnippetInput, type ExplainCodeSnippetOutput } from '@/ai/flows/explain-code-snippet';
import { findBugsInCode, type FindBugsInCodeInput, type FindBugsInCodeOutput } from '@/ai/flows/find-bugs-in-code';
import { generateCode, type GenerateCodeInput, type GenerateCodeOutput } from '@/ai/flows/generate-code-from-prompt';

export async function handleExplain(input: ExplainCodeSnippetInput): Promise<ExplainCodeSnippetOutput> {
  try {
    const result = await explainCodeSnippet(input);
    return result;
  } catch (error) {
    console.error('Error in handleExplain:', error);
    throw new Error('Failed to explain code.');
  }
}

export async function handleFindBugs(input: FindBugsInCodeInput): Promise<FindBugsInCodeOutput> {
  try {
    const result = await findBugsInCode(input);
    return result;
  } catch (error) {
    console.error('Error in handleFindBugs:', error);
    throw new Error('Failed to find bugs in code.');
  }
}

export async function handleGenerateCode(input: GenerateCodeInput): Promise<GenerateCodeOutput> {
  try {
    const result = await generateCode(input);
    return result;
  } catch (error) {
    console.error('Error in handleGenerateCode:', error);
    throw new Error('Failed to generate code.');
  }
}
