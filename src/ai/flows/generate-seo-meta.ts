'use server';
/**
 * @fileOverview An AI assistant to generate SEO meta tags (title, description, keywords) for a webpage based on its content.
 *
 * - generateSeoMeta - A function that handles the generation of SEO meta tags.
 * - GenerateSeoMetaInput - The input type for the generateSeoMeta function.
 * - GenerateSeoMetaOutput - The return type for the generateSeoMeta function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoMetaInputSchema = z.object({
  pageContent: z
    .string()
    .describe(
      'The full content of the webpage for which to generate SEO meta tags.'
    ),
});
export type GenerateSeoMetaInput = z.infer<typeof GenerateSeoMetaInputSchema>;

const GenerateSeoMetaOutputSchema = z.object({
  metaTitle: z
    .string()
    .describe(
      'A concise and keyword-rich title for the page, optimized for search engines (max 60 characters).' 
    ),
  metaDescription: z
    .string()
    .describe(
      'A brief and compelling description of the page content, optimized for search engines (max 160 characters).' 
    ),
  keywords: z
    .array(z.string())
    .describe(
      'A list of relevant keywords for the page content, optimized for search engines.'
    ),
});
export type GenerateSeoMetaOutput = z.infer<typeof GenerateSeoMetaOutputSchema>;

export async function generateSeoMeta(
  input: GenerateSeoMetaInput
): Promise<GenerateSeoMetaOutput> {
  return generateSeoMetaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoMetaPrompt',
  input: {schema: GenerateSeoMetaInputSchema},
  output: {schema: GenerateSeoMetaOutputSchema},
  prompt: `You are an expert SEO specialist. Your task is to generate an SEO-optimized meta title, meta description, and a list of keywords for a webpage based on its content.

The meta title should be concise and keyword-rich, ideally no more than 60 characters.
The meta description should be a brief and compelling summary of the page content, ideally no more than 160 characters.
Keywords should be a list of relevant terms.

Page Content:
{{{pageContent}}}`,
});

const generateSeoMetaFlow = ai.defineFlow(
  {
    name: 'generateSeoMetaFlow',
    inputSchema: GenerateSeoMetaInputSchema,
    outputSchema: GenerateSeoMetaOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
