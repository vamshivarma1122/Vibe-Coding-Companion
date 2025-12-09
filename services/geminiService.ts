import { GoogleGenAI, Type } from "@google/genai";
import { Track, Idea, TechPlan } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-3-pro-preview';

export const generateHackathonIdea = async (track: Track): Promise<Idea> => {
  const prompt = `
    Generate a unique, high-impact hackathon project idea for the "${track}" track.
    The idea should utilize Gemini 3 Pro's advanced reasoning and multimodality.
    Focus on solving a specific "daily frustration" or "global challenge".
    
    Return the response in JSON format with the following schema:
    - title: specific catchy name
    - description: 2-3 sentences explaining the problem and solution
    - keyFeatures: array of 3-4 specific features
    - geminiUsage: explain specifically how Gemini's reasoning or multimodality is used (e.g. "Uses reasoning to analyze medical logs", "Uses multimodality to interpret sign language video")
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            keyFeatures: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            geminiUsage: { type: Type.STRING }
          }
        },
        // Enable thinking for better creativity and reasoning on the problem
        thinkingConfig: { thinkingBudget: 2048 }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as Idea;
  } catch (error) {
    console.error("Error generating idea:", error);
    throw error;
  }
};

export const generateTechArchitecture = async (ideaDescription: string): Promise<TechPlan> => {
  const prompt = `
    Create a technical architecture plan for this hackathon project: "${ideaDescription}".
    Focus on a modern stack (React, Node/Python) and specifically how to integrate Gemini API.
    
    Return JSON:
    - frontend: Frameworks and libraries
    - backend: Server and DB choices
    - aiIntegration: Specific Gemini API endpoints/patterns (e.g. "generateContent with system instructions", "live API for audio")
    - architectureNotes: Brief advice on how to build it fast for a hackathon.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            frontend: { type: Type.STRING },
            backend: { type: Type.STRING },
            aiIntegration: { type: Type.STRING },
            architectureNotes: { type: Type.STRING }
          }
        },
        thinkingConfig: { thinkingBudget: 1024 }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as TechPlan;
  } catch (error) {
    console.error("Error generating tech plan:", error);
    throw error;
  }
};