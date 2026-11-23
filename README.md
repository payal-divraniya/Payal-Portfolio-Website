# Payal Divraniya — Developer Portfolio

A responsive React + Vite portfolio with an Express contact API. The two supplied project screenshots are stored as static assets and shown unchanged inside matching browser mockups.

## Requirements
- Node.js 18+
- npm
- MongoDB Atlas/local MongoDB (only required to store contact form messages)

## Run locally
1. Extract the project ZIP.
2. Open the project folder in VS Code.
3. Install dependencies from the root:
   ```bash
   npm install
   ```
4. Copy `server/.env.example` to `server/.env` and add your MongoDB connection string.
5. Copy `client/.env.example` to `client/.env`.
6. Start frontend and backend:
   ```bash
   npm run dev
   ```
7. Open `http://localhost:5173`.

The frontend works without MongoDB. If the database is not configured, the contact form shows a helpful message rather than pretending the message was saved.

## Before publishing — personal details to update
Search in `client/src/main.jsx`:
- `your.email@example.com` → your real email address.
- AI Resume Builder project `live="#"` and `github="#"` → actual deployed URL and repository.
- LinkedIn `href="#"` → your LinkedIn profile URL.

Add your resume PDF as `client/public/resume.pdf` for the Resume button to work.

## Deploy
- Frontend: deploy `client` to Vercel/Netlify (build command `npm run build`, output directory `dist`).
- Backend: deploy `server` to Render (build command `npm install`, start command `npm start`).
- Set backend environment variables `MONGO_URI`, `CLIENT_URL` (your deployed frontend origin), and optionally `PORT`.
- Set frontend environment variable `VITE_API_URL` to your deployed backend URL plus `/api`.

## Project screenshot assets
- `client/public/assets/careerpilot-preview.png`
- `client/public/assets/ai-resume-builder-preview.png`

The original screenshot files are preserved; CSS styles only the browser frame around them.
