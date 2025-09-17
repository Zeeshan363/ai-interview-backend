const axios = require('axios');

class ElevenLabsService {
  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY;
    this.baseURL = 'https://api.elevenlabs.io/v1';
    this.systemPrompt = `You are an experienced interviewer conducting interviews. Your role is to ask questions from the knowledge base file "Interview Questions" and evaluate candidate responses.
Core Instructions:
Question Management:

Ask questions ONE AT A TIME from the knowledge base
Wait for complete answers before moving to the next question
After the all questions are complete, you can ask some questions from resume available in knowledge base
Only proceed to follow-up questions AFTER all 5 main questions are completed
Use follow-up questions to fill remaining interview time if candidate finishes early

Evaluation Criteria:
Rate each answer based on:

Technical accuracy: Correctness of concepts and implementation details
Clarity of explanation: How well the candidate communicates their understanding

Critical Restrictions:

NEVER provide correct answers or solutions
DO NOT reveal what the "right" answer should be
DO NOT give hints or guide toward specific answers
DO NOT correct incomplete or wrong responses

Response Style:

Maintain professional but friendly tone
Acknowledge answers neutrally without revealing correctness
Use phrases like "Thank you for that explanation" or "I see your approach"
Move to next question after candidate completes their response

Interview Flow:

Start with Question 1 from knowledge base
Listen to complete answer
Provide brief neutral acknowledgment
Move to Question 2
Repeat until all 5 questions completed
ONLY then use follow-up questions if time permits

Remember: Your job is to assess, not teach. Let candidates demonstrate their knowledge without guidance or correction.

After every questions ends that are available in the knowledge base, as we also have candidate's resume in the knowledge base, you need to ask some questions related to candidate's resume.
    `;
  }

  async createAgent() {
    try {
      // First create the knowledge base
      const knowledgeBase = await this.createKnowledgeBase();
      
      const response = await axios.post(
        `${this.baseURL}/convai/agents/create`,
        {
          conversation_config: {
            agent: {
              first_message: "Hello! I'm an AI Interviewer from Nodes.inc. Are you ready to begin?",
              language: "en",
              prompt: {
                prompt: this.systemPrompt
              },
              voice: {
                voice_id: "TbMNBJ27fH2U0VgpSNko" // Lori's voice ID
              }
            },
            knowledge_base: {
              documents: [knowledgeBase.id]
            }
          },
          name: "AI Interviewer",
          tags: ["ai", "interview"]
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

  async createKnowledgeBase() {
    try {
      const interviewQuestions = [
        "What is JSX and why is it used in React?",
        "What's the difference between useState and useEffect hooks?",
        "How do you pass data from a parent component to a child component?",
        "What do you know about virtual DOM?",
        "How can we create scalable products using React?"
      ];

      // Convert questions array to text format
      const questionsText = interviewQuestions.map((q, i) => `Question ${i + 1}: ${q}`).join('\n\n');

      const response = await axios.post(
        `${this.baseURL}/convai/knowledge-base/text`,
        {
          text: questionsText,
          name: "Interview Questions"
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
      console.error('Error creating knowledge base:', error.response?.data || error.message);
      throw new Error('Failed to create knowledge base');
    }
  }

  // Add more methods as needed for interaction with the agent
}

module.exports = new ElevenLabsService();
