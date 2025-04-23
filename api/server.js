import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { inputText } = req.body;

    if (!inputText) {
      return res.status(400).json({ error: "No input text provided." });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: inputText }],
    });

    const reply = response.choices[0]?.message?.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to get response from OpenAI." });
  }
});

app.listen(3001, () => {
  console.log("🚀 API server running at http://localhost:3001");
});
