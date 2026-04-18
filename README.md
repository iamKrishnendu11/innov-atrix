# STEP-A-HEAD  Platform

A modern platform connecting Micro, Small, and Medium Enterprises (MSMEs) with talented students through task-based and bounty-based work. The platform features an intelligent Neural Semantic AI Matching engine that pairs bounties with the right students based on trust scores, skill alignment, and semantic similarity.

## 🌟 Features

- **For MSMEs:**
  - Create and post detailed Bounties and Tasks.
  - Review student submissions efficiently.
  - **AI Smart Matching (Smart Match):** View AI-ranked, trust-scored student candidates tailored perfectly to the specific needs of posted bounties.
  - Manage budgets and deadlines dynamically.

- **For Students:**
  - Build comprehensive profiles showcasing skills and past experiences.
  - Browse available Bounties and Tasks.
  - Submit work and earn ratings, building experience securely over time.

## 🏗️ Architecture

The project consists of three distinct microservices running cooperatively:

1. **Frontend (React)**  
   A dynamic, highly animated React web application utilizing TailwindCSS for a sleek, dark-mode, futuristic aesthetic ("glassmorphism", glowing borders).
   - *Location*: `/frontend`
   - *Core Tech*: React, Vite, Framer Motion, Tailwind CSS, React Router.

2. **Core Backend Server (Node.js/Express)**  
   The primary API gateway and business logic server, directly interacting with MongoDB to handle users, authentication (JWT), bounties, models, and file submissions.
   - *Location*: `/server`
   - *Core Tech*: Node.js, Express, Mongoose, MongoDB, JWT, bcrypt.

3. **AI Matching Microservice (Python)**  
   An isolated service that loads dense neural transformer models (`SentenceTransformers`) to compute cosine-similarity scores between bounty descriptions and student JSON profiles. It outputs a normalized `trust_score`.
   - *Location*: `/backend`
   - *Core Tech*: Python, FastAPI, Transformers, Scikit-learn, Pydantic.

## 🚀 Getting Started

To run the full stack locally, you need to spin up all three services.

### 1. Database Setup
Make sure you have a local MongoDB instance running or a MongoDB Atlas URI. 
Add a `.env` file in the `/server` directory:
```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/step_a_head
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

### 2. Node.js Core Backend
Navigate to the `/server` directory and install dependencies:
```bash
cd server
npm install
npm run dev # Runs on http://localhost:5001 by default
```

### 3. AI Microservice (Python)
Navigate to the `/backend` directory to boot the FastAPI matching server:
```bash
cd backend
python -m venv venv
# Activate venv: source venv/bin/activate (Mac/Linux) or .\venv\Scripts\activate (Win)
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
*Note: The first run might take a while as it downloads the `all-MiniLM-L6-v2` transformer model.*

### 4. React Frontend
Navigate to the `/frontend` directory and start Vite:
```bash
cd frontend
npm install
npm run dev # Runs on http://localhost:5173
```

## 🧠 AI Microservice Integration API

The AI server exposes the matching capabilities via REST:
- **`POST /api/match_internal`**
  - **Payload:** `{ "bounty_description": "...", "students": [{...}] }`
  - **Response:** Array of students sorted descending by an aggregated Trust Score comprising `ai_similarity`, `skill_score`, and `experience_score`.

## 🤝 Contributing
1. Create a descriptive feature branch (`git checkout -b feature/awesome-feature`)
2. Follow standard JavaScript and Python styling rules.
3. Keep frontend components modular and styled exclusively within the UI/UX dark mode design system parameters.
