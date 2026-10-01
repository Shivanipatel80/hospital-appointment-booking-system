require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const { GoogleGenAI } = require("@google/genai");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SPECIALIZATIONS = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Gynecologist",
  "ENT Specialist",
  "Ophthalmologist",
  "Psychiatrist",
  "Urologist",
  "Oncologist",
];

const limiter = rateLimit({ windowMs: 60_000, max: 10 });
const KEYWORDS = {
  Cardiologist: ["chest", "heart", "seene", "palpitation", "breath", "saans"],
  Dermatologist: ["skin", "rash", "itch", "khujli", "acne", "pimple", "hair"],
  Neurologist: [
    "headache",
    "migraine",
    "sar dard",
    "dizz",
    "chakkar",
    "seizure",
    "numb",
  ],
  Orthopedic: [
    "knee",
    "joint",
    "back pain",
    "bone",
    "ghutne",
    "kamar",
    "fracture",
  ],
  Pediatrician: ["child", "baby", "bachche", "bachcha", "infant"],
  "ENT Specialist": ["ear", "throat", "nose", "kaan", "gala", "sinus"],
  Gynecologist: ["period", "pregnan", "menstrual"],
  Ophthalmologist: ["eye", "vision", "aankh"],
  Psychiatrist: ["anxiety", "depress", "stress", "panic"],
  Urologist: ["urine", "kidney", "peshab"],
};

const URGENT_WORDS = [
  "chest pain",
  "seene me dard",
  "can't breathe",
  "saans lene me",
  "unconscious",
  "stroke",
  "heavy bleeding",
  "seizure",
];

const keywordFallback = (text) => {
  const t = text.toLowerCase();
  let best = "General Physician";
  let bestScore = 0;
  for (const [spec, words] of Object.entries(KEYWORDS)) {
    const score = words.filter((w) => t.includes(w)).length;
    if (score > bestScore) {
      best = spec;
      bestScore = score;
    }
  }
  return {
    specialization: best,
    reason: bestScore
      ? "Matched from keywords in your symptoms."
      : "We couldn't match your symptoms, so a General Physician is a safe start.",
    urgent: URGENT_WORDS.some((w) => t.includes(w)),
    fallback: true,
  };
};

const MODELS = ["gemini-3.8-flash", "gemini-flash-latest"]; // pehla fail ho to doosra try hoga

const generateWithRetry = async (params) => {
  let lastErr;
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        return await ai.models.generateContent({ ...params, model });
      } catch (err) {
        lastErr = err;
        if (![429, 500, 503].includes(err.status)) throw err; // baaki errors pe retry nahi
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }
  throw lastErr;
};

router.post("/suggest-specialty", limiter, protect, async (req, res) => {
  const symptoms = (req.body.symptoms || "").trim();
  if (!symptoms) return res.status(400).json({ message: "symptoms required" });
  if (symptoms.length > 500)
    return res.status(400).json({ message: "Max 500 characters" });

  try {
    const response = await generateWithRetry({
      contents: symptoms,
      config: {
        systemInstruction: `You help patients choose a doctor specialization. Do NOT diagnose.
Reply ONLY with JSON: {"specialization": one of ${JSON.stringify(SPECIALIZATIONS)}, "reason": "one short sentence", "urgent": boolean}.
Set urgent=true if the symptoms could be an emergency (chest pain, breathing trouble, stroke signs, heavy bleeding, etc).
The patient may write in Hindi, English or Hinglish. Write "reason" in simple Hinglish.`,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text);

    res.json({
      specialization: SPECIALIZATIONS.includes(parsed.specialization)
        ? parsed.specialization
        : "General Physician",
      reason: String(parsed.reason || ""),
      urgent: !!parsed.urgent,
    });
  } catch (err) {
    console.error("AI error:", err);
    res.json(keywordFallback(symptoms));
  }
});
module.exports = router;
