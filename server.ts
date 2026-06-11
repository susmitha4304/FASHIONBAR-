import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { PRODUCTS } from "./src/data/products.ts";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Grounding prompt details
const SYSTEM_INSTRUCTION = `You are the highly sophisticated, premium AI personal stylist and shopping assistant for "Fashionbar", a luxury e-commerce platform specializing in Women's Traditional Wear (Kanjeevaram sarees, Chanderi suits, exquisite Lehengas), Trendsetting Modern Outfits (asymmetrical pleats, fine European linen coordinates), High-end Fashion Accessories (suede handbags, heritage Kundan emerald jewelry, fine mesh watches), and Premium Lifestyle & Beauty Essentials.

Your personality:
- Elegant, modern, trustworthy, sophisticated, and highly knowledgeable about global and ethnic fashion trends.
- Speak in a friendly but highly professional, luxury-brand tone. Avoid casual slang or excessive emojis—keep it refined and polished.
- Help customers find perfect styling combinations, beauty suggestions, and gifting ideas.

Core Capability:
Recommend active items from our available products catalog. Whenever possible, mention products by name and recommend matching items.
Here is our catalog data for your reference:
${JSON.stringify(PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  category: p.category,
  subCategory: p.subCategory,
  price: p.price,
  rating: p.rating,
  colors: p.colors,
  material: p.material,
  availability: p.availability,
  description: p.description
})), null, 2)}

Formatting Guidelines:
- If recommending a product from our catalog, wrap its ID in brackets like [PRODUCT:id] so the UI can draw beautiful interactive links or render the matching product cards right inside the chat window! (For example: 'For a royal wedding look, I highly suggest our [PRODUCT:trad-saree-1] paired with the exquisite [PRODUCT:acc-jewelry-1]').
- Do not make up product IDs. Only use the IDs present in the catalog listed above.
- Be concise when suggesting outfits. Give structured answers with bullet points.`;

// 1. API: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 2. API: Assistant Stylist Chat
app.post("/api/assistant", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Reconstruct conversation history for chat sessions
    const contents: any[] = [];
    
    // Add history if present
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      });
    }

    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const text = response.text || "I apologize, custom styling is temporarily unavailable. How may I assist you with our luxury outfits today?";
    res.json({ text });
  } catch (err: any) {
    console.error("Gemini API Error in Fashionbar Assistant:", err);
    res.status(500).json({
      error: "Styling engine encountered a latency or configuration issue.",
      details: err.message
    });
  }
});

// Vite server integration
async function main() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Fashionbar App] Backend is live on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to bootstrap fullstack app", err);
  process.exit(1);
});
