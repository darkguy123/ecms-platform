'use server';
/**
 * @fileOverview An AI assistant for generating blog content ideas, outlines, or summaries.
 *
 * - generateBlogDraft - A function that handles the generation of blog draft content.
 * - GenerateBlogDraftInput - The input type for the generateBlogDraft function.
 * - GenerateBlogDraftOutput - The return type for the generateBlogDraft function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateBlogDraftInputSchema = z.object({
  topicOrKeywords: z
    .string()
    .describe('The topic or keywords for the blog post.'),
  contentType: z
    .enum(['ideas', 'outline', 'summary'])
    .describe('The type of content to generate: ideas, outline, or summary.'),
});
export type GenerateBlogDraftInput = z.infer<typeof GenerateBlogDraftInputSchema>;

const GenerateBlogDraftOutputSchema = z.object({
  draftContent: z.string().describe('The AI-generated blog draft content.'),
});
export type GenerateBlogDraftOutput = z.infer<typeof GenerateBlogDraftOutputSchema>;

export async function generateBlogDraft(
  input: GenerateBlogDraftInput
): Promise<GenerateBlogDraftOutput> {
  return generateBlogDraftFlow(input);
}

const generateBlogDraftPrompt = ai.definePrompt({
  name: 'generateBlogDraftPrompt',
  input: { schema: GenerateBlogDraftInputSchema },
  output: { schema: GenerateBlogDraftOutputSchema },
  prompt: `You are an AI assistant specialized in generating blog content for an Electronic Court Management System (ECMS) blog.
Your task is to help administrators quickly draft engaging articles for court updates and product announcements.

Based on the provided topic/keywords and the requested content type, generate appropriate blog content.

Topic/Keywords: {{{topicOrKeywords}}}
Content Type: {{{contentType}}}

{{#if (eq contentType "ideas")}}General Blog Post Ideas
Generate 5-7 distinct and engaging blog post ideas, each with a brief 1-2 sentence description, related to the "Topic/Keywords". Focus on court updates, ECMS features, legal tech news, or benefits for legal professionals.

Examples:
1. "Simplifying eFiling: A Step-by-Step Guide for Legal Professionals" - Explores the new features of the eFiling module and how it benefits users.
2. "The Future of Justice: How ECMS is Transforming Court Operations" - Discusses the broader impact of digital transformation on the judiciary.
3. "Enhancing Transparency in Courts: The Role of ECMS eCase Management" - Highlights how real-time access and secure records improve public trust.

Output should be a numbered list of ideas, each with a title and a short description.
{{/if}}

{{#if (eq contentType "outline")}}Detailed Blog Post Outline
Generate a detailed blog post outline for a post on "Topic/Keywords". The outline should include a compelling title, a brief introduction, 3-5 main sections with sub-points, and a conclusion with a call to action. Ensure it's structured logically for a professional audience.

Output should be in a clear, hierarchical outline format.

Example:
Title: Optimizing Case Management with ECMS: A Comprehensive Guide

I. Introduction
    A. Hook: Challenges in traditional case management
    B. Thesis: How ECMS transforms efficiency and transparency
    C. What this post will cover

II. Key Features of eCase Management
    A. Real-time updates and alerts
    B. Document management and version control
    C. Collaboration tools for legal teams
    D. Integration with other ECMS modules (e.g., eFiling)

III. Benefits for Court Operations
    A. Increased speed and accuracy
    B. Reduced administrative burden
    C. Enhanced data security and compliance

IV. Implementation Success Stories (brief mention or placeholder)
    A. Case study 1 (e.g., reduced backlog by X%)
    B. Case study 2 (e.g., improved access for remote users)

V. Conclusion
    A. Recap of ECMS impact
    B. Call to Action: Request a demo or learn more about specific features.
{{/if}}

{{#if (eq contentType "summary")}}Blog Post Summary
Write a concise and informative summary (approximately 150-200 words) for a blog post about "Topic/Keywords". This summary should highlight the main points and encourage readers to learn more. It should be suitable for an introduction or a promotional blurb.

Output should be a single paragraph.
{{/if}}

Please format your output as a JSON object with a single key 'draftContent' containing the generated text.`,
});

const generateBlogDraftFlow = ai.defineFlow(
  {
    name: 'generateBlogDraftFlow',
    inputSchema: GenerateBlogDraftInputSchema,
    outputSchema: GenerateBlogDraftOutputSchema,
  },
  async (input) => {
    const { output } = await generateBlogDraftPrompt(input);
    return output!;
  }
);
