'use server';

/**
 * @fileOverview An AI agent that generates creative art prompts based on user-specified criteria.
 *
 * - generateArtPrompt - A function that generates an art prompt.
 * - GenerateArtPromptInput - The input type for the generateArtPrompt function.
 * - GenerateArtPromptOutput - The return type for the generateArtPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArtPromptInputSchema = z.object({
  style: z.string().describe('The desired style of the artwork (e.g., Abstract, Impressionism, Pop Art).'),
  medium: z.string().describe('The medium to be used for the artwork (e.g., Oil on canvas, Watercolor, Digital painting).'),
  subject: z.string().describe('The subject of the artwork (e.g., Portrait, Landscape, Still life).'),
});

export type GenerateArtPromptInput = z.infer<typeof GenerateArtPromptInputSchema>;

const GenerateArtPromptOutputSchema = z.object({
  prompt: z.string().describe('A creative art prompt based on the specified style, medium, and subject.'),
});

export type GenerateArtPromptOutput = z.infer<typeof GenerateArtPromptOutputSchema>;

export async function generateArtPrompt(input: GenerateArtPromptInput): Promise<GenerateArtPromptOutput> {
  return generateArtPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArtPromptPrompt',
  input: {schema: GenerateArtPromptInputSchema},
  output: {schema: GenerateArtPromptOutputSchema},
  prompt: `You are a creative art prompt generator. Generate a creative and inspiring art prompt based on the following criteria:

Style: {{{style}}}
Medium: {{{medium}}}
Subject: {{{subject}}}

Prompt:`,
});

const generateArtPromptFlow = ai.defineFlow(
  {
    name: 'generateArtPromptFlow',
    inputSchema: GenerateArtPromptInputSchema,
    outputSchema: GenerateArtPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
