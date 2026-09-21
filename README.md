# LUMIVO AI — Text to Video V1

Real Text-to-Video backend for the LUMIVO AI frontend.

- Text to Video
- 4-second 480p generation
- Prompt, language, style and aspect-ratio controls
- Video preview and open/download link
- Secure server-side Replicate token

V1 uses Replicate's official `wan-video/wan-2.1-1.3b` model. The model is designed for short clips. Longer LUMIVO durations will be added later by generating and stitching multiple clips.

## Deploy

GitHub Pages cannot run the `/api` backend. Deploy this project to Vercel (or another serverless backend host) and add this environment variable:

`REPLICATE_API_TOKEN`

Never put the token in public HTML/JS files or commit it to GitHub.

Replicate currently charges for generation, so real AI generation is not permanently free compute.
