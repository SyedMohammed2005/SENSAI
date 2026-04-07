import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { domain, level } = await req.json();

  const prompt = `
You are an expert career coach AI.

Create a highly detailed and structured career roadmap.

Domain: ${domain}
Level: ${level}

STRICT RULES:
- Generate 6 to 8 stages (minimum 6)
- Each stage must be VERY detailed
- Do NOT keep descriptions short
- Make it practical and industry-relevant

Each stage MUST include:
- stage (title)
- duration (realistic time like "2-3 weeks")
- description (what to learn in detail)
- topics (specific concepts)
- skills (practical skills gained)
- projects (real-world projects to build)
- resources (courses, docs, tools)
- outcome (what user can do after this stage)

Return ONLY JSON:

{
  "stages": [
    {
      "stage": "Stage title",
      "duration": "time required",
      "description": "Detailed explanation",
      "topics": ["topic1", "topic2"],
      "skills": ["skill1", "skill2"],
      "projects": ["project1", "project2"],
      "resources": ["resource1", "resource2"],
      "outcome": "What user will achieve"
    }
  ]
}
`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await geminiRes.json();

    let text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // 🔥 IMPORTANT: Clean Gemini response
    text = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate roadmap" });
  }
}