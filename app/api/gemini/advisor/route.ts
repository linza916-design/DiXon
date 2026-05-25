import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client Lazily/Safely so it won't crash on boot if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Next.js Route Handlers use named export functions matching HTTP methods (POST, GET, etc.)
export async function POST(request: Request) {
  try {
    // Read the incoming JSON body using Next.js request methods
    const { prompt, familyContext } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 },
      );
    }

    const client = getGeminiClient();

    if (!client) {
      console.log(
        "GEMINI_API_KEY is missing. Generating simulated health advisory response...",
      );

      const promptLower = prompt.toLowerCase();
      let answerText = "Thank you for asking DiXon Wellness Advisor. ";
      let recommendations = [];

      if (
        promptLower.includes("sleep") ||
        promptLower.includes("bedtime") ||
        promptLower.includes("night")
      ) {
        answerText +=
          "Based on your family profile, improving deep rest metrics is paramount. We recommend introducing a 'Golden Hour' 30-minute screen-free transition and supporting sleep schedules with magnesium-based botanical extracts.";
        recommendations = [
          {
            title: "Evening Ritual Kit",
            url: "https://dixon.com/products/evening-ritual",
          },
          {
            title: "Organic Chamomile Wellness Infusion",
            url: "https://dixon.com/products/tea",
          },
        ];
      } else if (
        promptLower.includes("omega") ||
        promptLower.includes("pet") ||
        promptLower.includes("leo") ||
        promptLower.includes("coat")
      ) {
        answerText +=
          "For pet health and coat vibrancy, deep marine-omega fats and high-potency probiotics are highly beneficial. Probiotics assist with gut lining integrity which directly increases nutrient assimilation.";
        recommendations = [
          {
            title: "Enzyme+ Pet Booster Pack",
            url: "https://dixon.com/products/enzyme-booster",
          },
          {
            title: "Ultra Pure Fish Oil Concentrate",
            url: "https://dixon.com/products/fish-oil",
          },
        ];
      } else if (
        promptLower.includes("baby") ||
        promptLower.includes("child") ||
        promptLower.includes("kid")
      ) {
        answerText +=
          "For children, transparency and hypoallergenic formulation are critical. Standard children vitamins often include sugar syrups; we advise selecting clean, cold-pressed glass-bottled drops backed by the DiXon Certified purity badge.";
        recommendations = [
          {
            title: "D3/K2 Kids Pure Daily Drops",
            url: "https://dixon.com/products/kids-d3",
          },
          {
            title: "Prebiotic Gentle Berry Chewables",
            url: "https://dixon.com/products/kids-chew",
          },
        ];
      } else {
        answerText +=
          "DiXon supplements focus on medical-grade verification. We recommend introducing B-Complex to naturally stimulate daily energetic levels for the parents and ensuring children supplement with clinical dose vitamin D3/K2.";
        recommendations = [
          {
            title: "The Synergy Core Bundle",
            url: "https://dixon.com/products/synergy-core",
          },
          {
            title: "Pure Kids Immune Support Drops",
            url: "https://dixon.com/products/immune-support",
          },
        ];
      }

      return NextResponse.json({
        text: `**[Demo Mode - No API Key Set]**\n\n${answerText}\n\n*Note: To connect the real-time server-side Gemini model with automatic Google Search web grounding, verify your secrets in settings.*`,
        sources: recommendations.map((r) => ({ title: r.title, uri: r.url })),
      });
    }

    // FIX: Swapped to a verified, active model name ("gemini-2.5-flash")
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User family context: ${JSON.stringify(familyContext || {})}\n\nUser Question: ${prompt}`,
      config: {
        systemInstruction:
          "You are the intelligent medical-transparency health specialist for DiXon, a premium family supplement platform. Provide highly professional, helpful, peer-reviewed scientific recommendations. Point specifically to diet, lifestyle, and clean food/supplements. Ground your response in verified safety, dosage control, and transparency.",
        tools: [{ googleSearch: {} }],
      },
    });

    const text =
      response.text ||
      "I apologize, I could not generate a response at this moment.";

    // FIX: Completely fixed the typo syntax mismatch to extract chunks safely
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    const chunks = groundingMetadata?.groundingChunks || [];

    const sources = chunks
      .map((c: any) => {
        if (c.web) {
          return {
            title: c.web.title || "Verified Health Source",
            uri: c.web.uri || "#",
          };
        }
        return null;
      })
      .filter(Boolean);

    return NextResponse.json({ text, sources });
  } catch (err: any) {
    // This string prints out directly to your local terminal command prompt window
    console.error("Gemini API Error in backend:", err);
    return NextResponse.json(
      {
        error:
          "Gemini server process failed: " + (err.message || "Unknown Error"),
      },
      { status: 500 },
    );
  }
}
