// api/diagnose.js
// This file runs on Vercel's servers — never in the browser.
// It holds the GEMINI_API_KEY secretly and forwards requests to Google's API.

export default async function handler(req, res) {

  // Allow the frontend to call this endpoint
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { systemPrompt, dataContext } = req.body;

  if (!systemPrompt || !dataContext) {
    return res.status(400).json({ error: 'Missing systemPrompt or dataContext' });
  }

  // API key is stored in Vercel environment variables — never visible to users
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable not set' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  // Combine system prompt and data into a single message for Gemini
                  text: `${systemPrompt}\n\nAnalyze this data:\n\n${dataContext}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.4,   // lower = more consistent, data-focused responses
            maxOutputTokens: 2000
          }
        })
      }
    );

    const data = await response.json();

    // Forward Gemini's response back to the frontend
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: 'Failed to reach Gemini API', details: error.message });
  }
}
