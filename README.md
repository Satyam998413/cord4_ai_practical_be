
---

# 📘 Backend README (Node.js + Express) — **Coding Format**

```md
# AI Image → Video Generator (Backend)

This is the backend service responsible for AI image and video generation.
It exposes clean REST APIs and abstracts AI providers behind a service layer.

## Tech Stack

- Node.js
- Express.js
- Replicate AI
- Axios
- dotenv

## Architecture

src/
├── controllers/
│   ├── image.controller.js
│   └── video.controller.js
├── routes/
│   ├── image.routes.js
│   └── video.routes.js
├── services/
│   ├── aiImage.service.js
│   └── aiVideo.service.js
├── app.js
└── server.js

## Environment Variables

Create a `.env` file:

```env
PORT=5000
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxx
RUNWAY_API_KEY=optional_if_used
