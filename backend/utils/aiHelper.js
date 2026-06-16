const generateWorkerBio = async ({ name, category, experience, skills, languages }) => {
  const prompt = `Write a short, professional bio (2-3 sentences, max 80 words) for a home help worker:
Name: ${name}, Category: ${category}, Experience: ${experience} years, Skills: ${skills.join(', ')}, Languages: ${languages.join(', ')}.
Write in third person. Be warm and professional. No markdown.`.trim();

  // Try Gemini API
  try {
    const models = ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-2.5-flash-lite'];
    for (const modelName of models) {
      const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 150, temperature: 0.7 },
        }),
      });
      const data = await res.json();
      if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text.trim();
      }
    }
  } catch (_) {}

  // Fallback: professional template
  const topSkills = skills.slice(0, 3).join(', ');
  const langList = languages.length > 1
    ? languages.slice(0, -1).join(', ') + ' and ' + languages[languages.length - 1]
    : languages[0] || 'English';
  const yr = experience === 1 ? '1 year' : `${experience} years`;

  return `${name} is an experienced ${category} professional with ${yr} of dedicated service, specializing in ${topSkills}. Fluent in ${langList}, ${name} is known for punctuality, attention to detail, and building trust with every household. Clients consistently appreciate their warm demeanor and commitment to high-quality work.`;
};

module.exports = { generateWorkerBio };
