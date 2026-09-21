export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.REPLICATE_API_TOKEN) {
    return res.status(500).json({
      error: "REPLICATE_API_TOKEN is not configured in Vercel."
    });
  }

  try {
    const { prompt, language, duration, aspect, style } = req.body || {};

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        error: "Prompt is required."
      });
    }

    const enhancedPrompt =
      `${prompt.trim()}. ` +
      `Style: ${style || "Cinematic"}. ` +
      `Language/context: ${language || "English"}. ` +
      `Aspect ratio: ${aspect || "16:9"}. ` +
      `Requested duration: ${duration || "5 sec"}.`;

    const response = await fetch(
      "https://api.replicate.com/v1/models/wan-video/wan-2.1-1.3b/predictions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
          "Prefer": "wait=10"
        },
        body: JSON.stringify({
          input: {
            prompt: enhancedPrompt
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.detail || data.error || "Replicate request failed."
      });
    }

    return res.status(200).json({
      id: data.id,
      status: data.status
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message || "Server error."
    });
  }
}
