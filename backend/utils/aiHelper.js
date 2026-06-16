const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateWorkerBio = async ({ name, category, experience, skills, languages }) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
Write a short, professional bio (2-3 sentences, max 80 words) for a home help worker with these details:
- Name: ${name}
- Service category: ${category}
- Years of experience: ${experience}
- Skills: ${skills.join(', ')}
- Languages spoken: ${languages.join(', ')}

Write in third person. Be warm, professional, and mention their key strengths. Do not include any special characters or markdown.
  `.trim();

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
};

module.exports = { generateWorkerBio };
