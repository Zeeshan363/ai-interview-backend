const axios = require('axios');

class ElevenLabsService {
  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY;
    this.baseURL = 'https://api.elevenlabs.io/v1';
    this.systemPrompt = `You are an experienced technical interviewer conducting a React.js interview. 
Ask the following questions one by one and provide constructive feedback on each answer:

1. What is JSX and why is it used in React?
2. What's the difference between useState and useEffect hooks?
3. How do you pass data from a parent component to a child component?
4. What is the purpose of keys in React lists?
5. What's the difference between functional components and class components?

Evaluate the candidate's answers based on:
- Technical accuracy
- Clarity of explanation
- Understanding of React concepts
- Practical application knowledge

Be professional but friendly in your interactions.`;
  }

  async createAgent() {
    try {
      const response = await axios.post(
        `${this.baseURL}/convai/agents/create`,
        {
          conversation_config: {
            agent: {
              first_message: "Hello! I'll be conducting your React.js technical interview today. Are you ready to begin?",
              language: "en",
              prompt: {
                prompt: this.systemPrompt
              }
            }
          },
          name: "React Technical Interviewer",
          tags: ["react", "technical-interview"]
        },
        {
          headers: {
            'xi-api-key': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error creating ElevenLabs agent:', error.response?.data || error.message);
      throw new Error('Failed to create interview agent');
    }
  }

  // Add more methods as needed for interaction with the agent
}

module.exports = new ElevenLabsService();
