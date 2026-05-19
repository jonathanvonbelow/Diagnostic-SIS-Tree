
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { TreeNode, HistoryStep, SiteContext } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY }); 

export const getAiExplanation = async (
  userQuery: string, 
  contextNode: TreeNode, 
  lang: 'en' | 'es', 
  siteContext: SiteContext,
  currentNotes?: string,
  currentChecklist?: string[]
): Promise<string> => {
  const model = GEMINI_MODEL_NAME;
  const responseLanguage = lang === 'es' ? 'Spanish' : 'English';

  const contextLines = [
    `- Node ID: ${contextNode.id}`,
    `- Node Type: ${contextNode.type}`,
    `- Node Text: "${contextNode.text}"`
  ];
  if (contextNode.details) {
    contextLines.push(`- Node Details: "${contextNode.details}"`);
  }
  if (currentNotes) {
    contextLines.push(`- User's CURRENT Observations for this step: "${currentNotes}"`);
  }
  if (currentChecklist && currentChecklist.length > 0) {
    contextLines.push(`- Factors verified by user for this step: ${currentChecklist.join(', ')}`);
  }

  const landUseStr = Object.entries(siteContext.landUse)
    .filter(([_, active]) => active)
    .map(([key]) => key)
    .join(', ');

  const siteSummary = `
CHARACTERIZATION OF THE INVASION SITE (CONTEXT):
- Country: ${siteContext.country || 'Unknown'}
- Specific Place: ${siteContext.specificLocation || 'Not specified'}
- Region: ${siteContext.region || 'Unknown'}
- Involved Species: ${siteContext.species.join(', ') || 'General pines species'}
- Invasion Stage: ${siteContext.invasionStage}% (0: Initial arrival, 100: Massive invasion)
- Land Use Context: ${landUseStr || 'Not specified'}
- Socio-Economic Impact Level: ${siteContext.impactLevel}
- Expert Notes: ${siteContext.additionalNotes || 'None'}`;

  const systemInstruction = `You are a Senior Strategic Consultant in ecological governance and invasive species management.
Your goal is to provide high-level technical nuances, localized legal/administrative advice, and evidence-based ecological insights.
The user is navigating an audit tree for pines invasion. Use the provided site context to tailor every word.
If the user asks about regulations, prioritize known frameworks for the specified country (${siteContext.country}).
The current diagnostic step is:
${contextLines.join('\n')}

Site Context provided:
${siteSummary}

Tone: Professional, expert, actionable.
Search grounding: Use Google Search to find specific regional pines management plans or recent biological data for this area.
IMPORTANT: You MUST respond in ${responseLanguage}.`;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: userQuery,
        config: {
            systemInstruction: systemInstruction,
            tools: [{googleSearch: {}}],
        }
    });
    
    let aiText = response.text;
    if (aiText) {
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks && groundingChunks.length > 0) {
            const uniqueUris = new Set<string>();
            const sources: string[] = [];
            groundingChunks.forEach(chunk => {
                if (chunk.web && chunk.web.uri && !uniqueUris.has(chunk.web.uri)) {
                    uniqueUris.add(chunk.web.uri);
                    sources.push(`- ${chunk.web.title || 'Untitled'}: ${chunk.web.uri}`);
                }
            });
            const sourcesHeader = lang === 'es' ? "\n\nFuentes técnicas y oficiales:\n" : "\n\nTechnical and Official Sources:\n";
            if (sources.length > 0) aiText += sourcesHeader + sources.join('\n');
        }
        return aiText;
    }
    return "Error formatting AI response.";
  } catch (error) {
    return `Technical error: ${error instanceof Error ? error.message : 'Unknown service issue'}`;
  }
};

export const getAiSummaryFeedback = async (history: HistoryStep[], lang: 'en' | 'es', siteContext: SiteContext): Promise<string> => {
  const model = GEMINI_MODEL_NAME;
  const responseLanguage = lang === 'es' ? 'Spanish' : 'English';
  
  const pathSummary = history.map((step, i) => {
    let line = `${i+1}. ${step.nodeText} (Score: ${step.answerValue ?? 'N/A'}%)`;
    if (step.userNotes) line += ` | User Notes: "${step.userNotes}"`;
    if (step.checkedItems && step.checkedItems.length > 0) line += ` | Verified: [${step.checkedItems.join(', ')}]`;
    return line;
  }).join('\n');

  const landUseStr = Object.entries(siteContext.landUse)
    .filter(([_, active]) => active)
    .map(([key]) => key)
    .join(', ');

  const siteSummary = `
CONTEXT AUDIT:
- Location: ${siteContext.specificLocation}, ${siteContext.region}, ${siteContext.country}
- Species: ${siteContext.species.join(', ')}
- Stage: ${siteContext.invasionStage}%
- Impact: ${siteContext.impactLevel}`;

  const systemInstruction = `You are a Lead Governance Auditor.
The user has completed a diagnostic path. Based on the site context and their answers (scores), provide a 3-point Strategic Action Plan.
Identify the main governance bottleneck based on their path (Ecological, Legal, or Financial).
Tone: Executive, concise, authoritative.
Response Language: ${responseLanguage}.

SITE CONTEXT:
${siteSummary}

DIAGNOSTIC PATH TAKEN:
${pathSummary}`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: "Generate my Strategic Action Plan based on this diagnostic audit.",
        config: { systemInstruction }
    });
    return response.text || "Summary generation failed.";
  } catch (error) {
    return "Service error while generating final report.";
  }
};
