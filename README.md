# AI Interview Backend

This is the backend service for the AI Interview system.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a .env file:
```bash
cp .env.example .env
```

3. Install required dependencies:
```bash
npm install express cors dotenv nodemon
```

4. Run the development server:
```bash
npm run dev
```

The server will start on http://localhost:3000

## Available Endpoints

- GET /health - Health check endpoint
- GET /api/interview/questions - Get interview questions
- POST /api/interview/submit - Submit interview answers
