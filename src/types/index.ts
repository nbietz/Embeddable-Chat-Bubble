export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface ChatConfig {
  apiEndpoint: string;
  apiKey?: string;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

export interface ApiResponse {
  content: string;
  error?: string;
} 