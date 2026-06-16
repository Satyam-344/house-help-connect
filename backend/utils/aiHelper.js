const generateWorkerBio = async ({ name, category, experience, skills, languages }) => {
  const prompt = `Write a short, professional bio (2-3 sentences, max 80 words) for a home help worker with these details:
- Name: ${name}
- Service category: ${category}
- Years of experience: ${experience}
- Skills: ${skills.join(', ')}
- Languages spoken: ${languages.join(', ')}

Write in third person. Be warm, professional, and mention their key strengths. Do not include any special characters or markdown.`.trim();

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 150, temperature: 0.7 },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Gemini API error');
  }

  return data.candidates[0].content.parts[0].text.trim();
};

module.exports = { generateWorkerBio };
